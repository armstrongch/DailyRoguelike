var map =
{
	spaces_per_area_horizontal: 10,
	spaces_per_area_vertical: 10,
	
	areas_per_map_horizontal: 10,
	areas_per_map_vertical: 10,
	
	areas: [],
	
	generation: {
		random_gen_array: [],
		average_object_count: 5,
		current_object_count: 0,
		
		total_object_counts: [
			{objChar: "P", count: 0}, //firepit
			{objChar: "T", count: 0}, //tree
			{objChar: "w", count: 0}, //wood
			{objChar: "B", count: 0}, //berry bush
		],
		
		get_lowest_count_char: function()
		{
			var low_count = -1;
			var low_char = " ";
			var low_index = -1;
			for (let i = 0; i < this.total_object_counts.length; i += 1)
			{
				if ((this.total_object_counts[i].count <= low_count)
				|| (low_char == " "))
				{
					low_count = this.total_object_counts[i].count;
					low_char = this.total_object_counts[i].objChar;
					low_index = i;
				}
			}
			this.total_object_counts[low_index].count += 1;
			return low_char;
		},
		
		get_random_char: function()
		{
			utility.shuffle(this.total_object_counts);
			this.total_object_counts[0].count += 1;
			return this.total_object_counts[0].objChar;
		},
		
		build_random_gen_array: function()
		{
			this.random_gen_array = [];
			for (let x = 1; x < map.spaces_per_area_horizontal - 1; x += 1)
			{
				for (let y = 1; y < map.spaces_per_area_vertical - 1; y += 1)
				{
					this.random_gen_array.push({x: x, y: y, objChar: " "});
					utility.shuffle(this.random_gen_array);
				}
			}
		},
		
		get_random_gen_array_char_at_position: function(x_pos, y_pos)
		{
			var return_char = " ";
			for (let i = 0; i < this.random_gen_array.length; i += 1)
			{
				if ((this.random_gen_array[i].x == x_pos)
				&& (this.random_gen_array[i].y == y_pos))
				{
					return_char = this.random_gen_array[i].objChar;
					i = 999;
				}
			}
			return return_char;
		}
	},
	
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
		
		this.create_river();
		
		this.updateCharAtPosition(player.current_area.x, player.current_area.y, 5, 4, "F");
		this.updateCharAtPosition(player.current_area.x, player.current_area.y, 4, 6, "A");
		this.updateCharAtPosition(player.current_area.x, player.current_area.y, 5, 6, "S");
		this.updateCharAtPosition(player.current_area.x, player.current_area.y, 6, 6, "n");
	},
	
	create_river: function()
	{
		river_horizontal = Math.random() >= 0.5;
		
		var river_area;
		var river_space;
		var area_coverage;
		var space_coverage;
		var bridge_area;
		var bridge_space;
		
		if (river_horizontal)
		{
			river_area = this.areas_per_map_vertical/2;
			if (player.current_area.y >= river_area)
			{
				river_area -= 1;
			}
			river_space = 2 + Math.floor(Math.random()*(this.spaces_per_area_vertical - 4));
			area_coverage = this.areas_per_map_horizontal;
			space_coverage = this.spaces_per_area_horizontal;
			bridge_area = Math.floor(Math.random()*this.areas_per_map_horizontal);
			bridge_space = 3 + Math.floor(Math.random()*(this.spaces_per_area_horizontal-6));
		}
		else
		{
			river_area = this.areas_per_map_horizontal/2;
			if (player.current_area.x >= river_area)
			{
				river_area -= 1;
			}
			river_space = 2 + Math.floor(Math.random()*(this.spaces_per_area_horizontal - 4));
			area_coverage = this.areas_per_map_vertical;
			space_coverage = this.spaces_per_area_vertical;
			bridge_area = Math.floor(Math.random()*this.areas_per_map_vertical);
			bridge_space = 3 + Math.floor(Math.random()*(this.spaces_per_area_vertical-6));
		}
		
		for (let a = 0; a < area_coverage; a += 1)
		{
			for (let s = 0; s < space_coverage; s += 1)
			{
				if (river_horizontal)
				{
					if ((a == bridge_area) && (s == bridge_space))
					{
						this.updateCharAtPosition(a, river_area, s, river_space, "g");
					}
					else
					{
						this.updateCharAtPosition(a, river_area, s, river_space, "r");
					}
				}
				else
				{
					if ((a == bridge_area) && (s == bridge_space))
					{
						this.updateCharAtPosition(river_area, a, river_space, s, "g");
					}
					else
					{
						this.updateCharAtPosition(river_area, a, river_space, s, "r");
					}
				}
			}
		}
	},
	
	space_in_area: function(x, y)
	{
		return ((x >= 0) && (y >= 0) && (x < this.spaces_per_area_horizontal) && (y < this.spaces_per_area_horizontal));
	},
	
	generateArea: function(horizPos, vertPos)
	{
		var areaString = "";
		this.generation.build_random_gen_array();
		
		if ((horizPos != player.current_area.x) || (vertPos != player.current_area.y))
		{
			var area_gen_count = 0;
			if (this.generation.current_object_count == 0)
			{
				this.generation.current_object_count = 1 + Math.floor(Math.random()*this.generation.average_object_count*2);
				area_gen_count = this.generation.current_object_count
			}
			else
			{
				area_gen_count = this.generation.average_object_count*2 - this.generation.current_object_count;
				this.generation.current_object_count = 0;
			}
			
			for (let i = 0; i < area_gen_count; i += 1)
			{
				if (i == 0)
				{
					this.generation.random_gen_array[i].objChar = this.generation.get_lowest_count_char();
				}
				else
				{
					this.generation.random_gen_array[i].objChar = this.generation.get_random_char();
				}
			}
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
					//areaString += " ";
					areaString += this.generation.get_random_gen_array_char_at_position(x, y);
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