//Canvas.js is dedicated to managing canvas events.
//This includes how the canvas/off-canvas elements open/close and relate.
Meteor.canvasFunctions = {
	clearCanvas : function(){
	    document.body.classList.remove('noScroll');
	    var canvas = document.getElementById('canvas');
	    canvas.setAttribute('data-canvas-position','');
	    canvas.setAttribute('data-canvas-state','closed');
	    canvas.setAttribute('data-canvas-width','');
	},
	//event.target function fires on click events of any element containing the data-attribute, "data-sidebar".
	toggleCanvas : function (event) {
	    // Canvas Variables
	    var toggle = document.querySelectorAll('[aria-controls][data-toggle=canvas]');
	    var overlay = document.getElementById('overlay');
	    var sidebar = document.querySelectorAll('section.sidebar');
	    var canvas = document.getElementById('canvas');
	    var main = document.getElementById('main');
		var activeTab = document.querySelectorAll('section.sidebar[aria-hidden=false] menu.tabs > li > a');
		var activeTabContent = document.querySelectorAll('section.sidebar[aria-hidden=false] div.tabs > [aria-hidden]');

		// Events are required
		if (!event || !event.target) return;

	    //Close open canvas elements if overlay or active li is clicked. Or if close canvas event fired
	    if (event.target.getAttribute('aria-expanded') == 'true' && event.target.id !== "mobile-toggle" || event.target == overlay || event.target.getAttribute('data-canvas-event') == 'close'){
	        for (var i = 0, e; e = toggle[i]; i++) { h.active(e,false); } //Remove current toggle active states
	        for (var i = 0, e; e = sidebar[i]; i++) { h.hidden(e,true); } //Clear all active Sidebars
	        c.clearCanvas(); //Remove all canvas effect classes
	        h.hidden(overlay,true);
	        h.hidden(main,false);
			document.body.classList.remove('open-canvas');
	        focusGlobalElFirst.focus();
			if(document.getElementById("mobile-toggle").getAttribute('aria-expanded') !== "false"){ document.getElementById("mobile-toggle").click(); }
	    }

	    // Open Overlay and offCanvas elements if clicking inactive list item
	    else if(event.target.hasAttribute('aria-controls') && event.target.getAttribute('aria-expanded') == 'false' && event.target.id !== "mobile-toggle"){
	        c.clearCanvas();
			document.body.classList.add('open-canvas');
	        h.hidden(main,true);
	        document.body.classList.add('noScroll');
	        canvas.setAttribute('data-canvas-state','open'); //Add master canvas effect class
	        h.hidden(overlay,false);
	        for (var i = 0, e; e = toggle[i]; i++) { h.active(e,false); } //Clear all active toggles
	        h.active(event.target,true); //Add active class to clicked element
			if(document.getElementById("mobile-toggle").getAttribute('aria-expanded') !== "true"){ document.getElementById("mobile-toggle").click(); } //Open Mobile Menu
	        //Sets values based on the parameters of the current sidebar
	        for (var i = 0, e; e = sidebar[i]; i++) {
	            h.hidden(e,true); //Clear all active sidebars
	            if ('#' + e.getAttribute('id') == event.target.getAttribute('aria-controls')){ //If Sidebar ID matches toggles' data-sidebar
	                h.hidden(e,false); //Add active class to given sidebar
	                canvas.setAttribute('data-canvas-width',e.dataset.width); //Add new sidebar-width effect class
	                if(e.dataset.position == 'left'){ canvas.setAttribute('data-canvas-position','left'); }
	                if(e.dataset.position == 'right'){ canvas.setAttribute('data-canvas-position','right'); }
	            }
				/*
				// Working alternate for ie compat.
	            h.hidden(e,true); //Clear all active sidebars
	            if ('#' + e.getAttribute('id') == event.target.getAttribute('aria-controls')){ //If Sidebar ID matches toggles' data-sidebar
	                h.hidden(e,false); //Add active class to given sidebar
	                canvas.setAttribute('data-canvas-width',e.getAttribute('width')); //Add new sidebar-width effect class
	                if(e.getAttribute('data-position') == 'left'){ canvas.setAttribute('data-canvas-position','left'); }
	                if(e.getAttribute('data-position') == 'right'){ canvas.setAttribute('data-canvas-position','right'); }
	            }*/
	            //focusGroupElFirst.focus();
	            event.preventDefault();
	        }
	        f.currentFocusGroup(); //Recalculate live focus areas
	        focusGroupElFirst.focus();
	    }
	    //Mobile
	    else if(event.target.getAttribute('data-toggle')== "mobile-navigation"){
			//Events
			var mobileNavigation = document.getElementById('mobile-navigation');
			var toggleMobile = document.querySelectorAll('[aria-controls][data-toggle=mobile-navigation]');
			//var activeTab = document.querySelectorAll('section.sidebar[aria-hidden=false] menu.tabs > li > a');
			//var activeTabContent = document.querySelectorAll('section.sidebar[aria-hidden=false] div.tabs > [aria-hidden]');
			hiddenSidebar = true;
			tabActive=false;
			if(window.innerWidth < 768){
				var toggleMenuItems = document.querySelectorAll('.off-canvas menu.tabs li [aria-expanded]');
				for (var i = 0, e; e = toggleMenuItems[i]; i++) {
					if(e.getAttribute('aria-expanded') == "true"){
						e.setAttribute('aria-expanded', "false");
						tabActive=true;
					}
				}
				var tabBodies = document.querySelectorAll('.off-canvas div.tabs article[aria-hidden]');
				for (var i = 0, e; e = tabBodies[i]; i++) {
					if(e.getAttribute('aria-hidden') == "false"){
						e.setAttribute('aria-hidden', "true");
						tabActive=true;
					}
				}
			}
			for (var i = 0, e; e = sidebar[i]; i++) {
				if(e.getAttribute('aria-hidden')== "false"){
					hiddenSidebar=false;
					//The below statement caused browser crash on resource items. Unable to dermine current purpose.
					/*for (var i = 0, e; e = activeTab[i]; i++) {
						if(e.getAttribute('aria-expanded')== "true"){
							tabActive=true;
							h.active(e, false);
							document.body.classList.remove('tab-open');
							for (var i = 0, e; e = activeTabContent[i]; i++) {
								h.hidden(e, true);
							}
						}
					}*/
					if(tabActive==false){
						for (var i = 0, e; e = toggle[i]; i++) { h.active(e,false); } //Remove current toggle active states
						for (var i = 0, e; e = sidebar[i]; i++) { h.hidden(e,true); } //Clear all active Sidebars
						c.clearCanvas(); //Remove all canvas effect classes
						document.body.classList.add('noScroll');
						h.hidden(overlay,true);
						h.hidden(main,false);
						focusGlobalElFirst.focus();
					}
				}
			 }
			 if(hiddenSidebar == true){
				for (var i = 0, e; e = toggleMobile[i]; i++) {
					if(e.getAttribute('aria-expanded')== "true"){
						for (var i = 0, e; e = toggleMobile[i]; i++) { h.active(e, false);}
						h.hidden(mobileNavigation, true);
						document.body.classList.remove('noScroll');
					} else{
						//alert('ma');
						h.active(event.target, true);
						h.hidden(mobileNavigation, false);
						document.body.classList.add('noScroll');
						//Close any open tabs
					}
				} //Remove current toggle active states
			 }
			/*
			if(event.target.getAttribute('aria-expanded') == 'true'){
				if(event.target)
				h.active(event.target, false);
				h.hidden(mobileNavigation, true);
				document.body.classList.remove('noScroll');
			} else{
				h.active(event.target, true);
				h.hidden(mobileNavigation, false);
				document.body.classList.add('noScroll');
			}*/
	    }

	    f.currentFocusGroup(); //Recalculate live focus areas
	}
}
//Define usage
c = Meteor.canvasFunctions;



//This needs a new home
function mobToggle(){
	c.toggleCanvas(); //START HERE
}
function mainNavItem(){
	var toggleMobile = document.querySelectorAll('[aria-controls][data-toggle=mobile-navigation]');
	var mobileNavigation = document.getElementById('mobile-navigation');
	for (var i = 0, e; e = toggleMobile[i]; i++) { h.active(e, false);}
	h.hidden(mobileNavigation, true);
	document.body.classList.remove('noScroll');
}
function toServiceProvidersTwo(){
	m.toggleMore();
	event.preventDefault();
	return false;

}
function toServiceProviders(){
	var toggleMobile = document.querySelectorAll('[aria-controls][data-toggle=mobile-navigation]');
	var mobileNavigation = document.getElementById('mobile-navigation');
	for (var i = 0, e; e = toggleMobile[i]; i++) { h.active(e, false);}
	h.hidden(mobileNavigation, true);
	document.body.classList.remove('noScroll');
}

Template.body.events({
	//Canvas Actions
	'click [aria-controls][data-toggle=canvas]': c.toggleCanvas,
	'click .overlay': c.toggleCanvas,
	'click [data-canvas-event="close"]': c.toggleCanvas,

	//Mobile Events
	'click [aria-controls][data-toggle=mobile-navigation]': c.toggleCanvas,

	'click [data-type="main-navigation-item"]': c.toggleCanvas,

	'click #mobile-navigation li > a[href="#service-providers"]': c.toggleCanvas, //toservice2

	'click #mobile-navigation figure a[href="#service-providers"]': c.toggleCanvas

});