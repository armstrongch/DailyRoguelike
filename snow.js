var snow =
{
	shovelledSpaces: [],
	
	max_snow_fade_counter: 15,
	
	accumulateSnowOnSpace: function(area_x, area_y, space_x, space_y)
	{
		if (this.spaceIsShovelled(area_x, area_y, space_x, space_y))
		{
			var shovelledSpace = this.shovelledSpaces.find(obj => {
				return ((obj.map_area.x === area_x)
				&& (obj.map_area.y === area_y)
				&& (obj.space.x === space_x)
				&& (obj.space.y === space_y))
			});
			shovelledSpace.fade_counter -= 1;
			if (shovelledSpace.fade_counter <= 0)
			{
				var index = this.shovelledSpaces.indexOf(shovelledSpace);
				this.shovelledSpaces.splice(index, 1);
			}
			
		}
	},
	
	shovelSpace: function(area_x, area_y, space_x, space_y)
	{
		if (map.space_in_area(space_x, space_y))
		{
			if (!this.spaceIsShovelled(area_x, area_y, space_x, space_y))
			{
				this.shovelledSpaces.push({
					map_area: {x: area_x, y: area_y},
					space: {x: space_x, y: space_y},
					fade_counter: this.max_snow_fade_counter
				});
			}
			else
			{
				this.shovelledSpaces.find(obj => {
					return ((obj.map_area.x === area_x)
					&& (obj.map_area.y === area_y)
					&& (obj.space.x === space_x)
					&& (obj.space.y === space_y))
				}).fade_counter = this.max_snow_fade_counter;
			}
		}
	},
	
	spaceIsShovelled: function(area_x, area_y, space_x, space_y)
	{
		return this.shovelledSpaces.filter(obj => {
		  return ((obj.map_area.x === area_x)
			&& (obj.map_area.y === area_y)
			&& (obj.space.x === space_x)
			&& (obj.space.y === space_y))
		}).length > 0;
	}
};