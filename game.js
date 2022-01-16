var game = 
{
	
	getCanvasInfo: function() {
		return {
			ctx: $('#gameCanvas')[0].getContext('2d'),
			width: $('#gameCanvas').width(),
			height: $('#gameCanvas').height()
		}
	},
	
	load: function()
	{
		var canvas_size = Math.min(600, $(window).width()*0.8, $(window).height()*0.8);
		$('#gameCanvas').height(canvas_size);
		$('#gameCanvas').width(canvas_size);
		draw.background();
	}
};