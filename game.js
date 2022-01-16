var game = 
{
	seed: {},
	infoText: "",
	
	getCanvasInfo: function() {
		return {
			ctx: $('#gameCanvas')[0].getContext('2d'),
			width: $('#gameCanvas').width(),
			height: $('#gameCanvas').height()
		}
	},
	
	load: function()
	{
		this.seed = this.getSeed();
		
		var canvas_size = Math.min(600, $(window).width()*0.85, $(window).height()*0.85);
		$('#gameCanvas').height(canvas_size);
		$('#gameCanvas').width(canvas_size);
		
		this.infoText = 'Today is ' + this.seed.asText();
		
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