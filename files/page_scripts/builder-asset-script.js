// setup_navbar_tooltip();
setup_sidebar_toggle();
setup_scroll_position_restore();
setup_thought_of_the_day();
setup_plausible();
setup_navigation_shortcut();
setup_video_player();
// setup_posthog();

(function() {
    const termsLink = document.querySelector('.frappe-footer a[href="/terms"]');
    if (termsLink) {
        const feedbackLink = termsLink.cloneNode(true);
        const currentPath = window.location.pathname;
        let asset = 'Website';
        if (currentPath === '/podcast' || currentPath.startsWith('/podcast/')) {
            asset = 'Podcast';
        } else if (currentPath.startsWith('/times/')) {
            asset = 'Newsletter';
        } else if (currentPath.startsWith('/events/')) {
            asset = 'Event';
        }
        feedbackLink.href = `https://coworker365.com/share-your-experience/new?source=${encodeURIComponent(currentPath)}&asset=${asset}`;
        feedbackLink.textContent = 'Feedback';
        termsLink.parentNode.insertBefore(feedbackLink, termsLink.nextSibling);
    }
})();

function setup_video_player() {
  window.addEventListener("DOMContentLoaded", async () => {
    if (!document.querySelector("video")) return;
    await loadStyle("https://cdn.plyr.io/3.6.4/plyr.css");
    await loadScript("https://cdn.plyr.io/3.6.4/plyr.polyfilled.js");
    // setup for all video elements
    Plyr.setup("video", {
      controls: ["play-large","play","progress","mute","volume","settings","fullscreen"],
    });
  });
}


// function setup_navbar_tooltip() {
// 	if (isMobile() || isTablet()) return;
// 	window.addEventListener("DOMContentLoaded", async () => {
// 	    try {
// 		    await loadScript("https://unpkg.com/@popperjs/core@2");
// 		    await loadScript("https://unpkg.com/tippy.js@6");
// 	    } catch {
// 	        return
// 	    }
// 		const navItems = [
// 			{ selector: ".nav-contents", content: "Contents" },
// 			{ selector: ".nav-welcome", content: "Welcome" },
// 			{ selector: ".nav-home", content: "Home" },
// 			{ selector: ".nav-products", content: "Products" },
// 			{ selector: ".nav-partners", content: "Partners" },
// 			{ selector: ".nav-blog", content: "Blog" },
// 			{ selector: ".nav-contact", content: "Contact" },
// 			{ selector: ".nav-story", content: "Story" },
// 			{ selector: ".nav-about", content: "About" },
// 			{ selector: ".nav-values", content: "Values" },
// 			{ selector: ".nav-vision", content: "Vision" },
// 			{ selector: ".nav-events", content: "Events" },
// 			{ selector: ".nav-testimonials", content: "Testimonials" },
// 			{ selector: ".nav-explainers", content: "Explainers" },
// 			{ selector: ".nav-incubator", content: "Incubator" },
// 			{ selector: ".nav-careers", content: "Careers" },
// 		];

// 		tippy.setDefaultProps({
// 			placement: "right",
// 		});

// 		navItems.forEach((item) => {
// 			tippy(item.selector, {
// 				content: item.content,
// 			});
// 		});
// 	});
// }

async function loadScript(src) {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = src;
		script.onload = resolve;
		script.onerror = reject;
		document.head.appendChild(script);
	});
}

function setup_sidebar_toggle() {
	window.addEventListener("DOMContentLoaded", function () {
	    if (!document.querySelector(".frappe-sidebar-toggle")) return
    	document.querySelector(".frappe-sidebar-toggle").onclick = () => {
    	    if (!document.querySelector(".frappe-sidebar-new")) return
    		document.querySelector(".frappe-sidebar-new").style.left = "0px";
    		document.querySelector(".sidebar-backdrop").style.display = "block";
    	};
    	document.querySelector(".sidebar-backdrop").onclick = () => {
    	    if (!document.querySelector(".frappe-sidebar-new")) return
    		document.querySelector(".frappe-sidebar-new").style.left = "-100%";
    		document.querySelector(".sidebar-backdrop").style.display = "none";
    	};
	});
}

function setup_scroll_position_restore() {
	// Restore the scroll position when the page is loaded (standard restoration will not work, since our main scrollable container is not body)
	function wasTraversed() {
		const entries = performance.getEntriesByType("navigation");
		if (entries.length === 0) {
			return false;
		}
		const entry = entries[0];
		return entry.type === "back_forward";
	}

	function wasReloaded() {
		const entries = performance.getEntriesByType("navigation");
		if (entries.length === 0) {
			return false;
		}
		const entry = entries[0];
		return entry.type === "reload";
	}

	window.addEventListener("beforeunload", function () {
		if (wasReloaded() && !window.location.pathname.includes("/blog/")) {
			sessionStorage.removeItem(`scrollPosition:${window.location.pathname}`);
		}
		if (document.querySelector(".body-container")) {
			const scrollPosition = document.querySelector(".body-container").scrollTop;
			sessionStorage.setItem(`scrollPosition:${window.location.pathname}`, scrollPosition);
		}
	});
	window.addEventListener("DOMContentLoaded", function () {
		const savedScrollPosition =
			sessionStorage.getItem(`scrollPosition:${window.location.pathname}`) || 0;

		if (document.querySelector(".body-container") && (wasTraversed() || window.location.pathname.includes("/blog/") || window.location.pathname.includes("/partner/"))) {
			document.querySelector(".body-container").scrollTop = savedScrollPosition;
		}
	});
}

function setup_thought_of_the_day() {
	window.addEventListener("DOMContentLoaded", function () {
		// quote-of-the-day
		const quotes = [
			'"To err is human, to forgive is design." – Andrew Dillon',
			"The only way to do great work is to love what you do. - Steve Jobs",
			"In the middle of difficulty lies opportunity. - Albert Einstein",
			"The best way to predict the future is to invent it. – Alan Kay",
			"Simplicity is the ultimate sophistication. – Leonardo da Vinci",
			"Your most unhappy customers are your greatest source of learning. – Bill Gates",
			"Do one thing every day that scares you. – Eleanor Roosevelt",
			"The best revenge is massive success. – Frank Sinatra",
			"Whether you think you can, or you think you can't – you're right. – Henry Ford",
			 "It always seems impossible until it's done. – Nelson Mandela",
			 "Do or do not. There is no try. – Yoda",
			 "Design is intelligence made visible. - Alina Wheeler"
		];

		const day_of_year = new Date().getDay();

		// Display the quote for the current day
		const quote_element = document.querySelector(".f-thought em");
		if (quote_element) {
		    quote_element.textContent = quotes[day_of_year % quotes.length];
		}
		
	});
}

function setup_plausible() {
	// plausible
	const script = document.createElement("script");
	script.defer = true;
	script.dataset.api = "https://frappecloud.com/api/event";
	script.dataset.domain = "coworker365.com";
	script.src = "https://frappecloud.com/js/script.js";
	document.head.appendChild(script);
}

function setup_navigation_shortcut() {
	document.addEventListener("keydown", function (e) {
		var active = document.querySelector(".nav-link-item[active=true]");
		if (active) {
			var next =
				e.keyCode === 40
					? active.nextElementSibling
					: e.keyCode === 38
					? active.previousElementSibling
					: null;
			// there can be other elements between .nav-link-item
			while (
				next &&
				(next.classList.contains("nav-link-item") === false || next.offsetParent === null)
			) {
				next =
					e.keyCode === 40
						? next.nextElementSibling
						: e.keyCode === 38
						? next.previousElementSibling
						: null;
			}
			if (e.shiftKey && next) {
				next.click();
			}
		}
	});
}

function isMobile() {
	// 	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
	// 	  navigator.userAgent
	// 	);
	return window.matchMedia("(max-width: 767px)").matches;
}

function isTablet() {
	return window.matchMedia("(max-width: 1024px) and (min-width: 768px)").matches;
}

async function loadStyle(src) {
	return new Promise((resolve, reject) => {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = src;
		link.onload = resolve;
		link.onerror = reject;
		document.head.appendChild(link);
	});
}

function setup_posthog() {
    // !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    // posthog.init('phc_PxMKOBaHDGJApbZkYqSVro6YSecTYgQ6tB4BAV2nYmd',{api_host:'https://posthog.frappe.cloud'})
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('phc_zTPkxUE6DsTVNIZem5onI6EHRPu235yo1RFFZLBgvMH',{api_host:'https://onboarding.frappe.cloud', person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
        })
        posthog.set_config({disable_session_recording: true})
}

// forward UTM
(function() {
	'use strict';

	function forwardUtmParams() {
		const currentUrlParams = new URLSearchParams(window.location.search);
		const utmParams = new URLSearchParams();
		let hasUtmParams = false;

		// Extract UTM parameters from the current URL
		for (const [key, value] of currentUrlParams.entries()) {
			if (key.startsWith('utm_')) {
				utmParams.append(key, value);
				hasUtmParams = true;
			}
		}

		// If no UTM parameters are present, do nothing
		if (!hasUtmParams) {
			return;
		}

		const allLinks = document.querySelectorAll('a');

		allLinks.forEach(link => {
			// Ensure the link has a valid href and is not a mailto, tel, or javascript link
			if (link.href && link.protocol.startsWith('http')) {
				try {
					const linkUrl = new URL(link.href);

					// Append each UTM parameter individually to avoid overwriting existing ones
					for (const [key, value] of utmParams.entries()) {
						linkUrl.searchParams.set(key, value);
					}

					link.href = linkUrl.toString();
				} catch (error) {
					// Silently fail for invalid URLs
					console.error('Could not process link:', link.href, error);
				}
			}
		});
	}

	// Run the script after the DOM is fully loaded
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', forwardUtmParams);
	} else {
		forwardUtmParams();
	}

})();
