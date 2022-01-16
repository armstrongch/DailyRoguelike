var map =
{
	spaces_per_area_horizontal: 10,
	spaces_per_area_vertical: 10,
	
	areas_per_map_horizontal: 10,
	areas_per_map_vertical: 10,
	
	areas: [],
	
	generate: function()
	{
		this.areas = [];
		for (let v = 0; v < areas_per_map_vertical; v += 1)
		{
			this.areas.push([]);
			for (let h = 0; h < areas_per_map_horizontal; h += 1)
			{
				this.areas[i].push(this.generateArea(h, v));
			}
		}
	},
	
	generateArea: function(horizPos, vertPos)
	{
		var areaString = "";
		for (let y = 0; y < spaces_per_area_vertical; y += 1)
		{
			for (let x = 0; x < spaces_per_area_horizontal; x += 1)
			{
				if (((horizPos == 0) && (x == 0)) 
				|| ((vertPos == 0) && (y == 0))
				|| ((horizPos == areas_per_map_horizontal - 1) && (x == spaces_per_area_horizontal - 1))
				|| ((vertPos == areas_per_map_vertical - 1) && (y == spaces_per_area_vertical - 1)))
				{
					areaString += "R";
				}
				else
				{
					areaString += " ";
				}
			}
		}
		return areaString;
	}
};