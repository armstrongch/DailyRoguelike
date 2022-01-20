var player =
{	
	heat:	{ value: 100,	max: 100 },
	energy:	{ value: 500,	max: 500 },
	wood:	{ value: 0,		max: 100 },
	food:	{ value: 0,		max: 100 },
	item:	" ",
	
	current_area: {
		x: -1, y: -1
	},
	current_space: {
		x: -1, y: -1
	},
	
	move: function(x_mod, y_mod)
	{
		draw.infoText = "";
		this.energy.value -= 3;
		
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
		var moved_area = false;
		
		if (target_x < 0)
		{
			this.current_space.x = 9;
			this.current_area.x -= 1;
			moved_area = true;
		}
		else if (target_x > 9)
		{
			this.current_space.x = 0;
			this.current_area.x += 1;
			moved_area = true;
		}
		else if (target_y < 0)
		{
			this.current_space.y = 9;
			this.current_area.y -= 1;
			moved_area = true;
		}
		else if (target_y > 9)
		{
			this.current_space.y = 0;
			this.current_area.y += 1;
			moved_area = true;
		}
		
		var targetObj = objects.getObjectByChar(
			map.getCharAtPosition(
				this.current_area.x, this.current_area.y, target_x, target_y));
		
		if ((targetObj.walkable)
		&& (!moved_area))
		{	
			this.current_space.x = target_x;
			this.current_space.y = target_y;
		}
		
		targetObj.interact(this.current_area.x, this.current_area.y, target_x, target_y);
		
		if (!snow.spaceIsShovelled(this.current_area.x, this.current_area.y, this.current_space.x, this.current_space.y))
		{
			draw.infoText += " snow reduces your body heat. ";
			this.heat.value -= 1;
		}
		
		game.end_turn();
	}
};