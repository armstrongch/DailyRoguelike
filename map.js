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
		player.current_space.x = 4;
		player.current_space.y = 4;
		
		this.areas = [];
		for (let h = 0; h < this.areas_per_map_horizontal; h += 1)
		{
			this.areas.push([]);
			for (let v = 0; v < this.areas_per_map_vertical; v += 1)
			{
				this.areas[h].push(this.generateArea(h, v));
			}
		}
		
		this.updateCharAtPosition(player.current_area.x, player.current_area.y, 5, 4, "F");
		this.updateCharAtPosition(player.current_area.x, player.current_area.y, 4, 6, "A");
		this.updateCharAtPosition(player.current_area.x, player.current_area.y, 5, 6, "S");
		this.updateCharAtPosition(player.current_area.x, player.current_area.y, 6, 6, "n");
		
		this.updateCharAtPosition(player.current_area.x, player.current_area.y, 4, 8, "T");
		this.updateCharAtPosition(player.current_area.x, player.current_area.y, 5, 8, "T");
		this.updateCharAtPosition(player.current_area.x, player.current_area.y, 6, 8, "T");
	},
	
	space_in_area: function(x, y)
	{
		return ((x >= 0) && (y >= 0) && (x < this.spaces_per_area_horizontal) && (y < this.spaces_per_area_horizontal));
	},
	
	generateArea: function(horizPos, vertPos)
	{
		var areaString = "";
		
		if ((horizPos != player.current_area.x) && (vertPos != player.current_area.y))
		{
			//stuff to generate: fire pits, trees, wood, berry bushes, 
		}
		
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
	},
	
	process_all: function()
	{
		for (let i = 0; i < this.areas_per_map_horizontal; i += 1)
		{
			for (let j = 0; j < this.areas_per_map_vertical; j += 1)
			{
				this.process_area(i, j);
			}
		}
	},
	
	process_area: function(area_x, area_y)
	{
		this.process_area_snow(area_x, area_y);
		this.process_area_objects(area_x, area_y);
	},
	
	process_area_snow: function(area_x, area_y)
	{
		for (let x = map.spaces_per_area_horizontal - 1; x >= 0; x -= 1)
		{
			for (let y = map.spaces_per_area_vertical - 1; y >= 0; y -= 1)
			{
				snow.accumulateSnowOnSpace(area_x, area_y, x, y);
			}
		}
	},
	
	process_area_objects: function(area_x, area_y)
	{
		for (let x = map.spaces_per_area_horizontal - 1; x >= 0; x -= 1)
		{
			for (let y = map.spaces_per_area_vertical - 1; y >= 0; y -= 1)
			{
				var charToProcess = this.getCharAtPosition(
					area_x, area_y,
					x, y);
				
				var objToProcess = objects.getObjectByChar(charToProcess);
				
				objToProcess.process(area_x, area_y, x, y);
			}
		}
	}
};