/*jshint esversion: 6 */

/* TODO for all factories: adjust objects returned that have reptition.
i.e. {get: get } can be {get} (I think..) 
*/

(function(){
	angular
	.module('myApp')
	.factory('ytTrustSrc', ['$sce', ytTrustSrc])
	.factory('ytSearchYouTube', ['$q', '$http', 'ytChanSearch', 'ytTranslate', 'ytModalGenerator', 'ytDateHandler', 'ytInitAPIs', ytSearchYouTube])
	.factory('ytChanSearch', ['$q', '$http', 'ytModalGenerator', 'ytInitAPIs', ytChanSearch])
	.factory('ytCurrentVideo', ['$q', '$http', 'ytModalGenerator', 'ytInitAPIs', ytCurrentVideo])
	.factory('ytCurrentChannel', ['$q', '$http', 'ytModalGenerator', 'ytInitAPIs', ytCurrentChannel])
	.factory('ytComputeCssClass', [ytComputeCssClass])
	.factory('ytScrollTo', ['$location', '$anchorScroll', ytScrollTo])
	.factory('ytCheckScrollBtnStatus', ['$state', ytCheckScrollBtnStatus])
	.factory('ytCheckScrollDir', [ytCheckScrollDir])
	.factory('ytCheckScrollY', [ytCheckScrollY])
	.factory('ytInitMap', [ytInitMap])
	.factory('ytFilters', ['ytDateHandler', ytFilters])
	.factory('ytSearchSavedModal', ['$q', '$uibModal', ytSearchSavedModal])
	.factory('ytDangerModal', ['$q', '$uibModal', ytDangerModal])
	.factory('ytModalGenerator', ['$q', '$uibModal', ytModalGenerator])
	.factory('ytDateHandler', [ytDateHandler])
	.factory('ytUtilities', [ytUtilities])
	.service('ytChanFilter', [ytChanFilter])
	.service('ytSearchParams', ['ytTranslate', ytSearchParams])
	.service('ytResults', [ytResults])
	.service('ytVideoItems', ['$q', '$state', '$stateParams', 'ytModalGenerator', 'ytDangerModal', 'ytUtilities', ytVideoItems])
	.service('ytSearchHistory', ['$q', 'ytSearchSavedModal', 'ytDangerModal', 'ytModalGenerator', 'ytSearchParams', 'ytUtilities', ytSearchHistory])
	.service('ytTranslate', ['$http', '$q', 'ytModalGenerator', 'ytInitAPIs', ytTranslate])
	.service('ytSortOrder', [ytSortOrder])
	.service('ytPlaylistView', [ytPlaylistView])
	.service('ytPlaylistSort', [ytPlaylistSort])
	.service('ytInitAPIs', ['$q', 'ytModalGenerator', ytInitAPIs]);

	//Used to follow security measures with YouTube video links in particular 
	function ytTrustSrc($sce){
		return (src) => {
			return $sce.trustAsResourceUrl(src);
		};
	}

	//Searches the API for videos based on search params
	function ytSearchYouTube($q, $http, ytChanSearch, ytTranslate, ytModalGenerator, ytDateHandler, ytInitAPIs) {
		return (params, pageToken, direction) => {
			
			// Ensures that we take the previously searched keyword during page navigation.
			let query = (pageToken ? params.searchedKeyword : params.keyword);
			let url = 'https://www.googleapis.com/youtube/v3/search';
			let apisObj = ytInitAPIs.apisObj;

			//Moment.js parsing
			let parsedAfter = (params.after ? ytDateHandler().getDate(params.after, 'M/D/YYYY') : undefined),
			parsedBefore = (params.before ? ytDateHandler().getDate(params.before, 'M/D/YYYY') : undefined);

			let request = {
				key: apisObj.youTubeKey,
				part: 'snippet',
				maxResults: 50,
				order: params.order,
				publishedAfter: parsedAfter,
				publishedBefore: parsedBefore,
				location: params.location,
				locationRadius: params.locationRadius,
				q: query,
				type: 'video',
				channelId: params.channelId,
				videoEmbeddable: true,
			};

			if(pageToken){
				request.pageToken = pageToken;
			}

			let errorModalObj = ytModalGenerator().getSearchTemp();

			let services = {
				checkTrans: checkTrans,
				getResults: getResults,
				transAndResults: transAndResults,
				search: search
			};

			return services;

			function getResults(){
				return $http({
					method: 'GET',
					url: url,
					params: request
				})
				.then((response) => {
					return $q.when(response);
				},
				(response) => {
					ytModalGenerator().openModal(errorModalObj);
				});
			}

			//Checks to see if a language to which the query should be translated is selected
			function checkTrans(_keyword_, _lang_){
				let deferred = $q.defer();
				if(_lang_){
					ytTranslate.translate(_keyword_, _lang_)
					.then((response) => {
						deferred.resolve(response.data.text[0]);
					});
				} else {
					deferred.resolve(_keyword_);
				}
				return deferred.promise;
			}
			//Translates query if necessary, then runs search
			function transAndResults(){
				let deferred = $q.defer();
				checkTrans(query, params.lang.value).then((response) => {
					request.q = response;
					getResults().then((response) => {
						deferred.resolve(response);
					});
				});
				return deferred.promise;
			}

			function search(){
				let deferred = $q.defer();
				if(params.searchType === 'video'){
					transAndResults()
					.then((response) => {
						// Value created to display page number in view
						response.pageDirection = direction;

						deferred.resolve(response);
					});
				} else {
					ytChanSearch(query).getResults()
					.then((response) => {
						deferred.resolve(response);
					});
				}
				return deferred.promise;
			}
		};
	}

	//Searches the API for channels based on search query
	function ytChanSearch($q, $http, ytModalGenerator, ytInitAPIs){
		return (channel) => {
			let url = 'https://www.googleapis.com/youtube/v3/search';
			let request = {
				key: ytInitAPIs.apisObj.youTubeKey,
				part: 'snippet',
				maxResults: 50,
				order: 'relevance',
				q: channel,
				type: 'channel'
			};

			let errorModalObj = ytModalGenerator().getSearchTemp();

			let services = {
				getResults: getResults
			};

			return services;

			function getResults(){
				return $http({
					method: 'GET',
					url: url,
					params: request
				})
				.then((response) => {
					let results = response;
					return $q.when(response);
				},
				(response) => {
					ytModalGenerator().openModal(errorModalObj);
				});
			}
		};
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
	function ytCurrentVideo($q, $http, ytModalGenerator, ytInitAPIs){
		return (id) => {
			let url = 'https://www.googleapis.com/youtube/v3/videos',
			request = {
				key: ytInitAPIs.apisObj.youTubeKey,
				part: 'snippet, contentDetails',
				//contentDetails contains the duration property.
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
				.then((response) => {
					return $q.when(response);
				},
				(response) => {
					ytModalGenerator().openModal(errorModalObj);
				});	
			}	
		};
	}

	//Used to get back a video's channel data (which requires a different call from ytCurrentVideo)
	function ytCurrentChannel($q, $http, ytModalGenerator, ytInitAPIs){
		return (id) => {
			let url = "https://www.googleapis.com/youtube/v3/channels",
			request = {
				key: ytInitAPIs.apisObj.youTubeKey,
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
				.then((response) => {
					return $q.when(response);
				},
				(response) => {
					ytModalGenerator().openModal(errorModalObj);
				});	
			}	
		};
	}

	//Used for saving videos to the user's local storage (in the playlist/saved content section)
	function ytVideoItems($q, $state, $stateParams, ytModalGenerator, ytDangerModal, ytUtilities){
		let currentVideoId = $stateParams.videoId;
		let items = [];

		this.services = {
			init: init,
			getItems: getItems,
			setItem: setItem,
			clearItem: clearItem,
			clearAllItems: clearAllItems,
			getVideoId: getVideoId,
			setVideoId: setVideoId,
			isSaved: isSaved
		};

		//Automatically grabs items from localStorage and saves them to variable 'items'
		function init(){
			//bug: for videos that were just added, getIndex... doesn't find them, and they get pushed twice?
			if(localStorage.length){
				for(let key in localStorage){
					if(key.includes('uytp')){
						let obj = JSON.parse(localStorage[key]);
						//Legacy fallback?
						if(obj.$$hashKey){
							delete obj.$$hashKey;
						}
						obj.name = obj.snippet.title;
						obj.codeName = key;
						if(ytUtilities().getIndexIfObjWithAttr(items, 'name', obj.name) === -1){
							items.push(obj);
						}
					}
				}
			}
		}

		function getItems(){
			if(!items.length){
				init();
			}
			return items;
		}

		function setItem(result){
			let itemName = result.snippet.title+'-uytp',
			dateAdded = Date.now(),
			content = result;
			delete content.$$hashKey;

			content.dateAdded = dateAdded;
			content.name = content.snippet.title;
			content.codeName = itemName;

			items.push(content);

			content = JSON.stringify(content);

			localStorage.setItem(itemName, content);

		}

		function clearItem(codeName, item, isWarnActive){
			let warnTemp = ytModalGenerator().getWarnTemp(),
				deferred = $q.defer();
			if(codeName){ //This would take place in the playlist section
				if(isWarnActive){
					ytModalGenerator().openModal(warnTemp)
					.then(()=> {
						localStorage.removeItem(codeName);
						deferred.resolve();
					});
				} else {
					console.log('no warning');
					localStorage.removeItem(codeName);
					deferred.resolve();
				}
				
			} else if(item) { //This would take place in the video section.
				items.forEach((_item_) => {
					if(_item_.id.videoId === item.id){
						let current = _item_;
						//Remove both from localStorage and items array within this service. In playlist section, this is done implicitly.
						localStorage.removeItem(current.codeName);
						let currentIndex = items.indexOf(current);
						items.splice(currentIndex, 1);
						deferred.resolve();
					}
				});
				

			}
			return deferred.promise;
		}

		//TODO: improve logic
		function clearAllItems(){
			let deferred = $q.defer();
			ytDangerModal().openModal()
			.then(() => {
				items = [];
				for(let key in localStorage){
					if(key.includes('uytp')){
						localStorage.removeItem(key);
					}
				}

				deferred.resolve(items);
			}, () => {
				deferred.reject();
			});

			return deferred.promise;
		}

		//Check url params when loading page in video player state
		function getVideoId(){
			return currentVideoId;
		}

		function setVideoId(videoId){
			currentVideoId = videoId;
		}

		//Check if video item is saved()
		function isSaved(id){
			let bool;
			if(items.length){
				items.forEach((_item_) => {
					if(_item_.id.videoId === id){
						bool = true;
					}
				});
			}

			return bool;
		}

	}

	//Where saved search params are stored (so while switching views/controllers, changes in search params will be kept)
	function ytSearchParams(ytTranslate){
		let params = {
			keyword: undefined,
			searchedKeyword: undefined,
			searchType: 'video',
			channel: undefined,
			channelId: undefined,
			image: undefined,
			order: 'relevance',
			after: undefined,
			before: undefined,
			safeSearch: undefined,
			location: undefined,
			locationRadius: undefined,
			lat: undefined,
			lng: undefined,
			radius: undefined,
			currentPage: undefined,
			prevPageToken: undefined,
			nextPageToken: undefined,
			name: undefined,
			date: undefined,
			lang: ytTranslate.langs[0]
		};

		let searchTypePrev = 'video';

		//This is used for page traversal. We store the previous search params. That way, we can adjust/update the queries all we want, and grab new page tokens from the last search all we want.
		let paramsPrev = {};

		let original = Object.assign({}, params);

		let currentPage = 1;

		this.get = get;
		this.getPrev = getPrev;
		this.set = set;
		this.setPrev = setPrev;
		this.getSTP = getSTP;
		this.setSTP = setSTP;
		this.reset = reset;
		this.updateCurrentPage = updateCurrentPage;
		this.getCurrentPage = getCurrentPage;

		function get(){
			return params;
		}

		function getPrev(){
			return paramsPrev;
		}

		function set(newParams){
			for(let item in params){
				//To avoid conflict with page traversal of prev search after retrieving a new search
				if(item === 'searchedKeyword'){
				} else {
					params[item] = newParams[item];

					if(newParams[item] === 'Invalid Date'){
						newParams[item] = null;
					}
				}
			}
			params.keyword = newParams.searchedKeyword;

		}

		function setPrev(_params_, direction){
			//This will not execute if it's page traversal..
			if(!direction){
				for(let key in _params_){
					paramsPrev[key] = _params_[key];
				}
			} else {
				//..But the new page tokens are required
				paramsPrev['prevPageToken'] = _params_['prevPageToken'];
				paramsPrev['nextPageToken'] = _params_['nextPageToken'];
			}
		}

		// STP: searchTypePrev
		function getSTP(){
			return searchTypePrev;
		}

		function setSTP(_val_){
			searchTypePrev = _val_;
		}

		function reset(){
			for(let key in params){
				if(key in original){
					params[key] = original[key];
				}
			}
		}

		function updateCurrentPage(step){
			if(step === 'next'){
				currentPage++;
			} else if(step === 'prev'){
				currentPage--;
			} else {
				currentPage = 1;
			}
		}

		function getCurrentPage(){
			return currentPage;
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
		};
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
	function ytSearchHistory($q, ytSearchSavedModal, ytDangerModal, ytModalGenerator, ytSearchParams, ytUtilities){
		let pastSearches = [];
		this.get = get;
		this.set = set;
		this.clearItem = clearItem;
		this.clearAll = clearAll;

		function get(){
			if(localStorage.length > 0){
				for(let key in localStorage){
					if(key.includes('uyts')){
						let obj = localStorage.getItem(key);
						obj = JSON.parse(obj);
						//Fix for searches with date, correcting format to be used in search. 
						if(obj.name){
							if(obj.after && obj.after !== null){
								obj.after = new Date(obj.after);
							}
							if(obj.before && obj.before !== null){
								obj.before = new Date(obj.before);
							}
							//This is here to avoid existent objects getting reappended to the array within the session when they shouldn't be
							if(ytUtilities().getIndexIfObjWithAttr(pastSearches, 'name', obj.name) === -1){
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
			.then((name) => {
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

		function clearItem(search, isWarnActive){
			let warnTemp = ytModalGenerator().getWarnTemp();
			function init(){
				let searchIndex = pastSearches.indexOf(search);
				pastSearches.splice(searchIndex, 1);
				localStorage.removeItem(search.name);
			}
			if(isWarnActive){
				ytModalGenerator().openModal(warnTemp)
				.then(()=> {
					init();
				});
			} else {
				console.log('no warning');
			}
		}

		function clearAll(){
			//Clears all past searches
			let deferred = $q.defer();
			ytDangerModal().openModal()
			.then(() => {
				pastSearches = [];
				for(let key in localStorage){
					if(key.includes('uyts')){
						localStorage.removeItem(key);
					}
				}
				deferred.resolve(pastSearches);
			}, () => {
				deferred.reject();
			});
			return deferred.promise;
		}
	}

	function ytUtilities(){
		return () => {
			let services = {
				getIndexIfObjWithAttr: getIndexIfObjWithAttr
			};

			function getIndexIfObjWithAttr(array, attr, value) {
				for(let i = 0; i < array.length; i++) {
					if(array[i][attr] === value) {
						return i;
					}
				}
				return -1;
			}

			return services;

		};
	}

	//A style tweak for the outer border of the results div. This will ensure thick borders all around, but in between each result, only thin borders (ngRepeat conflict)
	function ytComputeCssClass(){
		return (first, last) => {
			let val;
			if(first){
				val = 'first';
			} else if(last){
				val = 'last';
			} else {
				val = null;
			}
			return val;
		};
	}

	//Used on the bottom scroll button to scroll to the top of the results div
	function ytScrollTo($location, $anchorScroll){
		return (scrollLocation) => {
			let services = {
				scrollToElement: scrollToElement,
				checkScrollBtnStatus: checkScrollBtnStatus
			};

			return services;

			function scrollToElement(scrollLocation){
				$anchorScroll.yOffset = 70;
				let element = document.getElementById(scrollLocation);
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
		};
	}

	// Displays the scroll button (in results section) depending on appropriate conditions
	function ytCheckScrollBtnStatus($state){
		
		return () => {
			function checkVisible(elm) {
				let rect = elm.getBoundingClientRect();
				let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
				return !(rect.bottom < 0 || rect.top - viewHeight >= -500);
			}

			function check(videos, channels){
				if($state.current.name === 'search'){
					if(videos.length > 0 || channels.length > 0){
						let elem = document.getElementById('results-container');
						let scrollTop = document.getElementsByClassName('scroll-top');
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

			let services = {
				check: check
			};

			return services;
		};
	}

	//TODO: Refactor this to use ytCheckScrollY. Make ytCheckScrollY looser so it can be used in both situations
	function ytCheckScrollDir(){
		return () => {
			let services = {
				init: init,
				check: check
			};

			//Match cb's that will be used in each situation. Navbar will be hidden if user scrolls down OR if page loads in middle of screen.
			function check(scrollDownCB, scrollUpCB){
				window.addEventListener('load', ()=>{
					let scroll = init(scrollDownCB, scrollUpCB);

					window.addEventListener('scroll', () => {
						if(window.scrollY > scroll){
							scrollDownCB();
						} else {
							scrollUpCB();
						}
						scroll = window.scrollY;
					});
				});

			}

			function init(scrolledCB, atTopCB){
				let scroll = window.scrollY;
				if(scroll > 0){
					scrolledCB();
				} else {
					atTopCB();
				}
				return scroll;
			}

			return services;
		};
	}


	//Checks to see if user scrolled down from top, so navbar style can change appropriately
	function ytCheckScrollY(){
		return () => {
			let services = {
				init: init
			};

			function init(callback){
				window.addEventListener('scroll', () => {
					if(window.scrollY === 0){
						callback(true);
					} else {
						callback(false);
					}
				}); 
			}

			return services;
		};
	}

	//Initializes the map used in the search section
	function ytInitMap(){
		return (callback) => {
			let map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: 39, lng: -99},
				zoom: 4
			});

			let circle = new google.maps.Circle({
				center: {lat: 39, lng: -99},
				radius: 100000,
				editable: true,
				draggable: true
			});

			circle.setMap(map);
			circle.addListener('center_changed', () => {
				callback();
			});

			circle.addListener('radius_changed', () => {
				callback();
			});

			let services = {
				map: map,
				circle: circle
			};

			return services;
		};
	}

	//Handles all of the translation functionality used in the search section
	function ytTranslate($http, $q, ytModalGenerator, ytInitAPIs){

		let langs = [{
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

		let errorModalObj = ytModalGenerator().getTransTemp();
		

		function translate(text, lang){
			let apisObj = ytInitAPIs.apisObj;
			let url = 'https://translate.yandex.net/api/v1.5/tr.json/translate',
			request = {
				key: apisObj.translateKey,
				// key: 'trnsl.1.1.20160728T161850Z.60e012cb689f9dfd.6f8cd99e32d858950d047eaffecf930701d73a38',
				text: text,
				lang: 'en-'+lang
			};

			return $http({
				method: 'GET',
				url: url,
				params: request
			})
			.then((response) => {
				return $q.when(response);
			}, () => {
				ytModalGenerator().openModal(errorModalObj);
			});
		}

		function translateAll(tag, list){
			let deferred = $q.defer();
			let tagList = tag;
			let langArray = [];
			for(let lang in list){
				if(list[lang] != 'en' && list[lang]){
					langArray.push(list[lang]);
				}
			}
			let counter = langArray.length;

			if(langArray.length === 0){
				deferred.reject('No translations were necessary.');
			}

			for(let i = 0; i<langArray.length; i++){
				translate(tag, langArray[i]).then((response) => {
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
		let sortObj = {
			predicate: undefined,
			reverse: false
		};

		this.videosReverse = false;
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

	//Keeps track of collapsed/expanded sections in saved/playlist section
	function ytPlaylistView(){
		this.obj = {
			videosCollapsed: true,
			searchesCollapsed: true,
			videosSortCollapsed: true,
			videosFilterCollapsed: true,
			searchesSortCollapsed: true,
			searchesFilterCollapsed: true
		};

		this.get = get;

		function get(){
			return this.obj;
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
			let sortObj = {
				reverse: type.reverse,
				predicate: type.predicate
			};
			return sortObj;
		}

		function get(){
			return sortObj;
		}
	}

	//Handles the filtering functionality of the saved content in the saved content section
	function ytFilters(ytDateHandler){
		return () => {
			let services = {
				addedAfterVideos: addedAfterVideos,
				addedBeforeVideos: addedBeforeVideos,
				addedAfterSearches: addedAfterSearches,
				addedBeforeSearches: addedBeforeSearches
			};

			return services;

			function addedAfterVideos(item, filter){
				let bool;
				if(filter && filter.addedAfter){
					if(item.dateAdded){
						let dateAdded = parseInt(moment(ytDateHandler().getDate(item.dateAdded, 'M/D/YYYY')).format('X'), 10),
						after = parseInt(moment(ytDateHandler().getDate(filter.addedAfter, 'M/D/YYYY')).format('X'), 10);
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
				let bool;
				if(videoFilter && videoFilter.addedBefore){
					if(video.dateAdded){
						let dateAdded = parseInt(moment(ytDateHandler().getDate(video.dateAdded, 'M/D/YYYY')).format('X'), 10),
						before = parseInt(moment(ytDateHandler().getDate(videoFilter.addedBefore, 'M/D/YYYY')).format('X'), 10);
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
				let bool;
				if(filter && filter.addedAfter){
					let dateAdded = parseInt(moment(ytDateHandler().getDate(item.date, 'M/D/YYYY')).format('X'), 10),
					after = parseInt(moment(ytDateHandler().getDate(filter.addedAfter, 'M/D/YYYY')).format('X'), 10);
					bool = (dateAdded >= after);
				} else {
					bool = true;
				}
				return bool;
			}

			function addedBeforeSearches(item, filter){
				let bool;
				if(filter && filter.addedBefore){
					let dateAdded = parseInt(moment(ytDateHandler().getDate(item.date, 'M/D/YYYY')).format('X'), 10),
					before = parseInt(moment(ytDateHandler().getDate(filter.addedBefore, 'M/D/YYYY')).format('X'), 10);
					bool = (dateAdded < before);
				} else {
					bool = true;
				}
				return bool;
			}
		};
	}

	function ytSearchSavedModal($q, $uibModal){
		return () => {
			let services = {
				openModal: openModal
			};

			function openModal(){
				let deferred = $q.defer();
				let modalInstance = $uibModal.open({
					templateUrl: './partials/search/search-partials/modals/search-saved-modal.html',
					controller: 'SearchSavedModalController',
					controllerAs: 'searchModal'
				});

				modalInstance.result.then((result) => {
					deferred.resolve(result);
				}, (error) => {
					deferred.resolve(error);
				});

				return deferred.promise;
			}

			return services;
		};
	}

	function ytDangerModal($q, $uibModal){
		return () => {
			let services = {
				openModal: openModal
			};

			function openModal(){
				let deferred = $q.defer();
				let modalInstance = $uibModal.open({
					templateUrl: './partials/playlist/playlist-partials/modals/danger-modal.html',
					controller: 'DangerModalController',
					controllerAs: 'dangerModal'
				});

				modalInstance.result.then(() =>{
					deferred.resolve();
				}, (error) => {
					deferred.reject(error);
				});

				return deferred.promise;
			}

			return services;
		};
	}

	function ytModalGenerator($q, $uibModal){
		return () => {
			let services = {
				openModal: openModal,
				getSearchTemp: getSearchTemp,
				getVideoTemp: getVideoTemp,
				getTransTemp: getTransTemp,
				getWarnTemp: getWarnTemp,
				getDangerTemp: getDangerTemp
			};

			let searchTemp = {
				templateUrl: './partials/search/search-partials/modals/error-modal.html',
				controller: 'ErrorModalController',
				controllerAs: 'errorModal'
			};

			let videoTemp = {
				templateUrl: './partials/video/video-partials/modals/error-modal.html',
				controller: 'ErrorModalController',
				controllerAs: 'errorModal'
			};

			let transTemp = {
				templateUrl: './partials/search/search-partials/modals/translate-error-modal.html',
				controller: 'ErrorModalController',
				controllerAs: 'errorModal'
			};

			let warnTemp = {
				templateUrl: './partials/playlist/playlist-partials/modals/warn-modal.html',
				controller: 'DangerModalController',
				controllerAs: 'dangerModal'
			};

			let dangerTemp = {
				templateUrl: './partials/playlist/playlist-partials/modals/danger-modal.html',
				controller: 'dangerModalController',
				controllerAs: 'dangerModal'
			};

			function openModal(modalObj){
				let deferred = $q.defer();
				let modalInstance = $uibModal.open({
					templateUrl: modalObj.templateUrl,
					controller: modalObj.controller,
					controllerAs: modalObj.controllerAs
				});

				modalInstance.result.then((result) => {
					deferred.resolve(result);
				}, (error) => {
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

			function getWarnTemp(){
				return warnTemp;
			}

			function getDangerTemp(){
				return dangerTemp;
			}

			return services;
		};
	}

	//For cross-browser compatibility, this will convert a stringified date into a date object. Date inputs don't exist in certain browsers such as Firefox, so we use Moment.js to create our own object to be used.
	function ytDateHandler(){
		return () => {

			let services = {
				check: check,
				getDate: getDate
			};

			function getDate(date, format){
				return (typeof date === 'string') ? moment(date, format)._d : date;
			}

			function check(){
				let supported = {date: false, number: false, time: false, month: false, week: false},
				tester = document.createElement('input');

				tester.type = 'date';

				if(tester.type === 'date'){
					return true;
				} else {
					return false;
				}
			}

			return services;
		};
	}

	function ytInitAPIs($q, ytModalGenerator){
		let initTemp = {
			templateUrl: './partials/search/search-partials/modals/init-modal.html',
			controller: 'InitModalController',
			controllerAs: 'initModal'
		};

		let updateTemp = {
			templateUrl: './partials/search/search-partials/modals/update-modal.html',
			controller: 'UpdateModalController',
			controllerAs: 'updateModal'
		};

		this.apisObj = {
			id: 'New User'
		};

		this.check = check;
		this.update = update;
		this.updateMapsScript = updateMapsScript;

		function check(){
			let deferred = $q.defer();
			//Checking localStorage to see if user has an id with saved API keys
			if(localStorage['uyts-log-info']){
				let obj = JSON.parse(localStorage['uyts-log-info']);
				this.apisObj = obj;
				//Updating the DOM (for the Google Maps API)
				updateDOM(this.apisObj.mapsKey);
				deferred.resolve(this.apisObj);
			} else {
				ytModalGenerator().openModal(initTemp)
				.then((result)=>{
					if(result === 'cancel'){
						//Do nothing
					} else {
						localStorage.setItem('uyts-log-info', JSON.stringify(result));
						this.apisObj = localStorage['uyts-log-info'];
						updateDOM(this.apisObj.mapsKey);

						//Refresh page to enable g maps to work
						//If I add a separate success modal, we will move this to that callback.
						location.reload();
					}
				});
			}
			return deferred.promise;
		}

		function update(){
			ytModalGenerator().openModal(updateTemp)
			.then((result)=>{
				if(result === 'cancel'){
					//Do nothing
				} else {
					localStorage.setItem('uyts-log-info', JSON.stringify(result));
					this.apisObj = localStorage['uyts-log-info'];
					updateDOM(this.apisObj.mapsKey);

					//Refresh page to enable g maps to work
					location.reload();
				}
			});
		}

		function updateDOM(key){
			if(key){
				updateMaps(key);
			} else {
				updateMaps('');
			}
		}

		//Construct url with saved Google Maps API key, then run loadScript()
		function updateMaps(key){
			let src = 'https://maps.googleapis.com/maps/api/js?key='+key;
			loadScript(src)
			.then(() => {
				//Success
			}, ()=> {
				//Error
			});

		}

		//Appends a script tag
		function loadScript(src) {
			return new Promise((resolve, reject) => {
				let s;
				s = document.createElement('script');

				s.src = src;
				s.async = "async";
				s.onload = resolve;
				s.onerror = reject;
				document.body.appendChild(s);
			});
		}

		function updateMapsScript(key) {
			let t = document.getElementsByTagName('script')[0];
			t.src = 'https://maps.googleapis.com/maps/api/js?key='+key;
		}
	}




})();





