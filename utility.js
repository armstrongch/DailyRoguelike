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
		switch(event.code)
		{
			case "KeyW":
			case "ArrowUp":
				player.move(0, -1);
				break;
			case "KeyS":
			case "ArrowDown":
				player.move(0, 1);
				break;
			case "KeyA":
			case "ArrowLeft":
				player.move(-1, 0);
				break;
			case "KeyD":
			case "ArrowRight":
				player.move(1, 0);
				break;
		}
	},
	
	//https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
	xDown: null,
	yDown: null,

	getTouches: function(evt) {
	  return evt.touches ||             // browser API
			 evt.originalEvent.touches; // jQuery
	},                                                  
																			 
	handleTouchStart: function(evt) {
		const firstTouch = this.getTouches(evt)[0];                                      
		this.xDown = firstTouch.clientX;                                      
		this.yDown = firstTouch.clientY;                                      
	},                                           
																			 
	handleTouchMove: function(evt) {
		if ( ! this.xDown || ! this.yDown ) {
			return;
		}

		var xUp = evt.touches[0].clientX;                                    
		var yUp = evt.touches[0].clientY;

		var xDiff = this.xDown - xUp;
		var yDiff = this.yDown - yUp;
																			 
		if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
			if ( xDiff > 0 ) {
				/* right swipe */ 
				player.move(1, 0);
			} else {
				/* left swipe */
				player.move(-1, 0);
			}                       
		} else {
			if ( yDiff > 0 ) {
				/* down swipe */ 
				player.move(0, 1);
			} else { 
				/* up swipe */
				player.move(0, -1);
			}                                                                 
		}
		/* reset values */
		this.xDown = null;
		this.yDown = null;                                             
	}
};