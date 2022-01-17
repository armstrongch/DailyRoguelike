var game = 
{
	seed: {},
	infoText: "",
	
	getCanvasInfo: function() {
		return {
			ctx: $('#gameCanvas')[0].getContext('2d'),
			width: $('#gameCanvas')[0].width,
			height: $('#gameCanvas')[0].height
		}
	},
	
	load: function()
	{
		this.seed = this.getSeed();
		
		var canvas_size = Math.min(600, $(window).width()*0.85, $(window).height()*0.85);
		$('#gameCanvas')[0].height = canvas_size;
		$('#gameCanvas')[0].width = canvas_size;
		
		$('#gameCanvas')[0].addEventListener('mousedown', function(e) {
			utility.setCursorPosition(this, e);
		});
		
		window.addEventListener('keydown', function(e) {
			utility.handleKeyDown(e);
		});

		map.generate();
		
		draw.everything();
	},
	
	getSeed: function()
	{
		var date = new Date();
		return {
			day: date.getDate(),
			month: date.getMonth(),
			year: date.getFullYear(),
			asText: function()
			{
				return this.year + "-" + this.month+1 + "-" + this.day;
			}
		};
	}
};