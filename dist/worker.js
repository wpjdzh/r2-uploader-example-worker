var te=async(e,t=Object.create(null))=>{let{all:s=!1,dot:r=!1}=t,o=(e instanceof T?e.raw.headers:e.headers).get("Content-Type");return o!==null&&o.startsWith("multipart/form-data")||o!==null&&o.startsWith("application/x-www-form-urlencoded")?Ce(e,{all:s,dot:r}):{}};async function Ce(e,t){let s=await e.formData();return s?Ae(s,t):{}}function Ae(e,t){let s=Object.create(null);return e.forEach((r,n)=>{t.all||n.endsWith("[]")?He(s,n,r):s[n]=r}),t.dot&&Object.entries(s).forEach(([r,n])=>{r.includes(".")&&(je(s,r,n),delete s[r])}),s}var He=(e,t,s)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(s):e[t]=[e[t],s]:e[t]=s},je=(e,t,s)=>{let r=e,n=t.split(".");n.forEach((o,c)=>{c===n.length-1?r[o]=s:((!r[o]||typeof r[o]!="object"||Array.isArray(r[o])||r[o]instanceof File)&&(r[o]=Object.create(null)),r=r[o])})};var B=e=>{let t=e.split("/");return t[0]===""&&t.shift(),t},re=e=>{let{groups:t,path:s}=Se(e),r=B(s);return Te(r,t)},Se=e=>{let t=[];return e=e.replace(/\{[^}]+\}/g,(s,r)=>{let n=`@${r}`;return t.push([n,s]),n}),{groups:t,path:e}},Te=(e,t)=>{for(let s=t.length-1;s>=0;s--){let[r]=t[s];for(let n=e.length-1;n>=0;n--)if(e[n].includes(r)){e[n]=e[n].replace(r,t[s][1]);break}}return e},_={},$=e=>{if(e==="*")return"*";let t=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);return t?(_[e]||(t[2]?_[e]=[e,t[1],new RegExp("^"+t[2]+"$")]:_[e]=[e,t[1],!0]),_[e]):null},_e=e=>{try{return decodeURI(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,t=>{try{return decodeURI(t)}catch{return t}})}},F=e=>{let t=e.url,s=t.indexOf("/",8),r=s;for(;r<t.length;r++){let n=t.charCodeAt(r);if(n===37){let o=t.indexOf("?",r),c=t.slice(s,o===-1?void 0:o);return _e(c.includes("%25")?c.replace(/%25/g,"%2525"):c)}else if(n===63)break}return t.slice(s,r)};var se=e=>{let t=F(e);return t.length>1&&t[t.length-1]==="/"?t.slice(0,-1):t},b=(...e)=>{let t="",s=!1;for(let r of e)t[t.length-1]==="/"&&(t=t.slice(0,-1),s=!0),r[0]!=="/"&&(r=`/${r}`),r==="/"&&s?t=`${t}/`:r!=="/"&&(t=`${t}${r}`),r==="/"&&t===""&&(t="/");return t},k=e=>{if(!e.match(/\:.+\?$/))return null;let t=e.split("/"),s=[],r="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))r+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){s.length===0&&r===""?s.push("/"):s.push(r);let o=n.replace("?","");r+="/"+o,s.push(r)}else r+="/"+n}),s.filter((n,o,c)=>c.indexOf(n)===o)},D=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),/%/.test(e)?M(e):e):e,ne=(e,t,s)=>{let r;if(!s&&t&&!/[%+]/.test(t)){let c=e.indexOf(`?${t}`,8);for(c===-1&&(c=e.indexOf(`&${t}`,8));c!==-1;){let a=e.charCodeAt(c+t.length+1);if(a===61){let i=c+t.length+2,l=e.indexOf("&",i);return D(e.slice(i,l===-1?void 0:l))}else if(a==38||isNaN(a))return"";c=e.indexOf(`&${t}`,c+1)}if(r=/[%+]/.test(e),!r)return}let n={};r??=/[%+]/.test(e);let o=e.indexOf("?",8);for(;o!==-1;){let c=e.indexOf("&",o+1),a=e.indexOf("=",o);a>c&&c!==-1&&(a=-1);let i=e.slice(o+1,a===-1?c===-1?void 0:c:a);if(r&&(i=D(i)),o=c,i==="")continue;let l;a===-1?l="":(l=e.slice(a+1,c===-1?void 0:c),r&&(l=D(l))),s?(n[i]&&Array.isArray(n[i])||(n[i]=[]),n[i].push(l)):n[i]??=l}return t?n[t]:n},oe=ne,ie=(e,t)=>ne(e,t,!0),M=decodeURIComponent;var T=class{raw;#r;#s;routeIndex=0;path;bodyCache={};constructor(e,t="/",s=[[]]){this.raw=e,this.path=t,this.#s=s,this.#r={}}param(e){return e?this.getDecodedParam(e):this.getAllDecodedParams()}getDecodedParam(e){let t=this.#s[0][this.routeIndex][1][e],s=this.getParamValue(t);return s?/\%/.test(s)?M(s):s:void 0}getAllDecodedParams(){let e={},t=Object.keys(this.#s[0][this.routeIndex][1]);for(let s of t){let r=this.getParamValue(this.#s[0][this.routeIndex][1][s]);r&&typeof r=="string"&&(e[s]=/\%/.test(r)?M(r):r)}return e}getParamValue(e){return this.#s[1]?this.#s[1][e]:e}query(e){return oe(this.url,e)}queries(e){return ie(this.url,e)}header(e){if(e)return this.raw.headers.get(e.toLowerCase())??void 0;let t={};return this.raw.headers.forEach((s,r)=>{t[r]=s}),t}async parseBody(e){return this.bodyCache.parsedBody??=await te(this,e)}cachedBody=e=>{let{bodyCache:t,raw:s}=this,r=t[e];if(r)return r;let n=Object.keys(t)[0];return n?t[n].then(o=>(n==="json"&&(o=JSON.stringify(o)),new Response(o)[e]())):t[e]=s[e]()};json(){return this.cachedBody("json")}text(){return this.cachedBody("text")}arrayBuffer(){return this.cachedBody("arrayBuffer")}blob(){return this.cachedBody("blob")}formData(){return this.cachedBody("formData")}addValidatedData(e,t){this.#r[e]=t}valid(e){return this.#r[e]}get url(){return this.raw.url}get method(){return this.raw.method}get matchedRoutes(){return this.#s[0].map(([[,e]])=>e)}get routePath(){return this.#s[0].map(([[,e]])=>e)[this.routeIndex].path}};var ae={Stringify:1,BeforeStream:2,Stream:3},ke=(e,t)=>{let s=new String(e);return s.isEscaped=!0,s.callbacks=t,s};var K=async(e,t,s,r,n)=>{let o=e.callbacks;if(!o?.length)return Promise.resolve(e);n?n[0]+=e:n=[e];let c=Promise.all(o.map(a=>a({phase:t,buffer:n,context:r}))).then(a=>Promise.all(a.filter(Boolean).map(i=>K(i,t,!1,r,n))).then(()=>n[0]));return s?ke(await c,o):c};var Me="text/plain; charset=UTF-8",V=(e,t={})=>(Object.entries(t).forEach(([s,r])=>e.set(s,r)),e),v=class{#r;#s;env={};#a;finalized=!1;error;#c=200;#o;#e;#t;#n;#i=!0;#u;#l;#h;#d;#f;constructor(e,t){this.#r=e,t&&(this.#o=t.executionCtx,this.env=t.env,this.#h=t.notFoundHandler,this.#f=t.path,this.#d=t.matchResult)}get req(){return this.#s??=new T(this.#r,this.#f,this.#d),this.#s}get event(){if(this.#o&&"respondWith"in this.#o)return this.#o;throw Error("This context has no FetchEvent")}get executionCtx(){if(this.#o)return this.#o;throw Error("This context has no ExecutionContext")}get res(){return this.#i=!1,this.#n||=new Response("404 Not Found",{status:404})}set res(e){if(this.#i=!1,this.#n&&e){this.#n.headers.delete("content-type");for(let[t,s]of this.#n.headers.entries())if(t==="set-cookie"){let r=this.#n.headers.getSetCookie();e.headers.delete("set-cookie");for(let n of r)e.headers.append("set-cookie",n)}else e.headers.set(t,s)}this.#n=e,this.finalized=!0}render=(...e)=>(this.#l??=t=>this.html(t),this.#l(...e));setLayout=e=>this.#u=e;getLayout=()=>this.#u;setRenderer=e=>{this.#l=e};header=(e,t,s)=>{if(t===void 0){this.#e?this.#e.delete(e):this.#t&&delete this.#t[e.toLocaleLowerCase()],this.finalized&&this.res.headers.delete(e);return}s?.append?(this.#e||(this.#i=!1,this.#e=new Headers(this.#t),this.#t={}),this.#e.append(e,t)):this.#e?this.#e.set(e,t):(this.#t??={},this.#t[e.toLowerCase()]=t),this.finalized&&(s?.append?this.res.headers.append(e,t):this.res.headers.set(e,t))};status=e=>{this.#i=!1,this.#c=e};set=(e,t)=>{this.#a??={},this.#a[e]=t};get=e=>this.#a?this.#a[e]:void 0;get var(){return{...this.#a}}newResponse=(e,t,s)=>{if(this.#i&&!s&&!t&&this.#c===200)return new Response(e,{headers:this.#t});if(t&&typeof t!="number"){let n=new Headers(t.headers);this.#e&&this.#e.forEach((c,a)=>{a==="set-cookie"?n.append(a,c):n.set(a,c)});let o=V(n,this.#t);return new Response(e,{headers:o,status:t.status??this.#c})}let r=typeof t=="number"?t:this.#c;this.#t??={},this.#e??=new Headers,V(this.#e,this.#t),this.#n&&(this.#n.headers.forEach((n,o)=>{o==="set-cookie"?this.#e?.append(o,n):this.#e?.set(o,n)}),V(this.#e,this.#t)),s??={};for(let[n,o]of Object.entries(s))if(typeof o=="string")this.#e.set(n,o);else{this.#e.delete(n);for(let c of o)this.#e.append(n,c)}return new Response(e,{status:r,headers:this.#e})};body=(e,t,s)=>typeof t=="number"?this.newResponse(e,t,s):this.newResponse(e,t);text=(e,t,s)=>{if(!this.#t){if(this.#i&&!s&&!t)return new Response(e);this.#t={}}return this.#t["content-type"]=Me,typeof t=="number"?this.newResponse(e,t,s):this.newResponse(e,t)};json=(e,t,s)=>{let r=JSON.stringify(e);return this.#t??={},this.#t["content-type"]="application/json; charset=UTF-8",typeof t=="number"?this.newResponse(r,t,s):this.newResponse(r,t)};html=(e,t,s)=>(this.#t??={},this.#t["content-type"]="text/html; charset=UTF-8",typeof e=="object"&&(e instanceof Promise||(e=e.toString()),e instanceof Promise)?e.then(r=>K(r,ae.Stringify,!1,{})).then(r=>typeof t=="number"?this.newResponse(r,t,s):this.newResponse(r,t)):typeof t=="number"?this.newResponse(e,t,s):this.newResponse(e,t));redirect=(e,t)=>(this.#e??=new Headers,this.#e.set("Location",e),this.newResponse(null,t??302));notFound=()=>(this.#h??=()=>new Response,this.#h(this))};var W=(e,t,s)=>(r,n)=>{let o=-1;return c(0);async function c(a){if(a<=o)throw new Error("next() called multiple times");o=a;let i,l=!1,h;if(e[a]?(h=e[a][0][0],r instanceof v&&(r.req.routeIndex=a)):h=a===e.length&&n||void 0,!h)r instanceof v&&r.finalized===!1&&s&&(i=await s(r));else try{i=await h(r,()=>c(a+1))}catch(u){if(u instanceof Error&&r instanceof v&&t)r.error=u,i=await t(u,r),l=!0;else throw u}return i&&(r.finalized===!1||l)&&(r.res=i),r}};var d="ALL",ce="all",le=["get","post","put","delete","options","patch"],I="Can not add a route since the matcher is already built.",q=class extends Error{};var Ie=Symbol("composedHandler"),qe=e=>e.text("404 Not Found",404),he=(e,t)=>"getResponse"in e?e.getResponse():(console.error(e),t.text("Internal Server Error",500)),G=class{get;post;put;delete;options;patch;all;on;use;router;getPath;_basePath="/";#r="/";routes=[];constructor(e={}){[...le,ce].forEach(r=>{this[r]=(n,...o)=>(typeof n=="string"?this.#r=n:this.addRoute(r,this.#r,n),o.forEach(c=>{typeof c!="string"&&this.addRoute(r,this.#r,c)}),this)}),this.on=(r,n,...o)=>{for(let c of[n].flat()){this.#r=c;for(let a of[r].flat())o.map(i=>{this.addRoute(a.toUpperCase(),this.#r,i)})}return this},this.use=(r,...n)=>(typeof r=="string"?this.#r=r:(this.#r="*",n.unshift(r)),n.forEach(o=>{this.addRoute(d,this.#r,o)}),this);let s=e.strict??!0;delete e.strict,Object.assign(this,e),this.getPath=s?e.getPath??F:se}clone(){let e=new G({router:this.router,getPath:this.getPath});return e.routes=this.routes,e}notFoundHandler=qe;errorHandler=he;route(e,t){let s=this.basePath(e);return t.routes.map(r=>{let n;t.errorHandler===he?n=r.handler:(n=async(o,c)=>(await W([],t.errorHandler)(o,()=>r.handler(o,c))).res,n[Ie]=r.handler),s.addRoute(r.method,r.path,n)}),this}basePath(e){let t=this.clone();return t._basePath=b(this._basePath,e),t}onError=e=>(this.errorHandler=e,this);notFound=e=>(this.notFoundHandler=e,this);mount(e,t,s){let r,n;s&&(typeof s=="function"?n=s:(n=s.optionHandler,r=s.replaceRequest));let o=n?a=>{let i=n(a);return Array.isArray(i)?i:[i]}:a=>{let i;try{i=a.executionCtx}catch{}return[a.env,i]};r||=(()=>{let a=b(this._basePath,e),i=a==="/"?0:a.length;return l=>{let h=new URL(l.url);return h.pathname=h.pathname.slice(i)||"/",new Request(h,l)}})();let c=async(a,i)=>{let l=await t(r(a.req.raw),...o(a));if(l)return l;await i()};return this.addRoute(d,b(e,"*"),c),this}addRoute(e,t,s){e=e.toUpperCase(),t=b(this._basePath,t);let r={path:t,method:e,handler:s};this.router.add(e,t,[s,r]),this.routes.push(r)}matchRoute(e,t){return this.router.match(e,t)}handleError(e,t){if(e instanceof Error)return this.errorHandler(e,t);throw e}dispatch(e,t,s,r){if(r==="HEAD")return(async()=>new Response(null,await this.dispatch(e,t,s,"GET")))();let n=this.getPath(e,{env:s}),o=this.matchRoute(r,n),c=new v(e,{path:n,matchResult:o,env:s,executionCtx:t,notFoundHandler:this.notFoundHandler});if(o[0].length===1){let i;try{i=o[0][0][0][0](c,async()=>{c.res=await this.notFoundHandler(c)})}catch(l){return this.handleError(l,c)}return i instanceof Promise?i.then(l=>l||(c.finalized?c.res:this.notFoundHandler(c))).catch(l=>this.handleError(l,c)):i??this.notFoundHandler(c)}let a=W(o[0],this.errorHandler,this.notFoundHandler);return(async()=>{try{let i=await a(c);if(!i.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return i.res}catch(i){return this.handleError(i,c)}})()}fetch=(e,...t)=>this.dispatch(e,t[1],t[0],e.method);request=(e,t,s,r)=>{if(e instanceof Request)return t!==void 0&&(e=new Request(e,t)),this.fetch(e,s,r);e=e.toString();let n=/^https?:\/\//.test(e)?e:`http://localhost${b("/",e)}`,o=new Request(n,t);return this.fetch(o,s,r)};fire=()=>{addEventListener("fetch",e=>{e.respondWith(this.dispatch(e.request,e,void 0,e.request.method))})}};var N="[^/]+",H=".*",j="(?:|/.*)",O=Symbol(),Ne=new Set(".\\+*[^]$()");function Le(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===H||e===j?1:t===H||t===j?-1:e===N?1:t===N?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var L=class{index;varIndex;children=Object.create(null);insert(e,t,s,r,n){if(e.length===0){if(this.index!==void 0)throw O;if(n)return;this.index=t;return}let[o,...c]=e,a=o==="*"?c.length===0?["","",H]:["","",N]:o==="/*"?["","",j]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/),i;if(a){let l=a[1],h=a[2]||N;if(l&&a[2]&&(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h)))throw O;if(i=this.children[h],!i){if(Object.keys(this.children).some(u=>u!==H&&u!==j))throw O;if(n)return;i=this.children[h]=new L,l!==""&&(i.varIndex=r.varIndex++)}!n&&l!==""&&s.push([l,i.varIndex])}else if(i=this.children[o],!i){if(Object.keys(this.children).some(l=>l.length>1&&l!==H&&l!==j))throw O;if(n)return;i=this.children[o]=new L}i.insert(c,t,s,r,n)}buildRegExpStr(){let t=Object.keys(this.children).sort(Le).map(s=>{let r=this.children[s];return(typeof r.varIndex=="number"?`(${s})@${r.varIndex}`:Ne.has(s)?`\\${s}`:s)+r.buildRegExpStr()});return typeof this.index=="number"&&t.unshift(`#${this.index}`),t.length===0?"":t.length===1?t[0]:"(?:"+t.join("|")+")"}};var ue=class{context={varIndex:0};root=new L;insert(e,t,s){let r=[],n=[];for(let c=0;;){let a=!1;if(e=e.replace(/\{[^}]+\}/g,i=>{let l=`@\\${c}`;return n[c]=[l,i],c++,a=!0,l}),!a)break}let o=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let c=n.length-1;c>=0;c--){let[a]=n[c];for(let i=o.length-1;i>=0;i--)if(o[i].indexOf(a)!==-1){o[i]=o[i].replace(a,n[c][1]);break}}return this.root.insert(o,t,r,this.context,s),r}buildRegExp(){let e=this.root.buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0,s=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,o,c)=>typeof o<"u"?(s[++t]=Number(o),"$()"):(typeof c<"u"&&(r[Number(c)]=++t),"")),[new RegExp(`^${e}`),s,r]}};var de=[],Ue=[/^$/,[],Object.create(null)],fe=Object.create(null);function pe(e){return fe[e]??=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`)}function De(){fe=Object.create(null)}function Be(e){let t=new ue,s=[];if(e.length===0)return Ue;let r=e.map(l=>[!/\*|\/:/.test(l[0]),...l]).sort(([l,h],[u,p])=>l?1:u?-1:h.length-p.length),n=Object.create(null);for(let l=0,h=-1,u=r.length;l<u;l++){let[p,x,f]=r[l];p?n[x]=[f.map(([y])=>[y,Object.create(null)]),de]:h++;let m;try{m=t.insert(x,h,p)}catch(y){throw y===O?new q(x):y}p||(s[h]=f.map(([y,w])=>{let C=Object.create(null);for(w-=1;w>=0;w--){let[R,S]=m[w];C[R]=S}return[y,C]}))}let[o,c,a]=t.buildRegExp();for(let l=0,h=s.length;l<h;l++)for(let u=0,p=s[l].length;u<p;u++){let x=s[l][u]?.[1];if(!x)continue;let f=Object.keys(x);for(let m=0,y=f.length;m<y;m++)x[f[m]]=a[x[f[m]]]}let i=[];for(let l in c)i[l]=s[c[l]];return[o,i,n]}function P(e,t){if(e){for(let s of Object.keys(e).sort((r,n)=>n.length-r.length))if(pe(s).test(t))return[...e[s]]}}var z=class{name="RegExpRouter";middleware;routes;constructor(){this.middleware={[d]:Object.create(null)},this.routes={[d]:Object.create(null)}}add(e,t,s){let{middleware:r,routes:n}=this;if(!r||!n)throw new Error(I);r[e]||[r,n].forEach(a=>{a[e]=Object.create(null),Object.keys(a[d]).forEach(i=>{a[e][i]=[...a[d][i]]})}),t==="/*"&&(t="*");let o=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){let a=pe(t);e===d?Object.keys(r).forEach(i=>{r[i][t]||=P(r[i],t)||P(r[d],t)||[]}):r[e][t]||=P(r[e],t)||P(r[d],t)||[],Object.keys(r).forEach(i=>{(e===d||e===i)&&Object.keys(r[i]).forEach(l=>{a.test(l)&&r[i][l].push([s,o])})}),Object.keys(n).forEach(i=>{(e===d||e===i)&&Object.keys(n[i]).forEach(l=>a.test(l)&&n[i][l].push([s,o]))});return}let c=k(t)||[t];for(let a=0,i=c.length;a<i;a++){let l=c[a];Object.keys(n).forEach(h=>{(e===d||e===h)&&(n[h][l]||=[...P(r[h],l)||P(r[d],l)||[]],n[h][l].push([s,o-i+a+1]))})}}match(e,t){De();let s=this.buildAllMatchers();return this.match=(r,n)=>{let o=s[r]||s[d],c=o[2][n];if(c)return c;let a=n.match(o[0]);if(!a)return[[],de];let i=a.indexOf("",1);return[o[1][i],a]},this.match(e,t)}buildAllMatchers(){let e=Object.create(null);return[...Object.keys(this.routes),...Object.keys(this.middleware)].forEach(t=>{e[t]||=this.buildMatcher(t)}),this.middleware=this.routes=void 0,e}buildMatcher(e){let t=[],s=e===d;return[this.middleware,this.routes].forEach(r=>{let n=r[e]?Object.keys(r[e]).map(o=>[o,r[e][o]]):[];n.length!==0?(s||=!0,t.push(...n)):e!==d&&t.push(...Object.keys(r[d]).map(o=>[o,r[d][o]]))}),s?Be(t):null}};var Y=class{name="SmartRouter";routers=[];routes=[];constructor(e){Object.assign(this,e)}add(e,t,s){if(!this.routes)throw new Error(I);this.routes.push([e,t,s])}match(e,t){if(!this.routes)throw new Error("Fatal error");let{routers:s,routes:r}=this,n=s.length,o=0,c;for(;o<n;o++){let a=s[o];try{r.forEach(i=>{a.add(...i)}),c=a.match(e,t)}catch(i){if(i instanceof q)continue;throw i}this.match=a.match.bind(a),this.routers=[a],this.routes=void 0;break}if(o===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,c}get activeRouter(){if(this.routes||this.routers.length!==1)throw new Error("No active router has been determined yet.");return this.routers[0]}};var Q=class{methods;children;patterns;order=0;name;params=Object.create(null);constructor(e,t,s){if(this.children=s||Object.create(null),this.methods=[],this.name="",e&&t){let r=Object.create(null);r[e]={handler:t,possibleKeys:[],score:0,name:this.name},this.methods=[r]}this.patterns=[]}insert(e,t,s){this.name=`${e} ${t}`,this.order=++this.order;let r=this,n=re(t),o=[];for(let i=0,l=n.length;i<l;i++){let h=n[i];if(Object.keys(r.children).includes(h)){r=r.children[h];let p=$(h);p&&o.push(p[1]);continue}r.children[h]=new Q;let u=$(h);u&&(r.patterns.push(u),o.push(u[1])),r=r.children[h]}r.methods.length||(r.methods=[]);let c=Object.create(null),a={handler:s,possibleKeys:o.filter((i,l,h)=>h.indexOf(i)===l),name:this.name,score:this.order};return c[e]=a,r.methods.push(c),r}gHSets(e,t,s,r){let n=[];for(let o=0,c=e.methods.length;o<c;o++){let a=e.methods[o],i=a[t]||a[d],l=Object.create(null);i!==void 0&&(i.params=Object.create(null),i.possibleKeys.forEach(h=>{let u=l[i.name];i.params[h]=r[h]&&!u?r[h]:s[h]??r[h],l[i.name]=!0}),n.push(i))}return n}search(e,t){let s=[];this.params=Object.create(null);let n=[this],o=B(t);for(let a=0,i=o.length;a<i;a++){let l=o[a],h=a===i-1,u=[];for(let p=0,x=n.length;p<x;p++){let f=n[p],m=f.children[l];m&&(m.params=f.params,h===!0?(m.children["*"]&&s.push(...this.gHSets(m.children["*"],e,f.params,Object.create(null))),s.push(...this.gHSets(m,e,f.params,Object.create(null)))):u.push(m));for(let y=0,w=f.patterns.length;y<w;y++){let C=f.patterns[y],R={...f.params};if(C==="*"){let U=f.children["*"];U&&(s.push(...this.gHSets(U,e,f.params,Object.create(null))),u.push(U));continue}if(l==="")continue;let[S,Z,A]=C,E=f.children[S],ee=o.slice(a).join("/");if(A instanceof RegExp&&A.test(ee)){R[Z]=ee,s.push(...this.gHSets(E,e,f.params,R));continue}(A===!0||A instanceof RegExp&&A.test(l))&&typeof S=="string"&&(R[Z]=l,h===!0?(s.push(...this.gHSets(E,e,R,f.params)),E.children["*"]&&s.push(...this.gHSets(E.children["*"],e,R,f.params))):(E.params=R,u.push(E)))}}n=u}return[s.sort((a,i)=>a.score-i.score).map(({handler:a,params:i})=>[a,i])]}};var X=class{name="TrieRouter";node;constructor(){this.node=new Q}add(e,t,s){let r=k(t);if(r){for(let n of r)this.node.insert(e,n,s);return}this.node.insert(e,t,s)}match(e,t){return this.node.search(e,t)}};var J=class extends G{constructor(e={}){super(e),this.router=e.router??new Y({routers:[new z,new X]})}};var me=e=>{let s={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},r=(n=>typeof n=="string"?()=>n:typeof n=="function"?n:o=>n.includes(o)?o:n[0])(s.origin);return async function(o,c){function a(l,h){o.res.headers.set(l,h)}let i=r(o.req.header("origin")||"",o);if(i&&a("Access-Control-Allow-Origin",i),s.origin!=="*"){let l=o.req.header("Vary");l?a("Vary",l):a("Vary","Origin")}if(s.credentials&&a("Access-Control-Allow-Credentials","true"),s.exposeHeaders?.length&&a("Access-Control-Expose-Headers",s.exposeHeaders.join(",")),o.req.method==="OPTIONS"){s.maxAge!=null&&a("Access-Control-Max-Age",s.maxAge.toString()),s.allowMethods?.length&&a("Access-Control-Allow-Methods",s.allowMethods.join(","));let l=s.allowHeaders;if(!l?.length){let h=o.req.header("Access-Control-Request-Headers");h&&(l=h.split(/\s*,\s*/))}return l?.length&&(a("Access-Control-Allow-Headers",l.join(",")),o.res.headers.append("Vary","Access-Control-Request-Headers")),o.res.headers.delete("Content-Length"),o.res.headers.delete("Content-Type"),new Response(null,{headers:o.res.headers,status:204,statusText:o.res.statusText})}await c()}};async function ge(e){let t=e.req.param("key"),s=await e.env.R2_BUCKET.get(t);if(s===null)return new Response("Object Not Found",{status:404});let r=new Headers;return s.writeHttpMetadata(r),r.set("etag",s.httpEtag),r.set("Access-Control-Allow-Origin","*"),new Response(s.body,{headers:r})}async function ye(e){let t=e.req.query("cursor"),s=await e.env.R2_BUCKET.list({cursor:t||void 0});return e.json(s)}async function xe(e){let t=e.req.param("key"),s=await e.req.blob(),r=e.env.R2_BUCKET;return t?(await r.put(t,s,{httpMetadata:{contentType:s.type}}),e.text("Done")):e.text("file name is required",400)}async function Re(e){let t=e.req.param("key");return await e.env.R2_BUCKET.delete(t),new Response(null,{status:204})}async function we(e){let t=e.req.param("key"),s=await e.env.R2_BUCKET.createMultipartUpload(t);return e.json({key:s.key,uploadId:s.uploadId})}async function Ee(e){let t=e.req.query("uploadId"),s=e.req.query("partNumber")||"",r=e.req.param("key");if(!t)return e.text("uploadId is required",400);if(!s)return e.text("partNumber is required",400);let n=Number(s);if(isNaN(n))return e.text("partNumber must be a number",400);let o=e.env.R2_BUCKET.resumeMultipartUpload(r,t);try{let c=await o.uploadPart(n,e.req.raw.body);return new Response(JSON.stringify(c))}catch(c){return new Response(c.message,{status:400})}}async function be(e){let t=e.req.param("key"),s=e.req.query("uploadId");if(!s)return e.text("uploadId is required",400);let r=e.env.R2_BUCKET.resumeMultipartUpload(t,s);try{await r.abort()}catch(n){return new Response(n.message,{status:400})}return new Response(null,{status:204})}async function ve(e){let t=e.req.param("key"),s=e.req.query("uploadId");if(!s)return e.text("uploadId is required",400);let r=e.env.R2_BUCKET.resumeMultipartUpload(t,s),n;try{n=await e.req.json()}catch(o){return console.log("parsing complete body failed"),console.log(o),e.text("invalid json",400)}try{let o=await r.complete(n.parts);return new Response(null,{headers:{etag:o.httpEtag}})}catch(o){return new Response(o.message,{status:400})}}function Oe(e){return e.text("yes")}function $e(e){if(!e.env.AUTH_KEY_SECRET)return e.text("AUTH_KEY_SECRET is not set",403);let t=e.req.header("x-api-key")===e.env.AUTH_KEY_SECRET;return e.req.method==="GET"?e.env.PRIVATE_BUCKET?t:!0:["POST","PATCH","PUT","DELETE"].includes(e.req.method)?t:e.req.method==="OPTIONS"}async function Pe(e,t){return $e(e)&&(console.log("Header is valid"),await t()),e.json({status:401,message:"Unauthorized"})}var g=new J;g.get("/support_mpu",Oe);g.use("*",Pe);g.use(me());g.get("/",e=>e.text("Hello R2! v2025.01.13"));g.post("/mpu/create/:key{.*}",we);g.put("/mpu/:key{.*}",Ee);g.delete("/mpu/:key{.*}",be);g.post("/mpu/complete/:key{.*}",ve);g.get("/:key{.*}",ge);g.patch("/",ye);g.put("/:key{.*}",xe);g.delete("/:key{.*}",Re);g.all("*",e=>e.text("404 Not Found"));var gr=g;export{gr as default};
//# sourceMappingURL=index.js.map
