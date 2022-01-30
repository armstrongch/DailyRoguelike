var footprints =
{
	interact: function(area_x, area_y, x, y)
	{
		player.energy.value = Math.min(player.energy.value + 2, player.energy.max);
		draw.infoText = "retracing your [f]ootsteps helps to conserve energy.";
	},
};

var ocean =
{
	interact: function(area_x, area_y, x, y)
	{
		draw.infoText = "it is impossible to traverse the frigid ocean [W]aves.";
	},
};

var berrybush =
{
	interact: function(area_x, area_y, x, y)
	{
		draw.infoText = "eating [B]erries restores 40 energy.";
		player.energy.value = Math.min(player.energy.value + 40, player.energy.max);
		player.food.value += 1;
		map.updateCharAtPosition(area_x, area_y, x, y, "b");
	},
};

var wood =
{
	interact: function(area_x, area_y, x, y)
	{
		player.wood.value = Math.min(player.wood.value + 1, player.wood.max);
		draw.infoText = "picked up some [w]ood.";
		map.updateCharAtPosition(area_x, area_y, x, y, "f");
	},
};

var river = 
{
	//this is also used by the ocean!
	process: function(area_x, area_y, x, y)
	{
		snow.shovelSpace(area_x, area_y, x, y);
	}
};