(window["webpackJsonpPluginswag-pay-pal"]=window["webpackJsonpPluginswag-pay-pal"]||[]).push([[25],{8050:function(){},2025:function(e,n,t){"use strict";t.r(n),t(6065);let{Component:r}=Shopware;r.override("sw-settings-payment-list",{template:'{% block sw_settings_payment_list_column_active_editor %}\n<sw-icon\n    v-if="needsOnboarding(item)"\n    v-tooltip.left="{\n        message: $tc(\'sw-settings-payment-list.needOnboardingTooltip\'),\n    }"\n    name="regular-lock"\n    small\n/>\n<template v-else>\n    {% parent %}\n</template>\n{% endblock %}\n\n{% block sw_settings_payment_list_column_active_label %}\n<sw-icon\n    v-if="needsOnboarding(item)"\n    v-tooltip.left="{\n        message: $tc(\'sw-settings-payment-list.needOnboardingTooltip\'),\n    }"\n    name="regular-lock"\n    small\n/>\n<template v-else>\n    {% parent %}\n</template>\n{% endblock %}\n\n{% block sw_settings_payment_list_content_inner %}\n    <swag-paypal-created-component-helper\n        @on-created-component="fetchMerchantIntegrations"\n    />\n\n    {% parent %}\n{% endblock %}\n',inject:["SwagPayPalApiCredentialsService"],data(){return{merchantIntegrations:[]}},methods:{needsOnboarding(e){return!!Object.keys(this.merchantIntegrations).includes(e.id)&&"INACTIVE"===this.merchantIntegrations[e.id].toUpperCase()},fetchMerchantIntegrations(){this.SwagPayPalApiCredentialsService.getMerchantInformation().then(e=>{this.merchantIntegrations=e.merchantIntegrations??[]})}}})},6065:function(e,n,t){var r=t(8050);r.__esModule&&(r=r.default),"string"==typeof r&&(r=[[e.id,r,""]]),r.locals&&(e.exports=r.locals),t(5346).Z("6e0dce2d",r,!0,{})},5346:function(e,n,t){"use strict";function r(e,n){for(var t=[],r={},a=0;a<n.length;a++){var s=n[a],i=s[0],o={id:e+":"+a,css:s[1],media:s[2],sourceMap:s[3]};r[i]?r[i].parts.push(o):t.push(r[i]={id:i,parts:[o]})}return t}t.d(n,{Z:function(){return g}});var a="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!a)throw Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var s={},i=a&&(document.head||document.getElementsByTagName("head")[0]),o=null,l=0,c=!1,d=function(){},p=null,u="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function g(e,n,t,a){c=t,p=a||{};var i=r(e,n);return h(i),function(n){for(var t=[],a=0;a<i.length;a++){var o=s[i[a].id];o.refs--,t.push(o)}n?h(i=r(e,n)):i=[];for(var a=0;a<t.length;a++){var o=t[a];if(0===o.refs){for(var l=0;l<o.parts.length;l++)o.parts[l]();delete s[o.id]}}}}function h(e){for(var n=0;n<e.length;n++){var t=e[n],r=s[t.id];if(r){r.refs++;for(var a=0;a<r.parts.length;a++)r.parts[a](t.parts[a]);for(;a<t.parts.length;a++)r.parts.push(v(t.parts[a]));r.parts.length>t.parts.length&&(r.parts.length=t.parts.length)}else{for(var i=[],a=0;a<t.parts.length;a++)i.push(v(t.parts[a]));s[t.id]={id:t.id,refs:1,parts:i}}}}function m(){var e=document.createElement("style");return e.type="text/css",i.appendChild(e),e}function v(e){var n,t,r=document.querySelector("style["+u+'~="'+e.id+'"]');if(r){if(c)return d;r.parentNode.removeChild(r)}if(f){var a=l++;n=b.bind(null,r=o||(o=m()),a,!1),t=b.bind(null,r,a,!0)}else n=w.bind(null,r=m()),t=function(){r.parentNode.removeChild(r)};return n(e),function(r){r?(r.css!==e.css||r.media!==e.media||r.sourceMap!==e.sourceMap)&&n(e=r):t()}}var y=function(){var e=[];return function(n,t){return e[n]=t,e.filter(Boolean).join("\n")}}();function b(e,n,t,r){var a=t?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(n,a);else{var s=document.createTextNode(a),i=e.childNodes;i[n]&&e.removeChild(i[n]),i.length?e.insertBefore(s,i[n]):e.appendChild(s)}}function w(e,n){var t=n.css,r=n.media,a=n.sourceMap;if(r&&e.setAttribute("media",r),p.ssrId&&e.setAttribute(u,n.id),a&&(t+="\n/*# sourceURL="+a.sources[0]+" */\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}}]);