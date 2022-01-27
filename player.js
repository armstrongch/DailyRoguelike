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
		
		if (moved_area)
		{
			var targetObj = objects.getObjectByChar(
				map.getCharAtPosition(
					this.current_area.x, this.current_area.y, this.current_space.x, this.current_space.y));

		}
		else
		{
			var targetObj = objects.getObjectByChar(
				map.getCharAtPosition(
					this.current_area.x, this.current_area.y, target_x, target_y));
		}
		
		if ((targetObj.walkable)
		&& (!moved_area))
		{	
			this.current_space.x = target_x;
			this.current_space.y = target_y;
		}
		
		targetObj.interact(this.current_area.x, this.current_area.y, target_x, target_y);
		
		player_item = objects.getObjectByChar(player.item);
		player_item.use_item(this.current_area.x, this.current_area.y, this.current_space.x, this.current_space.y, x_mod, y_mod);
		
		if (!snow.spaceIsShovelled(this.current_area.x, this.current_area.y, this.current_space.x, this.current_space.y))
		{
			draw.infoText += " snow reduces your body heat. ";
			this.heat.value -= 1;
		}
		
		this.energy.value -= 3;
		//restore 2 energy when walking in footprints
		//restore 3 energy when walking in fresh snow with snow shoes
		
		game.end_turn();
	},
	
	check_gameover: function()
	{
		if ((this.heat.value <= 0) || (this.energy.value <= 0))
		{
			game.state = "gameover";
		}
	}
};