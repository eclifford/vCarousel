;(function($) {
	$.fn.vCarousel = function(options) {

		var config = {
			width: 400,
			height: 400,
			bullets: true,
			buttons: true,
			auto: true,
			autoSpeed: 4000,
			caption: true,
			bulletIcon: "x",
			prevButtonIcon: "prev.jpg",
			nextButtonIcon: "next.jpg"
		}
		
		return this.each(function() {		
			
			// Setup private variables
			var carousel = this;
			var $carousel = $(this);
			var container, wrapper, items, numitems, caption;
			
			if(options) {
				$.extend(defaultOptions, options);
			}
							
			// PRIVATE FUNCTIONS
			var initialize = function() {
				buildComponent();
				handleInput();
				return this;
			}
			
			var buildComponent = function() {
				$carousel.children().wrapAll('<div class="vCarousel" />');
				this.container = $carousel.find('.vCarousel');
				this.container.find('div').wrapAll('<div class="wrapper" />')
				this.wrapper = this.container.find('.wrapper');
				this.items = this.wrapper.find('div.item');
				
				
				// Previous and next button
				if(config.buttons) {
					this.wrapper.append('<a href="#" class="prev"><img src="' + config.prevButtonIcon + '" /></a>' +
					'<a href="#" class="next"><img src="' + config.nextButtonIcon + '" /></a>');
				}
				
				this.wrapper.append('<div class="nav" />');
				var nav = this.wrapper.find('.nav');
							
				this.container.append('<div class="caption" />');
				this.caption = this.container.find('.caption');
	
	
				this.items.each(function(i) {
					i += 1;
					
					if(config.bullets === true) {
						nav.append('<img src="' + config.bulletIcon + '" class="bullet" />')				
					}
								
				});
								
				this.wrapper.width(config.width).height(config.height);
				this.items.hide().first().addClass('current').show();
				$(".bullet", $carousel).first().addClass('current');
				setCaption();
			}
			
			var handleInput = function() {	
						
				$(this.wrapper.find('a.next').click(function(e) {		
					e.preventDefault();			  
					slideNext();
					setCaption();
				}));
				
				$(this.wrapper.find('a.prev').click(function(e) {		
					e.preventDefault();			  
					slidePrev();
					setCaption();
				}));
				
				this.wrapper.hover(function() {
					$('a.next', $carousel).stop(true, true).fadeToggle();
					$('a.prev', $carousel).stop(true, true).fadeToggle();
				});
			}
			
			var slideTo = function(i) {			
					this.items
						.removeClass('current')
						.fadeOut('slow')
						.eq(i)
						.fadeIn('slow')
						.addClass('current');
					$(".bullet", $carousel)
						.removeClass('current')
						.eq(i)
						.addClass('current');
			}
			
			var slideNext = function() {
				var index = getCurrentIndex();
				if(index < this.items.length -1)
					slideTo(index+1);
				else
				{
					slideTo(0);
				}
			}
			
			var slidePrev = function() {
				var index = getCurrentIndex();
				if(index > 0) {
					slideTo(index-1);
				}
				else
				{
					slideTo(this.items.length -1);
				}		
			}
			
			var setCaption = function() {
				var index = getCurrentIndex();
				var content = this.items.eq(index).find("p").text();
				this.caption.text(content);
			}
			
			var getCurrentIndex = function() {
				return this.items.filter('.current').index();
			}
					
			return initialize();

		});
	}
	
})(jQuery)

/*

$(document).ready(function() {
	$("li.a, li.d, li.f").hide();

	$("p").css("font-size"); // Returns the current value of the attribute
	$("p").css("font-size", "24px");

	$("p").hasClass("plan");
	$("p").addClass("plan");
	$("p").removeClass(); // Remove all classes
	$("p").toggleClass("plan");
	$("p").hide();
	$("p").show();
	$("p").toggle();
	
	// Document Ready Block
		
	
})


// Anonymous functions
function (message) {
	alert("Warning" + message);
}


$(document).ready(function() {
	
	
});

$('body').click(function() {
	
	alert('you have clicked my body how dirty!');
})

$(document).ready(function() {
	$("p").click(function() {
		$(this).hide();
	});
		
	$("p").hover(function() { 
		$(this).addClass("highLight");
	})
	
	$("p").hover(
		function() {$(this).addClass("highLight");},
		function() {$(this).removeClass("highLight");}
	);
	
	$("p").hover(function() {
		$(this).toggleClass("highLight");
	});
	
	$("body").keypress(function(event) {
		if(event.which == 102) {
			alert("Fantastic");
		}
	})
	
	event.preventDefault() // prevent the browser's normal reaction
	event.stopPropogation() // prevent the event from bubbling up the DOM tree
	
	
	$("p#time").hide('slow');
	$("p#time").slideUp("slow");
	#("p#time").slideDown("slow");
	$("p#time").slideToggle("slow");
	$("p#time").fadeIn("slow");
	$("p#time").fadeToggle("slow");
	
	XMLHttpRequest
	
	$("span.number").load("/flights/824/gate");
	
	.ready();
	.click();
	.hover();
	.keypress();
	
})

*/



