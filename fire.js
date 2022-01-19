var fire = 
{
	range: 3,
	
	process: function(area_x, area_y, space_x, space_y)
	{
		for (let x = space_x-fire.range; x < space_x+fire.range + 1; x += 1)
		{
			for (let y = space_y-fire.range; y < space_y+fire.range + 1; y += 1)
			{
				var total_dist = Math.abs(space_x - x) + Math.abs(space_y - y);
				if (total_dist <= fire.range)
				{
					snow.shovelSpace(area_x, area_y, x, y);
				}
			}
		}
	},
	interact: function(area_x, area_y, x, y)
	{
		player.heat.value = Math.min(player.heat.value + 15, player.heat.max);
		draw.infoText = "the [F]ire restores 15 body heat.";
	},
};