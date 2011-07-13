;(function($) {
	$.fn.vCarousel = function(options) {

		var config = {
			width: 320,
			height: 372,
			bullets: true,
			buttons: true,
			auto: true,
			autoSpeed: 5000,
			caption: true, // Not being used yet
			bulletIcon: "bullet.png",
			bulletIconActive: "bullet_a.png",
			prevButtonIcon: "prev.png",
			nextButtonIcon: "next.png"
		}
		
		return this.each(function() {		
			// Private variables		
			var $carousel = $(this);
			var container, wrapper, items, numitems, caption, interval;
			
			if(options) {
				$.extend(config, options);
			}
			
			// Constructor 
			var initialize = function() {
				setup();
				handleInput();
				update();
				return this;
			}
			
			var setup = function() {
				$carousel.children().wrapAll('<div class="vCarousel" />');
				this.container = $carousel.find('.vCarousel');
				this.container.find('div.item').wrapAll('<div class="wrapper" />')
				this.wrapper = this.container.find('.wrapper');
				this.items = this.wrapper.find('div.item');
						
				// Previous and next button
				if(config.buttons) {
					this.wrapper.append('<a href="#" class="prev"><img src="' + config.prevButtonIcon + '" /></a>' +
					'<a href="#" class="next"><img src="' + config.nextButtonIcon + '" /></a>');
				}
				
				this.wrapper.append('<div class="nav" />');
				var nav = this.wrapper.find('.nav');
						
				this.items.each(function(i) {
					i += 1;		
							
					if(config.bullets === true) {
						nav.append('<img src="' + config.bulletIcon + '" class="bullet" />')				
					}		
										
				});
								
				this.wrapper.width(config.width).height(config.height);
				this.items.hide().first().addClass('current').show();
				$(".bullet", $carousel).first().attr('src', config.bulletIconActive);
			}
			
			var handleInput = function() {									
				$(this).bind('swipeleft', function(e,ui) {
					e.preventDefault();			  
					slideNext();
					update();
				});
				
				$(this).bind('swiperight', function(e,ui) {
					e.preventDefault();			  
					slidePrev();
					update();
				});
				
				$('a.next', $carousel).bind('tap', function(e,ui) {
					e.preventDefault();			  
					slideNext();
					update();
				});
				
				$('a.prev', $carousel).bind('tap', function(e,ui) {
					e.preventDefault();			  
					slidePrev();
					update();
				});
							
				this.wrapper.hover(function() {
					$('a.next', $carousel).stop(true, true).fadeToggle();
					$('a.prev', $carousel).stop(true, true).fadeToggle();
				});
			}
			
			
			
			var update = function() {
				if(config.auto) {
					clearInterval(this.interval);
					this.interval = setInterval(function() {slideNext();}, config.autoSpeed)
				}		
			}
			
			var slideTo = function(i) {			
				$(".item", $carousel)
					.removeClass('current')
					.fadeOut('slow')
					.eq(i)
					.fadeIn('slow')
					.addClass('current');
				$(".bullet", $carousel)
					.attr('src', config.bulletIcon)
					.eq(i)
					.attr('src', config.bulletIconActive);
			}
			
			var slideNext = function() {
				var index = getCurrentIndex();
				if(index < $("div.item", $carousel).length-1) {
					slideTo(index+1);
				}
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
					slideTo($("div.item", $carousel).length-1);
				}		
			}
			
			var getCurrentIndex = function() {
				return $("div.item", $carousel).filter('.current').index();
			}
					
			return initialize();
		});
	}
	
})(jQuery)

