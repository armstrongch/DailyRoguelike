var objects =
{
	list: [],
	
	default_process: function(area_x, area_y, x, y) { /*do nothing*/ },
	default_interact: function(area_x, area_y, x, y) { /*do nothing*/ },
	
	initialize: function()
	{
		this.list.push({
			objChar: "@",
			desc: "a lonely traveller",
			special_color: false,
			walkable: false,
			process: this.default_process,
			interact: this.default_interact
		});
		
		this.list.push({
			objChar: " ",
			desc: "empty",
			special_color: false,
			walkable: true,
			process: this.default_process,
			interact: this.default_interact
		});
		
		this.list.push({
			objChar: "W",
			desc: "cold, unforgiving ocean [W]aves",
			special_color: false,
			walkable: false,
			process: this.default_process,
			interact: ocean.interact
		});
		
		this.list.push({
			objChar: "F",
			desc: "warm, inviting camp [F]ire",
			special_color: true,
			color: draw.colors.orange,
			walkable: false,
			process: fire.process,
			interact: fire.interact,
		});
		
		this.list.push({
			objChar: "f",
			desc: "[f]ootprints",
			special_color: false,
			walkable: true,
			process: this.default_process,
			interact: footprints.interact
		});
	},
	
	getObjectByChar: function(searchChar)
	{
		return this.list.find(obj => {
		  return obj.objChar === searchChar
		});
	}
};