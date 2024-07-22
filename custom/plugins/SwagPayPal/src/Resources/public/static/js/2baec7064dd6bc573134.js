(window["webpackJsonpPluginswag-pay-pal"]=window["webpackJsonpPluginswag-pay-pal"]||[]).push([[596],{1582:function(){},8596:function(e,t,n){"use strict";n.r(t),n(955);let{Component:a}=Shopware;a.register("swag-paypal-campaign-banner",{template:'<sw-meteor-card :class="cardClasses">\n    <div class="sw-campaign-banner__container">\n        <div class="sw-campaign-banner__image">\n            <img :src="image">\n        </div>\n\n        <div class="sw-campaign-banner__content">\n            <div class="sw-campaign-banner__text">\n                <span\n                    v-if="showLabel"\n                    class="sw-campaign-banner__label"\n                >{{ labelText }}</span>\n                <h3>{{ title }}</h3>\n                <p v-html="text"></p>\n            </div>\n\n            <div class="sw-campaign-banner__action">\n                <sw-button variant="ghost" :routerLink="{ name: \'swag.paypal.index\' }">\n                    {{ linkTitle }}\n                </sw-button>\n            </div>\n\n\n            <button\n                class="swag-paypal-campaign-banner__close"\n                @click.prevent="close"\n            >\n                <sw-icon\n                    name="regular-times-s"\n                    small\n                />\n            </button>\n        </div>\n    </div>\n</sw-meteor-card>\n',i18n:{messages:{"de-DE":{"2022-10":{title:"Spare bares Geld!",text:'Am 01.08.2022 hat PayPal die Standardgeb\xfchren angepasst. Migriere bis 31.12.2022 zu PayPal Checkout* und behalte deine alten Geb\xfchren bis 31.07.2023.<br>* Erfahre mehr in unserem <a href="https://www.shopware.com/de/news/paypal-aktualisiert-gebuehren/" target="_blank">Blog Beitrag</a>',labelText:""},linkTitle:"Zu den PayPal-Einstellungen"},"en-GB":{"2022-10":{title:"Save money now!",text:'On 1 August 2022, PayPal adjusted the standard fees. Migrate to PayPal Checkout by 31 December 2022* and maintain your old prices until 31 July 2023!<br>* Learn more about in our <a href="https://www.shopware.com/en/news/paypal-updated-fees/" target="_blank">blog</a>',labelText:""},linkTitle:"Go to PayPal settings"}}},data(){return{closed:!0}},computed:{linkTitle(){return this.$tc("linkTitle")},timePrefix(){return"2022-10"},labelText(){return this.$tc(`${this.timePrefix}.labelText`)},showLabel(){return this.labelText!==`${this.timePrefix}.labelText`},title(){return this.$tc(`${this.timePrefix}.title`)},text(){return this.$tc(`${this.timePrefix}.text`)},assetFilter(){return Shopware.Filter.getByName("asset")},currentLocale(){return Shopware.State.get("session").currentLocale},image(){let e="de-DE"===this.currentLocale?"de":"en";return this.assetFilter(`swagpaypal/static/img/campaign/${this.timePrefix}_${e}.png`)},cardClasses(){return{"sw-campaign-banner":!0,"swag-paypal-campaign-banner":!0,"swag-paypal-campaign-banner__closed":this.closed}},localStorageKey(){return`swag-paypal-campaign-banner.${this.timePrefix}.closed`}},created(){this.createdComponent()},methods:{createdComponent(){this.closed="true"===window.localStorage.getItem(this.localStorageKey)},close(){this.closed=!0,window.localStorage.setItem(this.localStorageKey,"true")}}})},955:function(e,t,n){var a=n(1582);a.__esModule&&(a=a.default),"string"==typeof a&&(a=[[e.id,a,""]]),a.locals&&(e.exports=a.locals),n(5346).Z("85675608",a,!0,{})},5346:function(e,t,n){"use strict";function a(e,t){for(var n=[],a={},r=0;r<t.length;r++){var s=t[r],i=s[0],l={id:e+":"+r,css:s[1],media:s[2],sourceMap:s[3]};a[i]?a[i].parts.push(l):n.push(a[i]={id:i,parts:[l]})}return n}n.d(t,{Z:function(){return g}});var r="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!r)throw Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var s={},i=r&&(document.head||document.getElementsByTagName("head")[0]),l=null,o=0,c=!1,d=function(){},u=null,p="data-vue-ssr-id",h="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function g(e,t,n,r){c=n,u=r||{};var i=a(e,t);return m(i),function(t){for(var n=[],r=0;r<i.length;r++){var l=s[i[r].id];l.refs--,n.push(l)}t?m(i=a(e,t)):i=[];for(var r=0;r<n.length;r++){var l=n[r];if(0===l.refs){for(var o=0;o<l.parts.length;o++)l.parts[o]();delete s[l.id]}}}}function m(e){for(var t=0;t<e.length;t++){var n=e[t],a=s[n.id];if(a){a.refs++;for(var r=0;r<a.parts.length;r++)a.parts[r](n.parts[r]);for(;r<n.parts.length;r++)a.parts.push(b(n.parts[r]));a.parts.length>n.parts.length&&(a.parts.length=n.parts.length)}else{for(var i=[],r=0;r<n.parts.length;r++)i.push(b(n.parts[r]));s[n.id]={id:n.id,refs:1,parts:i}}}}function f(){var e=document.createElement("style");return e.type="text/css",i.appendChild(e),e}function b(e){var t,n,a=document.querySelector("style["+p+'~="'+e.id+'"]');if(a){if(c)return d;a.parentNode.removeChild(a)}if(h){var r=o++;t=v.bind(null,a=l||(l=f()),r,!1),n=v.bind(null,a,r,!0)}else t=y.bind(null,a=f()),n=function(){a.parentNode.removeChild(a)};return t(e),function(a){a?(a.css!==e.css||a.media!==e.media||a.sourceMap!==e.sourceMap)&&t(e=a):n()}}var w=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}();function v(e,t,n,a){var r=n?"":a.css;if(e.styleSheet)e.styleSheet.cssText=w(t,r);else{var s=document.createTextNode(r),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(s,i[t]):e.appendChild(s)}}function y(e,t){var n=t.css,a=t.media,r=t.sourceMap;if(a&&e.setAttribute("media",a),u.ssrId&&e.setAttribute(p,t.id),r&&(n+="\n/*# sourceURL="+r.sources[0]+" */\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}}]);