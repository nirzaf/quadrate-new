(function($) {
	"use strict";
	setInterval(function(){
		var future = new Date("May 02 2018 6:51:10 GMT+0200");  // date to count down
		var now = new Date();
		var difference = Math.floor((future.getTime() - now.getTime()) / 1000);
		
		var seconds = fixIntegers(difference % 60);
		difference = Math.floor(difference / 60);
		
		var minutes = fixIntegers(difference % 60);
		difference = Math.floor(difference / 60);
		
		var hours = fixIntegers(difference % 24);
		difference = Math.floor(difference / 24);
		
		
		var days = difference;
		
		$(".seconds").text(seconds);
		$(".minutes").text(minutes);
		$(".hours").text(hours);
		$(".days").text(days);
		
	}, 1000);
	
	function fixIntegers(integer)
	{
		if (integer < 0)
			integer = 0;
		if (integer < 10)
			return "0" + integer;
		return "" + integer;
	}
})(jQuery);