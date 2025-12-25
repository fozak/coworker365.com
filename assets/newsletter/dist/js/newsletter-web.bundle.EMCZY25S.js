(()=>{frappe.provide("newsletter");window.newsletter||(window.newsletter={});newsletter.subscribe_to_newsletter=function(e,t){return frappe.call({type:"POST",method:"frappe.email.doctype.newsletter.newsletter.subscribe",btn:t,args:{email:e.email},callback:e.callback})};})();
//# sourceMappingURL=newsletter-web.bundle.EMCZY25S.js.map
