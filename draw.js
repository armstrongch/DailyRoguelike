var draw = 
{
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
		$('#infoText').css('color', this.colors.white);
		$('#infoText').text(game.infoText);
		this.draw_bg();
		this.draw_map();
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
		canvasInfo.ctx.fillStyle = this.colors.purple;
		
		var mapAreaString = map.areas[player.current_area.x][player.current_area.y]; //test.getTestMapArea();
		var stringIndex = 0;
		
		var mouse_h = Math.floor(this.mousePosition.y / spaceSize) + 0.5;
		var mouse_w = Math.floor(this.mousePosition.x / spaceSize) + 0.5;
		
		for (let h = 0.5; h < 10; h += 1)
		{
			for (let w = 0.5; w < 10; w += 1)
			{
				var print_pos_x = w*spaceSize;
				var print_pos_y = h*spaceSize;
				var textToPrint = mapAreaString.substring(stringIndex, stringIndex+1);
				if ((Math.floor(w) == player.current_space.x)
				&& (Math.floor(h) == player.current_space.y))
				{
					textToPrint = "@";
				}
				if ((h == mouse_h) && (w == mouse_w))
				{
					textToPrint = "[" + textToPrint + "]";
				}
				canvasInfo.ctx.fillText(textToPrint, print_pos_x, print_pos_y);
				stringIndex += 1;
			}
		}
	}
};