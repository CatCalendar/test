if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let i={};const r=e=>n(e,c),o={module:{uri:c},exports:i,require:r};s[c]=Promise.all(t.map((e=>o[e]||r(e)))).then((e=>(a(...e),i)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/4wFFg6dbGXcrjB7Y07b1H/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0-ba6bab7ea537742d.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/165-887654fbcf821de5.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/315-1b15f2ffef4aba5a.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/419-ef03ca73a7484621.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/479-30ab94dda4fd7c1e.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/807-6c586c1dfcc3d256.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/870fdd6f-a8165c05672aea20.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/996.e771f8e62b6360ba.js",revision:"e771f8e62b6360ba"},{url:"/_next/static/chunks/997.764c5eabe502b229.js",revision:"764c5eabe502b229"},{url:"/_next/static/chunks/app/_not-found/page-5256f8d7c78cec06.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/app/alllist/page-d64570844f767d95.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/app/layout-16d86283d65b4339.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/app/login/page-427ab4936b94b0e9.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/app/loginredirect/page-fe1e510810e52712.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/app/main/page-581dcc5f13c48180.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/app/not-found/page-0c6ff188f4e71d00.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/app/page-524ed23907c456b2.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/app/settings/page-6d983fa9d0205512.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/app/userinfo/page-000409ea49d1384b.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/fd9d1056-440dbf66f802efbb.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/main-app-0c9560b845091b8f.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/main-dc9181aa6ba06613.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/pages/_app-b5c2227311c627c3.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/pages/_error-1837e567621a4a44.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-98fc89554e4b3852.js",revision:"4wFFg6dbGXcrjB7Y07b1H"},{url:"/_next/static/css/925f89500d46c6ca.css",revision:"925f89500d46c6ca"},{url:"/_next/static/css/bfbd7af4256f64fd.css",revision:"bfbd7af4256f64fd"},{url:"/_next/static/css/c6f1d866e91cf71a.css",revision:"c6f1d866e91cf71a"},{url:"/_next/static/css/e71700e684a4a99e.css",revision:"e71700e684a4a99e"},{url:"/_redirects",revision:"2d3f0ccf6ff09003cf4bee8c4dc6b4b4"},{url:"/cat_calendar_192x192.png",revision:"69dba001be8d4e44eb18ca372232f22d"},{url:"/cat_calendar_512x512.png",revision:"b72fbfba994445a4d9623732ec7c6037"},{url:"/favicon.ico",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/firebase-messaging-sw.js",revision:"d0d7d97c89c8b918456ee12d2b2e0dfc"},{url:"/fonts/otf/BMDOHYEON_otf.otf",revision:"36832d8a62e404d88a6e27a464b509a6"},{url:"/fonts/otf/BMEULJIRO.otf",revision:"0cbe8592cfbea7b46b421e124af8d278"},{url:"/fonts/otf/BMEuljiro10yearslaterOTF.otf",revision:"cff030612de576843d7cfecd5ae28791"},{url:"/fonts/otf/BMEuljirooraeoraeOTF.otf",revision:"17c8c27e13a7b5a3c97a7af408d7ade9"},{url:"/fonts/otf/BMHANNAAir_otf.otf",revision:"f3d3e1c461ac941338dd7bda93a5cd39"},{url:"/fonts/otf/BMHANNAProOTF.otf",revision:"ba63542925fef755b9371c58361b008c"},{url:"/fonts/otf/BMHANNA_11yrs_otf.otf",revision:"6040aeebef9019e798fea909e9570756"},{url:"/fonts/otf/BMJUA_otf.otf",revision:"7592a08778fd0fc3b37b052386aac91a"},{url:"/fonts/otf/BMKIRANGHAERANG-OTF.otf",revision:"a34a4cbce0fdf72b3101b9794c18e908"},{url:"/fonts/otf/BMYEONSUNG_otf.otf",revision:"6f67016d941ca8998785bdf120cee8a1"},{url:"/kakao_login.png",revision:"b2df8abced56e0bbd49f7878a411e9c0"},{url:"/manifest.json",revision:"6a048adac8d7ae10607a097cd9627e13"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
