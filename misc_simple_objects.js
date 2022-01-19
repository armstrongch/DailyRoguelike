var footprints =
{
	interact: function(area_x, area_y, x, y)
	{
		player.energy.value = Math.min(player.energy.value + 1, player.energy.max);
		draw.infoText = "retracing your [f]ootsteps helps to conserve energy.";
	},
};

var ocean =
{
	interact: function(area_x, area_y, x, y)
	{
		draw.infoText = "it is impossible to traverse the frigid ocean [W]aves.";
	},
}