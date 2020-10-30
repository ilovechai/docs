var subSectionClass="subsection",subHeadingClass="subHeading",maxIndentLevel=7,minIndentLevel=3,contentBreadcrumbHeight=0,mobileWidth=767,ipadWidth=1024;function addTOCClick(){$(".nav-container .nav-panel-menu a").off("click").on("click",function(e){$(".contentStickyBreadcrumbHeader .stickyBreadcrumb").remove();var t=$(e.currentTarget);setSelectedTOC(t,!1);var n=t.attr("href");(isMobileView()||isIPadView())&&($(".nav-container .nav-panel-menu").removeClass("is-active"),$("footer").hide()),-1===n.indexOf("#")?updateTitle(t.text()):handleContentBreadcrumbVisibility(!0),updateHashInUrl(n),createClickableBreadcrumb(getContentBreadcrumbTitle(),!0)}),$(".nav-container .nav-panel-menu a").off("keypress").on("keypress",function(e){e.stopPropagation(),13!==e.which&&13!==e.keyCode&&32!==e.which&&32!==e.keyCode||$(this).trigger("click")})}function setSelectedTOC(e,t){var n=$(".nav-menu .toc_sub_selected.is-current-page"),i=e.attr("href");if(i){if(1===n.length){var a=n.find("a").attr("href");-1!==a.indexOf("#")&&(a=a.substring(0,a.indexOf("#"))),-1===i.indexOf(a)&&removeHashRefTOC(a),n.removeClass("is-current-page"),n.hasClass("toc_main_selected")?n.removeClass("toc_main_selected"):n.hasClass("toc_sub_selected")&&n.removeClass("toc_sub_selected")}$(".is-current-page").removeClass("is-current-page"),e.parent().addClass("is-current-page"),-1===i.indexOf("#")?e.parent().addClass("toc_main_selected"):e.parent().addClass("toc_sub_selected")}}function removeHashRefTOC(e){var t=$(".nav-container .nav-panel-menu").find("a[href^='"+e+"#']");$(t).each(function(){$(this).parent().remove()})}function updateTitle(e){$("title").text(e+" - Server Config - Open Liberty")}function scrollToPos(e){}function handleExpandCollapseState(e,t){var n=$("article.doc").find('a[id="'+e+'"]');if(1===n.length){if(!n.is(":visible"))for(var i=e.split("/"),a=i[0],r=1;r<i.length-1;r++){a+="/"+i[r];var d=$("article.doc").find("a[id='"+a+"']").parent().find(".toggle");"true"===d.attr("collapsed")&&handleExpandCollapseToggleButton(d,!1)}var l=$("article.doc").find("a[id='"+e+"']").parent().find(".toggle");(!0===t&&"true"===l.attr("collapsed")||!1===t&&"false"===l.attr("collapsed"))&&handleExpandCollapseToggleButton(l,!1)}}function updateHashInUrl(e,t){var n=e;-1!==e.indexOf("/config/")&&(n=e.substring(17));var i=null;""!==e&&(i={href:e}),void 0!==t&&(t?(n+="&expand=true",i.expand=!0):(n+="&expand=false",i.expand=!1)),window.history.pushState(i,null,"#"+n)}function handleSubHeadingsInContent(){var r=getContentBreadcrumbTitle(),e=$("article.doc div.paragraph > p > a"),d=[];0===e.length&&(addAnchorToSubHeadings(),e=$("article.doc div.paragraph > p > a")),$($(e).get().reverse()).each(function(){var e=$(this).parent(),t=modifySubHeading(e,r),n=getTableForSubHeading(e),i=$(this).attr("id"),a=calcIndentAndAddClass(e,t,n,i);minIndentLevel<=a&&(n?addExpandAndCollapseToggleButtons(e,i):d.push({heading:e,anchorTitleId:i}))}),handleDeferredExpandCollapseElements(d)}function addAnchorToSubHeadings(){var e=$("article.doc > div.paragraph > p > strong");$($(e)).each(function(){var e=$(this).parent(),t=e.text().replace(/ > /g,"/"),n=$('<a id="'+t+'"></a>');e.prepend(n)})}function getContentBreadcrumbTitle(){return getTitle($("article.doc h1.page").text())}function getTitle(e){var t=e,n=e.indexOf("("),i=e.indexOf(")");return-1!==n&-1!=i&&(t=e.substring(n+1,i)),t.trim()}function modifySubHeading(e,t){var n,i=e.find("strong");if(void 0!==(n=0<i.length?i.text():e.text())){var a=t+" > "+n,r=a.lastIndexOf(">");if(-1!==r){var d=a.substring(0,r+1),l=a.substring(r+1);i.remove(),e.append("<strong>"+d+"</strong>"+l)}if(-1!==a.indexOf(".")){var o=a.replace(/ > /g,"/");e.find("a").attr("id",o)}}return a}function getTableForSubHeading(e){for(var t=e.parent().next();1===t.length&&!t.is("table")&&0===t.find("p > a").length;)t=t.next();return t.is("table")?t:void 0}function calcIndentAndAddClass(e,t,n,i){var a,r;if(t&&(a=t.split(">").length,maxIndentLevel<a&&(a=maxIndentLevel),minIndentLevel<a&&(r=49*(a-minIndentLevel)+69),e.addClass(subHeadingClass),minIndentLevel<=a)){e.addClass(subSectionClass),setDataId(e,i),void 0!==r&&e.css("margin-left",r+"px");for(var d=e.parent().next();1===d.length&&!d.is("table")&&0===d.find("p > a").length;)d.addClass(subSectionClass),setDataId(d,i),void 0!==r&&d.css("margin-left",r+"px"),d=d.next();if(n){n.addClass(subSectionClass),setDataId(n,i);parseInt(n.css("width").replace("px",""));if(void 0!==r){n.css("margin-left",r-10+"px");n.css("width","calc(100% + 20px - "+r+"px - 10px)")}else n.css("width","calc(100% + 20px - 59px)")}}return a}function setDataId(e,t){e.attr("data-id",t)}function getDataId(e){return e.attr("data-id")}function addExpandAndCollapseToggleButtons(e,t){var n=$('<div class="toggle" collapsed="true" tabindex=0><img src="/img/all_guides_plus.svg" alt="Expand" aria-label="Expand" /></div>');handleExpandCollapseTitle(t,!1),n.on("click",function(){handleExpandCollapseToggleButton($(this),!0)}),n.on("keypress",function(e){e.stopPropagation(),13!==e.which&&13!==e.keyCode&&32!==e.which&&32!==e.keyCode||n.trigger("click")});n.on("mousedown",function(){!0}),n.on("focus",function(){!1}),e.prepend(n)}function handleExpandCollapseToggleButton(e,t){var n=e.attr("collapsed"),i=getDataId(e.parent());"true"===n?(e.empty().append($('<img src="/img/all_guides_minus.svg" alt="Collapse" aria-label="Collapse"/>')),e.attr("collapsed",!1),handleExpandCollapseTitle(i,!0)):(handleExpandCollapseTitle(i,!1),e.empty().append($('<img src="/img/all_guides_plus.svg" alt="Expand" aria-label="Expand"/>')),e.attr("collapsed",!0)),t&&updateHashInUrl(getSelectedDocHtml()+"#"+i,!0)}function handleExpandCollapseTitle(i,a){var r=$("article.doc"),e=r.find('[data-id^="'+i+'"]'),d=[];$(e).each(function(){var t=getDataId($(this));if(a){var e=$(this).find(".toggle");if(1===e.length&&"true"===e.attr("collapsed")){var n=r.find("[data-id^='"+t+"']");$(n).each(function(){var e=getDataId($(this));(e===t&&$(this).is("table")||e!==t&&0===e.indexOf(t+"/"))&&d.push($(this))})}t===i&&$(this).is("div")&&$(this).hasClass("collapseMargin")&&$(this).removeClass("collapseMargin"),$(this).show()}else t===i&&$(this).is("table")||t!==i&&0===t.indexOf(i+"/")?$(this).hide():t===i&&$(this).is("div")&&$(this).addClass("collapseMargin")}),$(d).each(function(){$(this).hide()}),isMobileView()||r.trigger("scroll")}function handleDeferredExpandCollapseElements(e){$(e).each(function(){var t=$(this).attr("heading"),n=$(this).attr("anchorTitleId"),e=$("article.doc").find('[data-id^="'+n+'"]');$(e).each(function(){var e=getDataId($(this));if(e!==n&&0===e.indexOf(n+"/"))return addExpandAndCollapseToggleButtons(t,n),!1})})}function modifyFixedTableColumnWidth(){var e=$("article.doc").find("colgroup"),n=[];isMobileView()||(n[4]=["25%","15%","15%","45%"]),$(e).each(function(){if(isMobileView())$(this).remove();else{var e=$(this).find("col"),t=n[e.length];t&&$(e).each(function(e){$(this).css("width",t[e])})}})}function findTOCElement(e){var t,n=location.href.indexOf("/config/"),i=location.href.substring(n+8),a=i.indexOf("/"),r=(i=i.substring(a+1)).indexOf("#");if(-1!==r){var d=i.substring(r);i=i.substring(0,r)}return e?void 0!==d&&""!==d&&(i+=d,0===(t=$(".nav-container .nav-panel-menu a[href='"+i+"']")).length&&(t=void 0)):t=$(".nav-container .nav-panel-menu a[href='"+i+"']"),t}function handleSubHeadingsInTOC(e){removeHashRefTOC(getSelectedDocHtml());var t=$("article.doc > div.paragraph > p > a"),n=e.parent(),r=n.data("depth")+1,d=e.attr("href"),l=$("<ul class='nav-list'></ul>");n.append(l),$(t).each(function(){var e=$(this).parent();if(!1===e.hasClass("subsection")){var t=$(this).attr("id"),n=e.text(),i=n.lastIndexOf(" > ");-1!==i&&(n=n.substring(i+3));var a=$('<li class="nav-item" data-depth="'+r+'"><a href="'+d+"#"+t+'">'+n+"</a></li>");l.append(a)}}),addTOCClick()}function getSelectedDocHtml(){var e=$(".is-current-page > a"),t="";return 1===e.length&&-1!==(t=e.attr("href")).indexOf("#")&&(t=t.substring(0,t.indexOf("#"))),t}function handleContentScrolling(){if(!isMobileView()){var d=$("article.doc"),l=-99999;$(window.parent.document).off("scroll").on("scroll",function(){var e=!1,t=$(this).scrollTop();l<t&&(e=!0),l=t;var n=$(".contentStickyBreadcrumbHeader").is(":visible");if("Server configuration overview"!=d.find(".page").text()){var i=isInitialContentInView(l);if(n&&!e?i&&handleContentBreadcrumbVisibility(n=!1):!n&&e&&(i||handleContentBreadcrumbVisibility(n=!0)),n){var a=d.find("div.paragraph > p > a"),r={};if($(a).each(function(){if($(this).parent().is(":visible")&&isInViewport($(this),r))return!1}),r.element&&!r.inView)createClickableBreadcrumb(r.element.parent().text(),!0);else createClickableBreadcrumb(getContentBreadcrumbTitle(),!0)}}})}}function isInitialContentInView(e){var t=!0,n=$("article.doc").find("div.paragraph > p > a").first();if(1===n.length){var i=n.parent().parent().prev()[0].getBoundingClientRect(),a=0;$(".contentStickyBreadcrumbHeader").is(":visible")&&(a=$(".contentStickyBreadcrumbHeader").outerHeight()),i.top+i.height-a<e&&(t=!1)}return t}function isInViewport(e,t){var n=e.parent(),i=n[0].getBoundingClientRect().top,a=contentBreadcrumbHeight+101,r=i-a,d=r+parseInt(n.css("height")),l=document.documentElement.clientHeight;return(0<=r||0<d)&&d<=l-a?(2===n.text().split(">").length&&r<50&&(t.top=r,t.element=n,t.inView=!0),!0):0<r||r<0&&(t.top=r,t.element=n,t.inView=!1)}function createClickableBreadcrumb(e,t){if(!isMobileView()&&!isIPadView()&&($(".contentStickyBreadcrumbHeader .stickyBreadcrumb").remove(),$(".contentStickyBreadcrumbHeader").append("<div class='stickyBreadcrumb'/>"),$(".contentStickyBreadcrumbHeader .stickyBreadcrumb").hide(),0<e.length)){for(var n=e.split(" > "),i=getSelectedDocHtml(),a="",r=0;r<n.length;r++)1===r&&(i+="#"),1<r&&(i+="/"),0<r&&(i+=n[r],a+=" > "),a=t&&r===n.length-1?a+"<a class='lastParentItem'>"+n[r]+"</a>":a+"<a href='"+i+"'>"+n[r]+"</a>";$(".contentStickyBreadcrumbHeader .stickyBreadcrumb").append(a);for(var d=parseInt($(".contentStickyBreadcrumbHeader").css("padding-left"))+parseInt($(".contentStickyBreadcrumbHeader").css("padding-right")),l=$(".contentStickyBreadcrumbHeader .stickyBreadcrumb").width()+d,o=$("article.doc").width(),c=32;o<l&&0<c;)$(".contentStickyBreadcrumbHeader .stickyBreadcrumb").css("font-size",c+"px"),l=$(".contentStickyBreadcrumbHeader .stickyBreadcrumb").width()+d,c-=2;$(".contentStickyBreadcrumbHeader .stickyBreadcrumb").show(),addContentBreadcrumbClick()}}function addContentBreadcrumbClick(){$(".stickyBreadcrumb a[href]").off("click").on("click",function(e){e.preventDefault();var t=$(e.currentTarget).attr("href");updateHashInUrl(t);var n=0,i=t.indexOf("#"),a=t.substring(i+1),r=$("article.doc").find("div.paragraph > p > a[id='"+a+"']");1==r.length&&(n=r.offset().top),$("html,body").animate({scrollTop:n-101},500)})}function handleParentWindowScrolling(){isMobileView()||isIPadView()||$(window.parent.document).on("scroll",function(e){if($(".contentStickyBreadcrumbHeader").is(":visible")){var t=$("article.doc").find("div.paragraph > p > a"),n={};if($(t).each(function(){if($(this).parent().is(":visible")&&isInViewport($(this),n))return!1}),n.element&&!n.inView)createClickableBreadcrumb(n.element.parent().text(),!0);else createClickableBreadcrumb(getContentBreadcrumbTitle(),!0)}})}function addConfigContentFocusListener(){var t=!1;$("#config_content").on("mousedown",function(e){t=!0}),$("#config_content").on("focusin",function(e){t||scrollToPos(0),t=!1})}function handleInitialContent(){var e=window.location.href,t=e.indexOf("/reference/config/"),n=e.substring(t+18).replace(".html","");updateTitle("serverConfiguration"===n?"OVERVIEW":n)}function handlePopstate(){window.onpopstate=function(e){if(e.state){var t=e.state.href;if(-1!==e.state.href.indexOf("#")&&(t=e.state.href.substring(0,e.state.href.indexOf("#"))),location.pathname===t){if(void 0!==e.state.expand&&-1!==e.state.href.indexOf("#"))handleExpandCollapseState(e.state.href.substring(e.state.href.indexOf("#")+1),e.state.expand);-1!==e.state.href.indexOf("#")?handleContentBreadcrumbVisibility(!0):handleContentBreadcrumbVisibility(!1);var n=$(".nav-container .nav-panel-menu").find("a[href='"+e.state.href+"']");1===n.length&&setSelectedTOC(n,!0)}}}}function initialContentBreadcrumbVisibility(){if(!isMobileView()&&!isIPadView()){contentBreadcrumbHeight=$(".contentStickyBreadcrumbHeader").outerHeight();var e=location.href,t=e.indexOf("#");-1===t||t===e.length-1?handleContentBreadcrumbVisibility(!1):handleContentBreadcrumbVisibility(!0)}}function handleContentBreadcrumbVisibility(e){isMobileView()||isIPadView()||(e&&!$(".contentStickyBreadcrumbHeader").is(":visible")?($(window.parent.document).off("scroll"),$(".contentStickyBreadcrumbHeader").slideDown(500,function(){handleContentScrolling()})):!e&&$(".contentStickyBreadcrumbHeader").is(":visible")&&($(window.parent.document).off("scroll"),$(".contentStickyBreadcrumbHeader").slideUp(500,function(){handleContentScrolling()})))}function isMobileView(){return $(window).width()<=mobileWidth}function isIPadView(){return $(window).width()<=ipadWidth&&$(window).width()>mobileWidth}function replaceHistoryState(e){var t="/docs/ref/config/"+e.substring(1),n=void 0;-1!==t.indexOf("&")&&(t=t.substring(0,t.indexOf("&")),-1!==e.indexOf("&expand=true")?n=!0:-1!==e.indexOf("&expand=false")&&(n=!1));var i={href:t};return void 0!==n&&(i.expand=n),window.history.replaceState(i,null,e),t}function addOverviewPageClickAndScroll(){var n=$("article.doc");n.find('div[id="overview_content"] a[href^="#"]').on("click",function(e){e.preventDefault();var t=this.hash;scrollToPos(n.find(t).offset().top)})}$(document).ready(function(){addTOCClick(),addConfigContentFocusListener(),handleInitialContent(),handlePopstate(),addOverviewPageClickAndScroll(),initialContentBreadcrumbVisibility(),modifyFixedTableColumnWidth(),handleSubHeadingsInContent();var e=findTOCElement();handleSubHeadingsInTOC(e);var t=findTOCElement(!0);if(t?setSelectedTOC(t,!0):e&&setSelectedTOC(e,!0),createClickableBreadcrumb(getContentBreadcrumbTitle(),!0),isMobileView()||isIPadView()||handleContentScrolling(),""!==window.location.hash&&void 0!==window.location.hash&&-1!==window.location.hash.indexOf("&expand=")){var n;-1!==window.location.hash.indexOf("&expand=true")?n=!0:-1!==window.location.hash.indexOf("&expand=false")&&(n=!1);var i=window.location.hash.substring(1);if(-1!==i.indexOf("#"))handleExpandCollapseState(i.substring(i.indexOf("#")+1,i.indexOf("&")),n)}});
//# sourceMappingURL=04-configs.js.map