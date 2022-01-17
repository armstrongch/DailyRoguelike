var utility =
{
	//https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
	setCursorPosition: function(canvas, event) {
		const rect = canvas.getBoundingClientRect()
		draw.mousePosition.x = event.clientX - rect.left;
		draw.mousePosition.y = event.clientY - rect.top;
		draw.everything();
	},
	
	handleKeyDown: function(event)
	{
		console.log(event);
	}
};