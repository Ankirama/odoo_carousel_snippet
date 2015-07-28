openerp.carousel = function(instance, local) {
    var _t = instance.web._t,
    _lt = instance.web._lt;
    var QWeb = instance.web.qweb;

    local.HomePage = instance.Widget.extend({
        start: function() {
	    this.$el.append(QWeb.render("HomePageTemplate"));
	    $(document).ready(function(){
		var clickEvent = false;
		$('#myCarousel').carousel({
		    interval:   4000
		}).on('click', '.list-group li', function() {
		    clickEvent = true;
		    $('.list-group li').removeClass('active');
		    $(this).addClass('active');
		}).on('slid.bs.carousel', function(e) {
		    if(!clickEvent) {
			var count = $('.list-group').children().length -1;
			var current = $('.list-group li.active');
			current.removeClass('active').next().addClass('active');
			var id = parseInt(current.data('slide-to'));
			if(count == id) {
			    $('.list-group li').first().addClass('active');
			}
		    }
		    clickEvent = false;
		});
	    });
	    $(window).resize(function() {
		setTriggerHeight();
	    });
	    $(window).load(function() {
		setTriggerHeight();
	    });
	    function setTriggerHeight() {
		var boxheight = $('#myCarousel .carousel-inner').innerHeight();
		var itemlength = $('#myCarousel .item').length;
		var triggerheight = Math.round(boxheight/itemlength+1);
		$('#myCarousel .list-group-item').outerHeight(triggerheight);
	    };
	},
    });
    instance.web.client_actions.add('carousel.homepage', 'instance.carousel.HomePage');
}