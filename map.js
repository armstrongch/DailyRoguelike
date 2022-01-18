var map =
{
	spaces_per_area_horizontal: 10,
	spaces_per_area_vertical: 10,
	
	areas_per_map_horizontal: 10,
	areas_per_map_vertical: 10,
	
	areas: [],
	
	shovelledSpaces: [],
	
	shovelSpace: function(area_x, area_y, space_x, space_y)
	{
		this.shovelledSpaces.push({
			map_area: {x: area_x, y: area_y},
			space: {x: space_x, y: space_y},
			fade_counter: 15
		});
	},
	
	spaceIsShovelled: function(area_x, area_y, space_x, space_y)
	{
		return this.shovelledSpaces.filter(obj => {
		  return ((obj.map_area.x === area_x)
			&& (obj.map_area.y === area_y)
			&& (obj.space.x === space_x)
			&& (obj.space.y === space_y))
		}).length > 0;
	},
	
	generate: function()
	{
		player.current_area.x = 1 + Math.floor(Math.random()*(this.areas_per_map_horizontal-2));
		player.current_area.y = 1 + Math.floor(Math.random()*(this.areas_per_map_horizontal-2));
		player.current_space.x = 3;
		player.current_space.y = 3;
		
		for (let i = 2; i < this.spaces_per_area_horizontal-2; i += 1)
		{
			for (let j = 2; j < this.spaces_per_area_horizontal-2; j += 1)
			{
				this.shovelSpace(
					player.current_area.x, player.current_area.y, i, j, false
				);
			}
		}
		
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
					areaString += "W";
				}
				else
				{
					areaString += " ";
				}
			}
		}
		return areaString;
	},
	
	getCharAtPosition: function(map_x, map_y, space_x, space_y)
	{
		var charPos = space_y*10 + space_x;
		var areaString = this.areas[map_x][map_y];
		return areaString.substring(charPos, charPos+1);
	},
	
	updateCharAtPosition: function(map_x, map_y, space_x, space_y, newChar)
	{
		var charPos = space_y*10 + space_x;
		var areaString = this.areas[map_x][map_y];
		var beginningOfString = areaString.substring(0, charPos);
		var endOfString = areaString.substring(charPos+1);
		this.areas[map_x][map_y] = beginningOfString + newChar + endOfString;
	}
};