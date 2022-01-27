var utility =
{
	//https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
	setCursorPosition: function(canvas, event) {
		
		switch (game.state)
		{
			case "overworld":
				const rect = canvas.getBoundingClientRect()
				draw.mousePosition.x = event.clientX - rect.left;
				draw.mousePosition.y = event.clientY - rect.top;
				draw.everything();
				break;
			case "title":
				game.state = "overworld";
				draw.everything();
				break;
			case "gameover":
				location.reload();
				break;
		}
	},
	
	handleKeyDown: function(event)
	{
		switch(game.state)
		{
			case "overworld":
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
		switch(game.state)
		{
			case "overworld":
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
						player.move(-1, 0);
					} else {
						/* left swipe */
						player.move(1, 0);
					}                       
				} else {
					if ( yDiff > 0 ) {
						/* down swipe */ 
						player.move(0, -1);
					} else { 
						/* up swipe */
						player.move(0, 1);
					}                                                                 
				}
				/* reset values */
				this.xDown = null;
				this.yDown = null;
				break;
		}		
	},
	
	//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	shuffle: function(array) {
		  let currentIndex = array.length,  randomIndex;

		  // While there remain elements to shuffle...
		  while (currentIndex != 0) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
			  array[randomIndex], array[currentIndex]];
		  }

		  return array;
	}
};