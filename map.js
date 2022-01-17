var map =
{
	spaces_per_area_horizontal: 10,
	spaces_per_area_vertical: 10,
	
	areas_per_map_horizontal: 10,
	areas_per_map_vertical: 10,
	
	areas: [],
	
	generate: function()
	{
		player.current_area.x = 1 + Math.floor(Math.random()*(this.areas_per_map_horizontal-2));
		player.current_area.y = 1 + Math.floor(Math.random()*(this.areas_per_map_horizontal-2));
		player.current_space.x = 3;
		player.current_space.y = 3;
		
		this.areas = [];
		for (let h = 0; h < this.areas_per_map_horizontal; h += 1)
		{
			this.areas.push([]);
			for (let v = 0; v < this.areas_per_map_vertical; v += 1)
			{
				this.areas[h].push(this.generateArea(h, v));
			}
		}
	},
	
	generateArea: function(horizPos, vertPos)
	{
		var areaString = "";
		for (let y = 0; y < this.spaces_per_area_vertical; y += 1)
		{
			for (let x = 0; x < this.spaces_per_area_horizontal; x += 1)
			{
				if (((horizPos == 0) && (x == 0)) 
				|| ((vertPos == 0) && (y == 0))
				|| ((horizPos == this.areas_per_map_horizontal - 1) && (x == this.spaces_per_area_horizontal - 1))
				|| ((vertPos == this.areas_per_map_vertical - 1) && (y == this.spaces_per_area_vertical - 1)))
				{
					areaString += "R";
				}
				else
				{
					areaString += " ";
				}
			}
			areaString += "\n";
		}
		return areaString;
	}
};