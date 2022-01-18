var objects =
{
	list: [],
	
	initialize: function()
	{
		this.list.push({
			objChar: "@",
			desc: "A Wayward Traveller",
			special_color: false,
			walkable: false
		});
		
		this.list.push({
			objChar: " ",
			desc: "Empty",
			special_color: false,
			walkable: true
		});
		
		this.list.push({
			objChar: "W",
			desc: "Ocean",
			special_color: false,
			walkable: false
		});
		
		this.list.push({
			objChar: "F",
			desc: "Fire",
			special_color: true,
			color: draw.colors.orange,
			walkable: false
		});
		
		this.list.push({
			objChar: "f",
			desc: "Footprints",
			special_color: false,
			walkable: true
		});
	},
	
	getObjectByChar: function(searchChar)
	{
		return this.list.find(obj => {
		  return obj.objChar === searchChar
		});
	}
};