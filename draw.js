var draw = 
{
	infoText: "",
	
	// https://coolors.co/38023b-a288e3-136f63-f34213-d72638
	colors:
	{
		white: "#A288E3",
		purple: "#38023b",
		orange: '#F34213',
		green: '#136F63',
		red: '#D72638'
	},
	
	mousePosition: { x: -1, y: -1 },
	
	everything: function()
	{
		this.draw_bg();
		switch(game.state)
		{
			case "title":
				this.draw_title();
				break;
			case "gameover":
				this.draw_gameover();
				break;
			case "overworld":
				this.draw_map();
				$('#infoText').css('color', this.colors.white);
				$('#infoText').text(this.infoText);
				this.stats_text();
				break;
		}
	},
	
	stats_text: function()
	{
		var statsText = "Body Heat: " + player.heat.value + ", Energy: " + player.energy.value + ", Wood: " + player.wood.value + ", Food: " + player.food.value;
		var itemChar = objects.getObjectByChar(player.item);
		if (itemChar != " ")
		{
			statsText += ", Item: " + itemChar.item_name;
		}
		$('#statsText').css('color', this.colors.white);
		$('#statsText').text(statsText);
	},
	
	draw_title: function()
	{
		var canvasInfo = game.getCanvasInfo();
		var fontSize = canvasInfo.width/15;
		canvasInfo.ctx.font = Math.floor(fontSize) + "px Courier New";
		canvasInfo.ctx.textAlign = "center";
		canvasInfo.ctx.textBaseline = "middle";
		canvasInfo.ctx.fillStyle = this.colors.purple;
		
		var text_to_draw = [];
		text_to_draw.push("Lonely Winter Sunsets");
		text_to_draw.push("");
		text_to_draw.push("a game by");
		text_to_draw.push("Chris TB Armstrong");
		text_to_draw.push("");
		text_to_draw.push("Swipe/Arrows to Move");
		text_to_draw.push("Click/Tap for Info");
		text_to_draw.push("");
		text_to_draw.push("Click/Tap to Continue");
		for (let i = 0; i < text_to_draw.length; i += 1)
		{
			canvasInfo.ctx.fillText(text_to_draw[i], canvasInfo.width/2, canvasInfo.height*0.2 + fontSize*1.1*i);
		}
	},
	
	draw_gameover: function()
	{
		var canvasInfo = game.getCanvasInfo();
		var fontSize = canvasInfo.width/15;
		canvasInfo.ctx.font = Math.floor(fontSize) + "px Courier New";
		canvasInfo.ctx.textAlign = "center";
		canvasInfo.ctx.textBaseline = "middle";
		canvasInfo.ctx.fillStyle = this.colors.purple;
		
		var text_to_draw = [];
		text_to_draw.push("Game Over");
		text_to_draw.push("");
		text_to_draw.push("Body Heat: " + player.heat.value);
		text_to_draw.push("Energy: " + player.energy.value);
		text_to_draw.push("Collected Wood: " + player.wood.value);
		text_to_draw.push("Collected Food: " + player.food.value);
		text_to_draw.push("");
		text_to_draw.push("Click/Tap to Restart");
		for (let i = 0; i < text_to_draw.length; i += 1)
		{
			canvasInfo.ctx.fillText(text_to_draw[i], canvasInfo.width/2, canvasInfo.height*0.2 + fontSize*1.1*i);
		}
	},
	
	draw_bg: function()
	{
		//body color
		$('body').css('background-color', this.colors.purple);
		
		//canvas color
		var canvasInfo = game.getCanvasInfo();
		canvasInfo.ctx.fillStyle = this.colors.white;
		canvasInfo.ctx.fillRect(0, 0, canvasInfo.width, canvasInfo.height);
	},
	
	draw_map: function()
	{
		var canvasInfo = game.getCanvasInfo();
		var spaceSize = canvasInfo.width/map.spaces_per_area_horizontal;
		var fontSize = spaceSize*0.7;
		canvasInfo.ctx.font = Math.floor(fontSize) + "px Courier New";
		canvasInfo.ctx.textAlign = "center";
		canvasInfo.ctx.textBaseline = "middle";
		
		var mapAreaString = map.areas[player.current_area.x][player.current_area.y]; //test.getTestMapArea();
		var stringIndex = 0;
		
		var mouse_h = Math.floor(this.mousePosition.y / spaceSize) + 0.5;
		var mouse_w = Math.floor(this.mousePosition.x / spaceSize) + 0.5;
		
		for (let h = 0.5; h < 10; h += 1)
		{
			for (let w = 0.5; w < 10; w += 1)
			{
				canvasInfo.ctx.fillStyle = this.colors.purple;
				var shovelled = snow.spaceIsShovelled(player.current_area.x, player.current_area.y, Math.floor(w-0.5), Math.floor(h-0.5))
				if (shovelled)
				{	
					canvasInfo.ctx.fillRect(
						Math.floor((w-0.5)*canvasInfo.width/map.spaces_per_area_horizontal),
						Math.floor((h-0.5)*canvasInfo.height/map.spaces_per_area_vertical),
						Math.ceil(canvasInfo.width/map.spaces_per_area_horizontal),
						Math.ceil(canvasInfo.height/map.spaces_per_area_vertical));
					canvasInfo.ctx.fillStyle = this.colors.white;
				}
				
				var print_pos_x = w*spaceSize;
				var print_pos_y = h*spaceSize;
				var textToPrint = mapAreaString.substring(stringIndex, stringIndex+1);
				if ((Math.floor(w) == player.current_space.x)
				&& (Math.floor(h) == player.current_space.y))
				{
					textToPrint = "@";
				}
				
				var obj = objects.getObjectByChar(textToPrint);
				if (obj.special_color)
				{
					canvasInfo.ctx.fillStyle = obj.color;
				}
				if ((h == mouse_h) && (w == mouse_w))
				{
					this.infoText = obj.desc;
					if (!shovelled)
					{
						this.infoText += " (snow)";
					}
					textToPrint = "[" + textToPrint + "]";
				}
				canvasInfo.ctx.fillText(textToPrint, print_pos_x, print_pos_y);
				stringIndex += 1;
			}
		}
	}
};