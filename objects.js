var objects =
{
	list: [],
	
	default_process: function(area_x, area_y, x, y) { /*do nothing*/ },
	
	initialize: function()
	{
		this.list.push({
			objChar: "@",
			desc: "A Wayward Traveller",
			special_color: false,
			walkable: false,
			process: this.default_process
		});
		
		this.list.push({
			objChar: " ",
			desc: "Empty",
			special_color: false,
			walkable: true,
			process: this.default_process
		});
		
		this.list.push({
			objChar: "W",
			desc: "Ocean",
			special_color: false,
			walkable: false,
			process: this.default_process
		});
		
		this.list.push({
			objChar: "F",
			desc: "Fire",
			special_color: true,
			color: draw.colors.orange,
			walkable: false,
			process: fire.process
		});
		
		this.list.push({
			objChar: "f",
			desc: "Footprints",
			special_color: false,
			walkable: true,
			process: this.default_process
		});
	},
	
	getObjectByChar: function(searchChar)
	{
		return this.list.find(obj => {
		  return obj.objChar === searchChar
		});
	}
};