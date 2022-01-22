var objects =
{
	list: [],
	
	default_process: function(area_x, area_y, x, y) { /*do nothing*/ },
	default_use_item: function(area_x, area_y, x, y, x_mod, y_mod) { /*do nothing*/ },
	
	//NOTE: If an item uses a custom interact function, it must also call default_interact to pick up/drop if applicable
	default_interact: function(area_x, area_y, x, y)
	{
		if (this.item)
		{	
			if (player.item != " ")
			{
				player_item = objects.getObjectByChar(player.item);
				draw.infoText = "replaced " + player_item.item_name + " with " + this.desc + ".";
			}
			else
			{
				draw.infoText = "picked up " + this.desc + ".";
			}
			map.updateCharAtPosition(area_x, area_y, x, y, player.item);
			player.item = this.objChar;
		}
	},
	
	new_object: function({
		char_param,
		desc_param,
		special_color_param,
		color_param,
		walkable_param,
		process_param,
		interact_param,
		item_param,
		item_name_param,
		use_item_param} = {})
	{
		return {
			objChar: char_param === undefined ? " " : char_param,
			desc: desc_param === undefined ? "empty" : desc_param,
			special_color: special_color_param === undefined ? false : special_color_param,
			color: color_param === undefined ? draw.colors.white : color_param,
			walkable: walkable_param === undefined ? false : walkable_param,
			process: process_param === undefined ? this.default_process : process_param,
			interact: interact_param === undefined ? this.default_interact : interact_param,
			item: item_param === undefined ? false : item_param,
			item_name: item_name_param === undefined ? "" : item_name_param,
			use_item: use_item_param === undefined ? this.default_use_item : use_item_param
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
				char_param: "S",
				desc_param: "[S]hovel: clears 3 snow tiles at a time",
				item_param: true,
				item_name_param: "[S]hovel",
				use_item_param: shovel.use_item,
			}));
			
		this.list.push(
			this.new_object({
				char_param: "n",
				desc_param: "s[n]owshoes: conserves energy when walking in fresh snow.",
				item_param: true,
				item_name_param: "s[n]owshoes",
				use_item_param: snowshoes.use_item,
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