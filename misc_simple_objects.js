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