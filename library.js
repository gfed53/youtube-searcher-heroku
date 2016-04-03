// Not in use for now
angular
.module('myApp')
.factory('videoItems', videoItems);

function videoItems(){
	return function(){
		var items = [
			{
				name: "Video 1",
				id: "xZD-DAg7MgE"
			},
			{
				name: "Video 2",
				id: "KqRs_2kGZuY"
			},
			{
				name: "Video 3",
				id: "dqJRoh8MnBo"
			},
			{
				name: "Video 4",
				id: "OnoHdmbVPX4"
			}
		],
		services = {
			getItems: getItems,
			addItem: addItem
		}
		return services;

		function getItems(){
			return items;
		}

		function addItem(name, id){
			var item = {
				name: name,
				id: id
			}

			items.push[item];
		}
	}
}