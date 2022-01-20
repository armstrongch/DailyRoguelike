var objects =
{
	list: [],
	
	default_process: function(area_x, area_y, x, y) { /*do nothing*/ },
	default_interact: function(area_x, area_y, x, y) { /*do nothing*/ },
	
	new_object: function({
		char_param,
		desc_param,
		special_color_param,
		color_param,
		walkable_param,
		process_param,
		interact_param} = {})
	{
		return {
			objChar: char_param === undefined ? " " : char_param,
			desc: desc_param === undefined ? "empty" : desc_param,
			special_color: special_color_param === undefined ? false : special_color_param,
			color: color_param === undefined ? draw.colors.white : color_param,
			walkable: walkable_param === undefined ? false : walkable_param,
			process: process_param === undefined ? this.default_process : process_param,
			interact: interact_param === undefined ? this.default_interact : interact_param
		}
	},
	
	initialize: function()
	{
		this.list.push(
			this.new_object({
				char_param: "@",
				desc_param: "a lonely traveller",
			}));
		
		this.list.push(
			this.new_object({
				char_param: " ",
				desc_param: "empty",
				walkable_param: true,
			}));
			
		this.list.push(
			this.new_object({
				char_param: "W",
				desc_param: "cold, unforgiving ocean [W]aves",
				interact_param: ocean.interact,
			}));
			
		this.list.push(
			this.new_object({
				char_param: "F",
				desc_param: "warm, inviting camp [F]ire",
				special_color_param: true,
				color_param: draw.colors.orange,
				process_param: fire.process,
				interact_param: fire.interact,
			}));
			
		this.list.push(
			this.new_object({
				char_param: "P",
				desc_param: "a fire[P]it",
				interact_param: firepit.interact,
			}));
			
		this.list.push(
			this.new_object({
				char_param: "f",
				desc_param: "[f]ootprints",
				walkable_param: true,
				interact_param: footprints.interact
			}));
			
		this.list.push(
			this.new_object({
				char_param: "B",
				desc_param: "[B]erry Bush",
				special_color_param: true,
				color_param: draw.colors.red,
				interact_param: berrybush.interact
			}));
		
		this.list.push(
			this.new_object({
				char_param: "b",
				desc_param: "[b]ush",
				special_color_param: true,
				color_param: draw.colors.green,
			}));
	},
	
	getObjectByChar: function(searchChar)
	{
		return this.list.find(obj => {
		  return obj.objChar === searchChar
		});
	}
};