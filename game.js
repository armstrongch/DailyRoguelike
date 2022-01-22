var game = 
{
	state: "title",
	//possible states: title, overworld
	
	getCanvasInfo: function() {
		return {
			ctx: $('#gameCanvas')[0].getContext('2d'),
			width: $('#gameCanvas')[0].width,
			height: $('#gameCanvas')[0].height
		}
	},
	
	load: function()
	{	
		var canvas_size = Math.min(600, $(window).width()*0.85, $(window).height()*0.75);
		$('#gameCanvas')[0].height = canvas_size;
		$('#gameCanvas')[0].width = canvas_size;
		
		$('#gameCanvas')[0].addEventListener('mousedown', function(e) {
			utility.setCursorPosition(this, e);
		});
		
		window.addEventListener('keydown', function(e) {
			utility.handleKeyDown(e);
		});
		
		window.addEventListener('touchstart', function(e) {
			utility.handleTouchStart(e);
		}, false);
		
		window.addEventListener('touchmove', function(e) {
			utility.handleTouchMove(e);
		}, false);

		map.generate();
		objects.initialize();
		map.process_all();
		draw.everything();
	},
	
	end_turn: function()
	{
		map.process_all();
		draw.everything();
	},
};