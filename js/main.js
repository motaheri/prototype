// JavaScript Document
	
$(function() {
	var siteTitle = document.title;
	var pageList = [];
	var titleList = [];	

	/* load address in footer */
	$('#right').load("address-footer.html");
	
	/* div rollover *//*
	$("#content").hover(function(){
		$(this).removeClass().addClass('content-active');
		//alert('hello');
	},function() {
		$(this).removeClass();  
	});
	*/
	
	// setup tabs normally
	var appendPanes = '';
	$('#css-tabs > li').each(function(i) {
		if (i > 0) { appendPanes += '<div class="panes"></div>' }
	});
	$('#css-panes').append(appendPanes);

	$('#css-tabs > li > a').each(function(i) {
		var page = $(this).attr('href').replace($('input[@name=base_url]').val(),'');
		pageList[i] = page;
		page = page.replace(/([^.]*)\.(.*)/, "$1");
		this.href = '#' + page;
		titleList[i] = page.charAt(0).toUpperCase() + page.slice(1);
	});
	
	$("ul#css-tabs").tabs("div#css-panes > div", {
	
		// enable the history feature
		history: true,
	
		// just before tabs are clicked, we load the contents
		onBeforeClick: function(i) {
	
			// get the pane to be opened
			var pane = this.getPanes().eq(i);
			
			// transform anchor links to page URL's
			var page = this.getTabs().eq(i).attr("href").substring(1);
			
			// load contents only the first time it's opened
			if (pane.is(":empty")) {
				pane.load(pageList[i]);
			}
			
			// update title
			document.title = siteTitle + ' | ' + titleList[i];
			
		}
	});
	
});