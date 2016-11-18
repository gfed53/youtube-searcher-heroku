(function(){
	angular
	.module('myApp')
	.factory('ytTrustSrc', ['$sce', ytTrustSrc])
	.factory('ytSearchYouTube', ['$q', '$http', 'ytChanSearch', 'ytTranslate', 'ytModalGenerator', ytSearchYouTube])
	.factory('ytChanSearch', ['$q', '$http', 'ytModalGenerator', ytChanSearch])
	.factory('ytCurrentVideo', ['$q', '$http', 'ytModalGenerator', ytCurrentVideo])
	.factory('ytCurrentChannel', ['$q', '$http', 'ytModalGenerator', ytCurrentChannel])
	.factory('ytComputeCssClass', [ytComputeCssClass])
	.factory('ytScrollTo', ['$location', '$anchorScroll', ytScrollTo])
	.factory('ytCheckScrollBtnStatus', ['$state', ytCheckScrollBtnStatus])
	.factory('ytCheckScrollY', [ytCheckScrollY])
	.factory('ytInitMap', [ytInitMap])
	.factory('ytFilters', [ytFilters])
	.factory('ytSearchSavedModal', ['$q', '$uibModal', ytSearchSavedModal])
	.factory('ytDangerModal', ['$q', '$uibModal', ytDangerModal])
	.factory('ytErrorModal', ['ytModalGenerator', ytErrorModal])
	.factory('ytModalGenerator', ['$q', '$uibModal', ytModalGenerator])
	.service('ytChanFilter', [ytChanFilter])
	.service('ytSearchParams', [ytSearchParams])
	.service('ytResults', [ytResults])
	.service('ytVideoItems', ['$q', '$state', '$stateParams',  'ytDangerModal', ytVideoItems])
	.service('ytSearchHistory', ['$q', 'ytSearchSavedModal', 'ytDangerModal', 'ytSearchParams', ytSearchHistory])
	.service('ytTranslate', ['$http', '$q', 'ytModalGenerator', ytTranslate])
	.service('ytSortOrder', [ytSortOrder])
	.service('ytPlaylistSort', [ytPlaylistSort]);

	//Used to follow security measures with YouTube video links in particular 
	function ytTrustSrc($sce){
		return function(src){
			return $sce.trustAsResourceUrl(src);
		}
	}

	//Searches the API for videos based on search params
	function ytSearchYouTube($q, $http, ytChanSearch, ytTranslate, ytModalGenerator) {
		return function(keyword, channelId, order, publishedAfter, publishedBefore, safeSearch, location, locationRadius, pageToken, lang){

			var url = 'https://www.googleapis.com/youtube/v3/search';
			var request = {
				key: 'AIzaSyDKNIGyWP6_5Wm9n_qksK6kLSUGY_kSAkA',
				part: 'snippet',
				maxResults: 50,
				order: order,
				publishedAfter: publishedAfter,
				publishedBefore: publishedBefore,
				safeSearch: safeSearch,
				location: location,
				locationRadius: locationRadius,
				pageToken: pageToken,
				q: keyword,
				type: 'video',
				channelId: channelId,
				videoEmbeddable: true,
			};

			var errorModalObj = ytModalGenerator().getSearchTemp();

			var services = {
				checkTrans: checkTrans,
				getResults: getResults,
				transAndResults: transAndResults
			};

			return services;

			function getResults(){
				return $http({
					method: 'GET',
					url: url,
					params: request
				})
				.then(function(response){
					return $q.when(response);
				},
				function(response){
					ytModalGenerator().openModal(errorModalObj);
				});
			}

			//Checks to see if a language to which the query should be translated is selected
			function checkTrans(keyword, lang){
				var deferred = $q.defer();
				if(lang){
					ytTranslate.translate(keyword, lang)
					.then(function(response){
						deferred.resolve(response.data.text[0]);
					});
				} else {
					deferred.resolve(keyword)
				}
				return deferred.promise;
			}
			//Translates query if necessary, then runs search
			function transAndResults(){
				var deferred = $q.defer();
				checkTrans(keyword, lang).then(function(response){
					request.q = response;
					getResults().then(function(response){
						deferred.resolve(response);
					})
				});

				return deferred.promise;
			}

			function search(type){
				if(type === 'video'){
					transAndResults();
				} else {
					ytChanSearch(keyword).getResults();
				}
			}
		}
	};

	//Searches the API for channels based on search query
	function ytChanSearch($q, $http, ytModalGenerator){
		return function(channel){
			var url = 'https://www.googleapis.com/youtube/v3/search';
			var request = {
				key: 'AIzaSyDKNIGyWP6_5Wm9n_qksK6kLSUGY_kSAkA',
				part: 'snippet',
				maxResults: 50,
				order: 'relevance',
				q: channel,
				type: 'channel'
			};

			var errorModalObj = ytModalGenerator().getSearchTemp();

			var services = {
				getResults: getResults
			};

			return services;

			function getResults(){
				return $http({
					method: 'GET',
					url: url,
					params: request
				})
				.then(function(response){
					var results = response;
					return $q.when(response);
				},
				function(response){
					ytModalGenerator().openModal(errorModalObj);
				});
			}
		}
	}

	//Filters a video search by channel
	function ytChanFilter(){
		this.id = '';
		this.image = '';
		this.set = set;
		this.clear = clear;

		function set(id, image){
			this.id = id;
			this.image = image;
		}

		function clear(){
			this.id = '';
			this.image = '';
		}

	}

	//Used to retrieve necessary data from a particular video (in video player section)
	function ytCurrentVideo($q, $http, ytModalGenerator){
		return function(id){
			var url = 'https://www.googleapis.com/youtube/v3/videos',
			request = {
				key: 'AIzaSyDKNIGyWP6_5Wm9n_qksK6kLSUGY_kSAkA',
				part: 'snippet',
				id: id
			},
			errorModalObj = ytModalGenerator().getVideoTemp(),

			services = {
				getVideo: getVideo
			};
			return services;

			function getVideo(){
				return $http({
					method: 'GET',
					url: url,
					params: request
				})
				.then(function(response){
					return $q.when(response);
				},
				function(response){
					ytModalGenerator().openModal(errorModalObj);
				});	
			}	
		}
	}
	//Used to get back a video's channel data (which requires a different call from ytCurrentVideo)
	function ytCurrentChannel($q, $http, ytModalGenerator){
		return function(id){
			var url = "https://www.googleapis.com/youtube/v3/channels",
			request = {
				key: 'AIzaSyDKNIGyWP6_5Wm9n_qksK6kLSUGY_kSAkA',
				part: 'snippet',
				id: id
			},
			errorModalObj = ytModalGenerator().getVideoTemp(),

			services = {
				getChannel: getChannel
			};

			return services;

			function getChannel(){
				return $http({
					method: 'GET',
					url: url,
					params: request
				})
				.then(function(response){
					return $q.when(response);
				},
				function(response){
					ytModalGenerator().openModal(errorModalObj);
				});	
			}	
		}
	}

	//Used for saving videos to the user's local storage (in the playlist/saved content section)
	function ytVideoItems($q, $state, $stateParams, ytDangerModal){
		var currentVideoId = $stateParams.videoId;
		var items = [];

		this.services = {
			getItems: getItems,
			setItem: setItem,
			clearItem: clearItem,
			clearAllItems: clearAllItems,
			getVideoId: getVideoId,
			setVideoId: setVideoId
		};

		function getItems(){
			var newItems = [];
			if(localStorage.length > 0){
				for(key in localStorage){
					if(key.includes('uytp')){
						var item = {
							name: key,
							content: JSON.parse(localStorage[key])
						}
						if(items.indexOf(item) === -1){
							newItems.push(item);
						}					
					}
				}
				items = newItems;
			}
			return items;
		}

		function setItem(result){
			var itemName = result.snippet.title+'-uytp',
			dateAdded = Date.now(),
			content = result;
			content.dateAdded = dateAdded;
			content = JSON.stringify(content);

			localStorage.setItem(itemName, content);
		}

		function clearItem(name){
			localStorage.removeItem(name);
		}

		//TODO: improve logic
		function clearAllItems(){
			var deferred = $q.defer();
			ytDangerModal().openModal()
			.then(function(){
				items = [];
				for(key in localStorage){
					if(key.includes('uytp')){
						localStorage.removeItem(key);
					}
				}

				deferred.resolve(items);
			}, function(){
				deferred.reject();
			});

			return deferred.promise;
		}

		function getVideoId(){
			//Check url params when loading page in video player state
			return currentVideoId;
		}

		function setVideoId(videoId){
			currentVideoId = videoId;
		}
	};

	//Where saved search params are stored (so while switching views/controllers, changes in search params will be kept)
	function ytSearchParams(){
		var params = {
			keyword: undefined,
			advKeyword: undefined,
			searchedKeyword: undefined,
			channel: undefined,
			channelId: undefined,
			image: undefined,
			order: undefined,
			after: undefined,
			before: undefined,
			safeSearch: undefined,
			location: undefined,
			locationRadius: undefined,
			lat: undefined,
			lng: undefined,
			radius: undefined,
			prevPageToken: undefined,
			nextPageToken: undefined,
			name: undefined,
			date: undefined
		},
		// ('true' would mean it's collapsed - not visible)
		_type_ = {
			basic: false,
			advanced: true
		};

		this.get = get;
		this.set = set;
		this.getSearchType = getSearchType;
		this.setSearchType = setSearchType;
		this.setToBasic = setToBasic;
		this.setToAdvanced = setToAdvanced;

		function get(){
			return params;
		}

		function set(newParams){
			for(var item in params){
				params[item] = newParams[item];
			}
		}

		function getSearchType(){
			return _type_;
		}

		//Change based on ctrl/view status 
		function setSearchType(type){
			_type_ = type;
		}

		//Explicit change
		function setToBasic(){
			_type_ = {
				basic: false,
				advanced: true
			}
		}

		//Explicit change
		function setToAdvanced(){
			_type_ = {
				basic: true,
				advanced: false
			}
		}
	}

	//Where video and channel results are stored (so while switching views/controllers, these will be kept)
	function ytResults(){
		this.results = [];
		this.chanResults = [];
		this.currentVideo;
		this.status = {
			videosCollapsed: true,
			channelsCollapsed: true,
			videoButtonValue: '',
			channelButtonValue: ''
		}
		this.getResults = getResults;
		this.getChanResults = getChanResults;
		this.setResults = setResults;
		this.setChanResults = setChanResults;
		this.getStatus = getStatus;
		this.setStatus = setStatus;
		this.checkStatus = checkStatus;

		//TODO just easier method to toggle button text (like <span>)
		function checkStatus(newVal, oldVal, buttonValue, showText, hideText){
			if(newVal === true){
				buttonValue = showText;
			} else {
				buttonValue = hideText;
			}
			return buttonValue;	
		}

		function getStatus(){
			return this.status;
		}

		function setStatus(status){
			this.status = status;
		}

		function getResults(){
			return this.results;
		}

		function getChanResults(){
			return this.chanResults;
		}

		function setResults(results){
			this.results = results;
		}

		function setChanResults(chanResults){
			this.chanResults = chanResults;
		}
	}

	//Used for saving past searches to the user's local storage (in the playlist/saved content section)
	function ytSearchHistory($q, ytSearchSavedModal, ytDangerModal, ytSearchParams){
		var pastSearches = [];
		this.get = get;
		this.set = set;
		this.clearItem = clearItem;
		this.clearAll = clearAll;

		function get(){
			if(localStorage.length > 0){
				for(key in localStorage){
					if(key.includes('uyts')){
						var obj = localStorage.getItem(key);
						obj = JSON.parse(obj);
						if(obj.name){
							if(obj.after != null){
								obj.after = new Date(obj.after);
							}
							if(obj.before != null){
								obj.before = new Date(obj.before);
							}
							//This is here to avoid existent objects getting reappended to the array within the session when they shouldn't be
							if(getIndexIfObjWithAttr(pastSearches, 'name', obj.name) === -1){
								pastSearches.push(obj);
							}
						}
					}
				}
			}
			return pastSearches;
		}

		function set(params, service){
			ytSearchSavedModal().openModal()
			.then(function(name){
				params.name = name;
				if(params.name === 'cancel'){
					//Aborted
				} else if(params.name){
					params.nameShrt = params.name;
					params.name = params.name+'-uyts';
					params.date = Date.now();
					pastSearches.push(params);
					localStorage.setItem(params.name, JSON.stringify(params));
				} else {
					service.set(params, service);
				}
			});
		}

		function clearItem(search){
			var searchIndex = pastSearches.indexOf(search);
			pastSearches.splice(searchIndex, 1);
			localStorage.removeItem(search.name);
		}

		function clearAll(){
			//Clears all past searches
			var deferred = $q.defer();
			ytDangerModal().openModal()
			.then(function(){
				pastSearches = [];
				for(key in localStorage){
					if(key.includes('uyts')){
						localStorage.removeItem(key);
					}
				}
				deferred.resolve(pastSearches);
			}, function(){
				deferred.reject();
			})
			return deferred.promise;
		}

		function getIndexIfObjWithAttr(array, attr, value) {
			for(var i = 0; i < array.length; i++) {
				if(array[i][attr] === value) {
					return i;
				}
			}
			return -1;
		}

	}

	//A style tweak for the outer border of the results div. This will ensure thick borders all around, but in between each result, only thin borders (ngRepeat conflict)
	function ytComputeCssClass(){
		return function(first, last){
			var val;
			if(first){
				val = 'first';
			} else if(last){
				val = 'last';
			} else {
				val = null;
			}
			return val;
		}
	}

	//Used on the bottom scroll button to scroll to the top of the results div
	function ytScrollTo($location, $anchorScroll){
		return function(scrollLocation){
			var services = {
				scrollToElement: scrollToElement,
				checkScrollBtnStatus: checkScrollBtnStatus
			}

			return services;

			function scrollToElement(scrollLocation){
				$anchorScroll.yOffset = 63;
				var element = document.getElementById(scrollLocation);
				if(element){
					$location.hash(scrollLocation);
					$anchorScroll();
				} else {
					window.scroll(0, 0);
				}
			}

			function checkScrollBtnStatus(){
				if(window.scrollY > 100){
					return true;
				} else {
					return false;
				}
			}	
		}
	}

	function ytCheckScrollBtnStatus($state){
		
		return function(){
			function checkVisible(elm) {
				var rect = elm.getBoundingClientRect();
				var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
				return !(rect.bottom < 0 || rect.top - viewHeight >= -500);
			}

			function check(videos, channels){
				if($state.current.name === 'search'){
					if(videos.length > 0 || channels.length > 0){
						var elem = document.getElementById('results-container');
						var scrollTop = document.getElementsByClassName('scroll-top');
						if(checkVisible(elem)){
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
				}
			}

			var services = {
				check: check
			}

			return services;
		}
	}

	function ytCheckScrollY(){
		return function(){
			var services = {
				init: init
			};

			function init(callback){
				window.addEventListener('scroll', function(){
					if(window.scrollY === 0){
						callback(true);
					} else {
						callback(false);
					}
				}); 
			}

			return services;
		}
	}

	//Initializes the map used in the search section
	function ytInitMap(){
		return function(callback){
			var map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: 39, lng: -99},
				zoom: 4
			});

			var circle = new google.maps.Circle({
				center: {lat: 39, lng: -99},
				radius: 100000,
				editable: true,
				draggable: true
			});

			circle.setMap(map);
			circle.addListener('center_changed', function(){
				callback();
			});

			circle.addListener('radius_changed', function(){
				callback();
			});

			var services = {
				map: map,
				circle: circle
			}

			return services;
		}
	}

	//Handles all of the translation functionality used in the search section
	function ytTranslate($http, $q, ytModalGenerator){

		var langs = [{
			label: 'None',
			value: ''
		}, {
			label: 'Arabic',
			value: 'ar'
		}, {
			label: 'Chinese',
			value: 'zh'
		}, {
			label: 'French',
			value: 'fr'
		}, {
			label: 'Hindi',
			value: 'hi'
		}, {
			label: 'Italian',
			value: 'it'
		}, {
			label: 'Japanese',
			value: 'ja'
		}, {
			label: 'Russian',
			value: 'ru'
		}, {
			label: 'Spanish',
			value: 'es'
		}];

		var errorModalObj = ytModalGenerator().getTransTemp();

		function translate(text, lang){
			var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate',
			request = {
				key: 'trnsl.1.1.20160728T161850Z.60e012cb689f9dfd.6f8cd99e32d858950d047eaffecf930701d73a38',
				text: text,
				lang: 'en-'+lang
			};

			return $http({
				method: 'GET',
				url: url,
				params: request
			})
			.then(function(response){
				return $q.when(response);
			}, function(){
				ytModalGenerator().openModal(errorModalObj);
			});
		}

		function translateAll(tag, list){
			var deferred = $q.defer();
			var tagList = tag;
			var langArray = [];
			for(lang in list){
				if(list[lang] != 'en' && list[lang]){
					langArray.push(list[lang]);
				}
			}
			var counter = langArray.length;

			if(langArray.length === 0){
				deferred.reject('No translations were necessary.');
			}

			for(var i = 0; i<langArray.length; i++){
				translate(tag, langArray[i]).then(function(response){
					tagList += ', '+response.data.text[0]+', ';
					counter--;
					if(counter <= 0){
						deferred.resolve(tagList);
					}
				});
			}

			return deferred.promise;
		}

		this.langs = langs;
		this.translate = translate;
		this.translateAll = translateAll;
	}

	//Handles the result sorting in the search section
	function ytSortOrder(){
		var sortObj = {
			predicate: undefined,
			reverse: false
		};

		this.videoReverse = false;
		this.order = order;
		this.get = get;

		function order(current, _predicate) {
			sortObj.reverse = (_predicate === current) ? !reverse : false;
			sortObj.predicate = _predicate;
			return sortObj;
		}

		function get(){
			return sortObj;
		}
	}

	//Handles the saved videos and searches sorting in the saved content section 
	function ytPlaylistSort(){
		this.videos = {
			reverse: false,
			predicate: '$$hashKey'
		};

		this.searches = {
			reverse: false,
			predicate: '$$hashKey'
		};
		//Name
		this.order = order;
		this.get = get;

		function order(current, _predicate, type) {
			type.reverse = (_predicate === current) ? !type.reverse : false;
			type.predicate = _predicate;
			var sortObj = {
				reverse: type.reverse,
				predicate: type.predicate
			}
			return sortObj;
		}

		function get(){
			return sortObj;
		}
	}

	//Handles the filtering functionality of the saved content in the saved content section
	function ytFilters(){
		return function(){
			var services = {
				addedAfterVideos: addedAfterVideos,
				addedBeforeVideos: addedBeforeVideos,
				addedAfterSearches: addedAfterSearches,
				addedBeforeSearches: addedBeforeSearches
			};

			return services;

			function addedAfterVideos(item, filter){
				var bool;
				if(filter && filter.addedAfter){
					if(item.content.dateAdded){
						var dateAdded = parseInt(moment(item.content.dateAdded).format('X'), 10),
						after = parseInt(moment(filter.addedAfter).format('X'), 10);
						bool = (dateAdded >= after);
					} else {
						bool = false;
					}
				} else {
					bool = true;
				}
				return bool;
			}

			function addedBeforeVideos(video, videoFilter){
				var bool;
				if(videoFilter && videoFilter.addedBefore){
					if(video.content.dateAdded){
						var dateAdded = parseInt(moment(video.content.dateAdded).format('X'), 10),
						before = parseInt(moment(videoFilter.addedBefore).format('X'), 10);
						bool = (dateAdded < before);
					} else {
						bool = false;
					}
				} else {
					bool = true;
				}
				return bool;
			}

			function addedAfterSearches(item, filter){
				var bool;
				if(filter && filter.addedAfter){
					var dateAdded = parseInt(moment(item.date).format('X'), 10),
					after = parseInt(moment(filter.addedAfter).format('X'), 10);
					bool = (dateAdded >= after);
				} else {
					bool = true;
				}
				return bool;
			}

			function addedBeforeSearches(item, filter){
				var bool;
				if(filter && filter.addedBefore){
					var dateAdded = parseInt(moment(item.date).format('X'), 10),
					before = parseInt(moment(filter.addedBefore).format('X'), 10);
					bool = (dateAdded < before);
				} else {
					bool = true;
				}
				return bool;
			}
		}
	}

	function ytSearchSavedModal($q, $uibModal){
		return function(){
			var services = {
				openModal: openModal
			};

			function openModal(){
				var deferred = $q.defer();
				var modalInstance = $uibModal.open({
					templateUrl: './partials/search/search-partials/modals/search-saved-modal.html',
					controller: 'SearchSavedModalController',
					controllerAs: 'searchModal'
				});

				modalInstance.result.then(function(result){
					deferred.resolve(result);
				}, function(error){
					deferred.resolve(error);
				});

				return deferred.promise;
			}

			return services;
		}
	}

	function ytDangerModal($q, $uibModal){
		return function(){
			var services = {
				openModal: openModal
			};

			function openModal(){
				var deferred = $q.defer();
				var modalInstance = $uibModal.open({
					templateUrl: './partials/playlist/playlist-partials/modals/danger-modal.html',
					controller: 'DangerModalController',
					controllerAs: 'dangerModal'
				});

				modalInstance.result.then(function(){
						deferred.resolve();
					}, function(error){
						deferred.reject(error);
					});

					return deferred.promise;
				}

			return services;
		}
	}

	function ytErrorModal($q, ytModalGenerator){
		return function(){
			var services = {
				openModal: openModal
			},
			modalObj = {
				url: './partials/search/search-partials/modals/error-modal.html',
				ctrl: 'ErrorModalController',
				ctrlAs: 'errorModal'
			};

			function openModal(){
				ytModalGenerator().openModal(modalObj);
			}

			return services;
		}
	}

	function ytModalGenerator($q, $uibModal){
		return function(){
			var services = {
				openModal: openModal,
				getSearchTemp: getSearchTemp,
				getVideoTemp: getVideoTemp,
				getTransTemp: getTransTemp
			};

			var searchTemp = {
				templateUrl: './partials/search/search-partials/modals/error-modal.html',
				controller: 'ErrorModalController',
				controllerAs: 'errorModal'
			};

			var videoTemp = {
				templateUrl: './partials/video/video-partials/modals/error-modal.html',
				controller: 'ErrorModalController',
				controllerAs: 'errorModal'
			};

			var transTemp = {
				templateUrl: './partials/search/search-partials/modals/translate-error-modal.html',
				controller: 'ErrorModalController',
				controllerAs: 'errorModal'
			}

			function openModal(modalObj){
				var deferred = $q.defer();
				var modalInstance = $uibModal.open({
					templateUrl: modalObj.templateUrl,
					controller: modalObj.controller,
					controllerAs: modalObj.controllerAs
				});

				modalInstance.result.then(function(result){
						deferred.resolve(result);
					}, function(error){
						deferred.reject(error);
					});

					return deferred.promise;
				}

			function getSearchTemp(){
				return searchTemp;
			}

			function getVideoTemp(){
				return videoTemp;
			}

			function getTransTemp(){
				return transTemp;
			}

			return services;
		}
	}


})();





