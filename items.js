var shovel =
{
	use_item: function(area_x, area_y, space_x, space_y, x_mod, y_mod)
	{
		if(!snow.spaceIsShovelled(area_x, area_y, space_x, space_y))
		{
			for (let i = 0; i < 3; i += 1)
			{
				snow.shovelSpace(area_x, area_y, space_x + i*x_mod, space_y + i*y_mod);
			}
		}
	},
};

var snowshoes =
{
	use_item: function(area_x, area_y, space_x, space_y, x_mod, y_mod)
	{
		if(!snow.spaceIsShovelled(area_x, area_y, space_x, space_y))
		{
			space_char = map.getCharAtPosition(area_x, area_y, space_x, space_y);
			if (space_char != "f")
			{
				player.energy.value = Math.min(player.energy.value + 3, player.energy.max);
			}
		}
	},
};

var axe =
{
	use_item: function(area_x, area_y, space_x, space_y, x_mod, y_mod)
	{
		if (map.space_in_area(space_x + x_mod, space_y + y_mod))
		{
			targetChar = map.getCharAtPosition(area_x, area_y, space_x + x_mod, space_y + y_mod);
			if (targetChar == "T")
			{
				map.updateCharAtPosition(area_x, area_y, space_x + x_mod, space_y + y_mod, "w");
			}
		}
	},
};