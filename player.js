var player =
{
	current_area: {
		x: -1, y: -1
	},
	current_space: {
		x: -1, y: -1
	},
	
	move: function(x_mod, y_mod)
	{
		currentSpaceChar = map.getCharAtPosition(
			this.current_area.x, this.current_area.y,
			this.current_space.x, this.current_space.y);
		if (currentSpaceChar == " ")
		{
			map.updateCharAtPosition(
				this.current_area.x, this.current_area.y,
				this.current_space.x, this.current_space.y, "f");
		}
		
		draw.mousePosition.x = -1;
		draw.mousePosition.y = -1;
		
		var target_x = this.current_space.x + x_mod;
		var target_y = this.current_space.y + y_mod;
		
		if (target_x < 0)
		{
			this.current_space.x = 9;
			this.current_area.x -= 1;
		}
		else if (target_x > 9)
		{
			this.current_space.x = 0;
			this.current_area.x += 1;
		}
		else if (target_y < 0)
		{
			this.current_space.y = 9;
			this.current_area.y -= 1;
		}
		else if (target_y > 9)
		{
			this.current_space.y = 0;
			this.current_area.y += 1;
		}
		else
		{
			var targetSpace = objects.getObjectByChar(
				map.getCharAtPosition(
					this.current_area.x, this.current_area.y, target_x, target_y));
			console.log(targetSpace);
			if (targetSpace.walkable)
			{	
				this.current_space.x = target_x;
				this.current_space.y = target_y;
			}
		}
		draw.everything();
	}
};