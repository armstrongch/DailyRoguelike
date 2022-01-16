var game = {
	
	getContext: function() {
		return $('#gameCanvas')[0].getContext('2d');
	},
	
	load: function()
	{
		var canvas_size = Math.min(600, $(window).width()*0.8, $(window).height()*0.8);
		$('#gameCanvas').height(canvas_size);
		$('#gameCanvas').width(canvas_size);
	}
};