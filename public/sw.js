if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let i={};const r=e=>n(e,c),o={module:{uri:c},exports:i,require:r};s[c]=Promise.all(t.map((e=>o[e]||r(e)))).then((e=>(a(...e),i)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/I-kucXnIEQr7uIDXff8H7/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/170-ed844720f4d18471.js",revision:"I-kucXnIEQr7uIDXff8H7"},{url:"/_next/static/chunks/483-9db3e191b85403fc.js",revision:"I-kucXnIEQr7uIDXff8H7"},{url:"/_next/static/chunks/996.e771f8e62b6360ba.js",revision:"e771f8e62b6360ba"},{url:"/_next/static/chunks/997.764c5eabe502b229.js",revision:"764c5eabe502b229"},{url:"/_next/static/chunks/fd9d1056-0d46b918f4589de8.js",revision:"I-kucXnIEQr7uIDXff8H7"},{url:"/_next/static/chunks/framework-d885979d5822cdd1.js",revision:"I-kucXnIEQr7uIDXff8H7"},{url:"/_next/static/chunks/main-9f1314836eba4189.js",revision:"I-kucXnIEQr7uIDXff8H7"},{url:"/_next/static/chunks/main-app-daf9c170278bf2c7.js",revision:"I-kucXnIEQr7uIDXff8H7"},{url:"/_next/static/chunks/pages/_app-2e01431b668c05f8.js",revision:"I-kucXnIEQr7uIDXff8H7"},{url:"/_next/static/chunks/pages/_error-ef65971e2cb59a0e.js",revision:"I-kucXnIEQr7uIDXff8H7"},{url:"/_next/static/chunks/pages/allList-5752ef5fbaacdc8d.js",revision:"I-kucXnIEQr7uIDXff8H7"},{url:"/_next/static/chunks/pages/index-8d72d10390c59bec.js",revision:"I-kucXnIEQr7uIDXff8H7"},{url:"/_next/static/chunks/pages/login-f94ee32f86f99ed2.js",revision:"I-kucXnIEQr7uIDXff8H7"},{url:"/_next/static/chunks/pages/loginRedirect-b6e3d59306311338.js",revision:"I-kucXnIEQr7uIDXff8H7"},{url:"/_next/static/chunks/pages/main-7e4d8ccce313ff7b.js",revision:"I-kucXnIEQr7uIDXff8H7"},{url:"/_next/static/chunks/pages/settings-27dc8b43c40059f9.js",revision:"I-kucXnIEQr7uIDXff8H7"},{url:"/_next/static/chunks/pages/userInfo-7c4b186a8c3fdf11.js",revision:"I-kucXnIEQr7uIDXff8H7"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-e8d798b6eb48e138.js",revision:"I-kucXnIEQr7uIDXff8H7"},{url:"/_next/static/css/32b5006200498e6b.css",revision:"32b5006200498e6b"},{url:"/_next/static/css/925f89500d46c6ca.css",revision:"925f89500d46c6ca"},{url:"/_next/static/css/e4339e9fc3826291.css",revision:"e4339e9fc3826291"},{url:"/_next/static/css/e71700e684a4a99e.css",revision:"e71700e684a4a99e"},{url:"/_redirects",revision:"6a02faf7ea2a9584134ffe15779a0e44"},{url:"/cat_calendar_192x192.png",revision:"69dba001be8d4e44eb18ca372232f22d"},{url:"/cat_calendar_512x512.png",revision:"b72fbfba994445a4d9623732ec7c6037"},{url:"/favicon.ico",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/fonts/otf/BMDOHYEON_otf.otf",revision:"36832d8a62e404d88a6e27a464b509a6"},{url:"/fonts/otf/BMEULJIRO.otf",revision:"0cbe8592cfbea7b46b421e124af8d278"},{url:"/fonts/otf/BMEuljiro10yearslaterOTF.otf",revision:"cff030612de576843d7cfecd5ae28791"},{url:"/fonts/otf/BMEuljirooraeoraeOTF.otf",revision:"17c8c27e13a7b5a3c97a7af408d7ade9"},{url:"/fonts/otf/BMHANNAAir_otf.otf",revision:"f3d3e1c461ac941338dd7bda93a5cd39"},{url:"/fonts/otf/BMHANNAProOTF.otf",revision:"ba63542925fef755b9371c58361b008c"},{url:"/fonts/otf/BMHANNA_11yrs_otf.otf",revision:"6040aeebef9019e798fea909e9570756"},{url:"/fonts/otf/BMJUA_otf.otf",revision:"7592a08778fd0fc3b37b052386aac91a"},{url:"/fonts/otf/BMKIRANGHAERANG-OTF.otf",revision:"a34a4cbce0fdf72b3101b9794c18e908"},{url:"/fonts/otf/BMYEONSUNG_otf.otf",revision:"6f67016d941ca8998785bdf120cee8a1"},{url:"/kakao_login.png",revision:"b2df8abced56e0bbd49f7878a411e9c0"},{url:"/manifest.json",revision:"6a048adac8d7ae10607a097cd9627e13"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
