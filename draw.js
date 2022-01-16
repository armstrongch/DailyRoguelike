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
	
	everything: function()
	{
		$('#infoText').css('color', this.colors.white);
		$('#infoText').text(game.infoText);
		this.background();
	},
	
	background: function()
	{
		
		//body color
		$('body').css('background-color', this.colors.purple);
		
		//canvas color
		var canvasInfo = game.getCanvasInfo();
		var ctx = canvasInfo.ctx;
		ctx.fillStyle = this.colors.white;
		ctx.fillRect(0, 0, canvasInfo.width*0.9, canvasInfo.height*0.9);
	}
}