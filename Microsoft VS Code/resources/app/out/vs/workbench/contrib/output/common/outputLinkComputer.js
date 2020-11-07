/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
(function(){var e=["require","exports","vs/base/common/strings","vs/base/common/extpath","vs/base/common/platform","vs/base/common/uri","vs/base/common/path","vs/base/common/map","vs/base/common/network","vs/base/common/async","vs/base/common/glob","vs/base/common/resources","vs/base/common/cancellation","vs/base/common/errors","vs/base/common/event","vs/base/common/lifecycle","vs/base/common/types","vs/workbench/contrib/output/common/outputLinkComputer","vs/editor/common/core/range"],t=function(t){for(var s=[],i=0,r=t.length;i<r;i++)s[i]=e[t[i]];return s};define(e[9],t([0,1,12,13,14,15]),(function(e,t,s,i,r,n){"use strict";function o(e){return e&&"function"==typeof e.then}function a(e){const t=new s.CancellationTokenSource,r=e(t.token),n=new Promise((e,s)=>{t.token.onCancellationRequested(()=>{s(i.canceled())}),Promise.resolve(r).then(s=>{t.dispose(),e(s)},e=>{t.dispose(),s(e)})});return new class{cancel(){t.cancel()}then(e,t){return n.then(e,t)}catch(e){return this.then(void 0,e)}finally(e){
return n.finally(e)}}}Object.defineProperty(t,"__esModule",{value:!0}),t.IntervalCounter=t.TaskSequentializer=t.retry=t.IdleValue=t.runWhenIdle=t.RunOnceWorker=t.RunOnceScheduler=t.IntervalTimer=t.TimeoutTimer=t.ResourceQueue=t.Queue=t.Limiter=t.first=t.sequence=t.ignoreErrors=t.disposableTimeout=t.timeout=t.Barrier=t.ThrottledDelayer=t.Delayer=t.SequencerByKey=t.Sequencer=t.Throttler=t.asPromise=t.raceTimeout=t.raceCancellablePromises=t.raceCancellation=t.createCancelablePromise=t.isThenable=void 0,t.isThenable=o,t.createCancelablePromise=a,t.raceCancellation=function(e,t,s){return Promise.race([e,new Promise(e=>t.onCancellationRequested(()=>e(s)))])},t.raceCancellablePromises=async function(e){let t=-1;const s=e.map((e,s)=>e.then(e=>(t=s,e))),i=await Promise.race(s);return e.forEach((e,s)=>{s!==t&&e.cancel()}),i},t.raceTimeout=function(e,t,s){let i=void 0;const r=setTimeout(()=>{null==i||i(void 0),null==s||s()},t);return Promise.race([e.finally(()=>clearTimeout(r)),new Promise(e=>i=e)])},
t.asPromise=function(e){return new Promise((t,s)=>{const i=e();o(i)?i.then(t,s):t(i)})};class h{constructor(){this.activePromise=null,this.queuedPromise=null,this.queuedPromiseFactory=null}queue(e){if(this.activePromise){if(this.queuedPromiseFactory=e,!this.queuedPromise){const e=()=>{this.queuedPromise=null;const e=this.queue(this.queuedPromiseFactory);return this.queuedPromiseFactory=null,e};this.queuedPromise=new Promise(t=>{this.activePromise.then(e,e).then(t)})}return new Promise((e,t)=>{this.queuedPromise.then(e,t)})}return this.activePromise=e(),new Promise((e,t)=>{this.activePromise.then(t=>{this.activePromise=null,e(t)},e=>{this.activePromise=null,t(e)})})}}t.Throttler=h;t.Sequencer=class{constructor(){this.current=Promise.resolve(null)}queue(e){return this.current=this.current.then(()=>e())}};t.SequencerByKey=class{constructor(){this.promiseMap=new Map}queue(e,t){var s;const i=(null!==(s=this.promiseMap.get(e))&&void 0!==s?s:Promise.resolve()).catch(()=>{}).then(t).finally(()=>{
this.promiseMap.get(e)===i&&this.promiseMap.delete(e)});return this.promiseMap.set(e,i),i}};class u{constructor(e){this.defaultDelay=e,this.timeout=null,this.completionPromise=null,this.doResolve=null,this.doReject=null,this.task=null}trigger(e,t=this.defaultDelay){return this.task=e,this.cancelTimeout(),this.completionPromise||(this.completionPromise=new Promise((e,t)=>{this.doResolve=e,this.doReject=t}).then(()=>{if(this.completionPromise=null,this.doResolve=null,this.task){const e=this.task;return this.task=null,e()}})),this.timeout=setTimeout(()=>{this.timeout=null,this.doResolve&&this.doResolve(null)},t),this.completionPromise}isTriggered(){return null!==this.timeout}cancel(){this.cancelTimeout(),this.completionPromise&&(this.doReject&&this.doReject(i.canceled()),this.completionPromise=null)}cancelTimeout(){null!==this.timeout&&(clearTimeout(this.timeout),this.timeout=null)}dispose(){this.cancelTimeout()}}t.Delayer=u;t.ThrottledDelayer=class{constructor(e){this.delayer=new u(e),this.throttler=new h}
trigger(e,t){return this.delayer.trigger(()=>this.throttler.queue(e),t)}isTriggered(){return this.delayer.isTriggered()}cancel(){this.delayer.cancel()}dispose(){this.delayer.dispose()}};function l(e,t){return t?new Promise((s,r)=>{const n=setTimeout(s,e);t.onCancellationRequested(()=>{clearTimeout(n),r(i.canceled())})}):a(t=>l(e,t))}t.Barrier=class{constructor(){this._isOpen=!1,this._promise=new Promise((e,t)=>{this._completePromise=e})}isOpen(){return this._isOpen}open(){this._isOpen=!0,this._completePromise(!0)}wait(){return this._promise}},t.timeout=l,t.disposableTimeout=function(e,t=0){const s=setTimeout(e,t);return n.toDisposable(()=>clearTimeout(s))},t.ignoreErrors=function(e){return e.then(void 0,e=>void 0)},t.sequence=function(e){const t=[];let s=0;const i=e.length;return Promise.resolve(null).then((function r(n){null!=n&&t.push(n);const o=s<i?e[s++]():null;return o?o.then(r):Promise.resolve(t)}))},t.first=function(e,t=(e=>!!e),s=null){let i=0;const r=e.length,n=()=>{if(i>=r)return Promise.resolve(s)
;const o=e[i++];return Promise.resolve(o()).then(e=>t(e)?Promise.resolve(e):n())};return n()};class c{constructor(e){this._size=0,this.maxDegreeOfParalellism=e,this.outstandingPromises=[],this.runningPromises=0,this._onFinished=new r.Emitter}get onFinished(){return this._onFinished.event}get size(){return this._size}queue(e){return this._size++,new Promise((t,s)=>{this.outstandingPromises.push({factory:e,c:t,e:s}),this.consume()})}consume(){for(;this.outstandingPromises.length&&this.runningPromises<this.maxDegreeOfParalellism;){const e=this.outstandingPromises.shift();this.runningPromises++;const t=e.factory();t.then(e.c,e.e),t.then(()=>this.consumed(),()=>this.consumed())}}consumed(){this._size--,this.runningPromises--,this.outstandingPromises.length>0?this.consume():this._onFinished.fire()}dispose(){this._onFinished.dispose()}}t.Limiter=c;class d extends c{constructor(){super(1)}}t.Queue=d;t.ResourceQueue=class{constructor(){this.queues=new Map}queueFor(e){const t=e.toString();if(!this.queues.has(t)){
const e=new d;e.onFinished(()=>{e.dispose(),this.queues.delete(t)}),this.queues.set(t,e)}return this.queues.get(t)}dispose(){this.queues.forEach(e=>e.dispose()),this.queues.clear()}};t.TimeoutTimer=class{constructor(e,t){this._token=-1,"function"==typeof e&&"number"==typeof t&&this.setIfNotSet(e,t)}dispose(){this.cancel()}cancel(){-1!==this._token&&(clearTimeout(this._token),this._token=-1)}cancelAndSet(e,t){this.cancel(),this._token=setTimeout(()=>{this._token=-1,e()},t)}setIfNotSet(e,t){-1===this._token&&(this._token=setTimeout(()=>{this._token=-1,e()},t))}};t.IntervalTimer=class{constructor(){this._token=-1}dispose(){this.cancel()}cancel(){-1!==this._token&&(clearInterval(this._token),this._token=-1)}cancelAndSet(e,t){this.cancel(),this._token=setInterval(()=>{e()},t)}};class m{constructor(e,t){this.timeoutToken=-1,this.runner=e,this.timeout=t,this.timeoutHandler=this.onTimeout.bind(this)}dispose(){this.cancel(),this.runner=null}cancel(){this.isScheduled()&&(clearTimeout(this.timeoutToken),
this.timeoutToken=-1)}schedule(e=this.timeout){this.cancel(),this.timeoutToken=setTimeout(this.timeoutHandler,e)}get delay(){return this.timeout}set delay(e){this.timeout=e}isScheduled(){return-1!==this.timeoutToken}onTimeout(){this.timeoutToken=-1,this.runner&&this.doRun()}doRun(){this.runner&&this.runner()}}t.RunOnceScheduler=m;t.RunOnceWorker=class extends m{constructor(e,t){super(e,t),this.units=[]}work(e){this.units.push(e),this.isScheduled()||this.schedule()}doRun(){const e=this.units;this.units=[],this.runner&&this.runner(e)}dispose(){this.units=[],super.dispose()}},function(){if("function"!=typeof requestIdleCallback||"function"!=typeof cancelIdleCallback){const e=Object.freeze({didTimeout:!0,timeRemaining:()=>15});t.runWhenIdle=t=>{const s=setTimeout(()=>t(e));let i=!1;return{dispose(){i||(i=!0,clearTimeout(s))}}}}else t.runWhenIdle=(e,t)=>{const s=requestIdleCallback(e,"number"==typeof t?{timeout:t}:void 0);let i=!1;return{dispose(){i||(i=!0,cancelIdleCallback(s))}}}}();t.IdleValue=class{
constructor(e){this._didRun=!1,this._executor=()=>{try{this._value=e()}catch(e){this._error=e}finally{this._didRun=!0}},this._handle=t.runWhenIdle(()=>this._executor())}dispose(){this._handle.dispose()}get value(){if(this._didRun||(this._handle.dispose(),this._executor()),this._error)throw this._error;return this._value}},t.retry=async function(e,t,s){let i;for(let r=0;r<s;r++)try{return await e()}catch(e){i=e,await l(t)}throw i};t.TaskSequentializer=class{hasPending(e){return!!this._pending&&("number"==typeof e?this._pending.taskId===e:!!this._pending)}get pending(){return this._pending?this._pending.promise:void 0}cancelPending(){var e;null===(e=this._pending)||void 0===e||e.cancel()}setPending(e,t,s){return this._pending={taskId:e,cancel:()=>null==s?void 0:s(),promise:t},t.then(()=>this.donePending(e),()=>this.donePending(e)),t}donePending(e){this._pending&&e===this._pending.taskId&&(this._pending=void 0,this.triggerNext())}triggerNext(){if(this._next){const e=this._next;this._next=void 0,
e.run().then(e.promiseResolve,e.promiseReject)}}setNext(e){if(this._next)this._next.run=e;else{let t,s;const i=new Promise((e,i)=>{t=e,s=i});this._next={run:e,promise:i,promiseResolve:t,promiseReject:s}}return this._next.promise}};t.IntervalCounter=class{constructor(e){this.interval=e,this.lastIncrementTime=0,this.value=0}increment(){const e=Date.now();return e-this.lastIncrementTime>this.interval&&(this.lastIncrementTime=e,this.value=0),this.value++,this.value}}})),define(e[3],t([0,1,4,2,6,16]),(function(e,t,s,i,r,n){"use strict";function o(e){return 47===e||92===e}Object.defineProperty(t,"__esModule",{value:!0}),t.parseLineAndColumnAware=t.indexOfPath=t.isRootOrDriveLetter=t.sanitizeFilePath=t.isWindowsDriveLetter=t.isEqualOrParent=t.isEqual=t.isValidBasename=t.isUNC=t.getRoot=t.toSlashes=t.isPathSeparator=void 0,t.isPathSeparator=o,t.toSlashes=function(e){return e.replace(/[\\/]/g,r.posix.sep)},t.getRoot=function(e,t=r.posix.sep){if(!e)return"";const s=e.length,i=e.charCodeAt(0);if(o(i)){
if(o(e.charCodeAt(1))&&!o(e.charCodeAt(2))){let i=3;const r=i;for(;i<s&&!o(e.charCodeAt(i));i++);if(r!==i&&!o(e.charCodeAt(i+1)))for(i+=1;i<s;i++)if(o(e.charCodeAt(i)))return e.slice(0,i+1).replace(/[\\/]/g,t)}return t}if(l(i)&&58===e.charCodeAt(1))return o(e.charCodeAt(2))?e.slice(0,2)+t:e.slice(0,2);let n=e.indexOf("://");if(-1!==n)for(n+=3;n<s;n++)if(o(e.charCodeAt(n)))return e.slice(0,n+1);return""},t.isUNC=function(e){if(!s.isWindows)return!1;if(!e||e.length<5)return!1;let t=e.charCodeAt(0);if(92!==t)return!1;if(92!==(t=e.charCodeAt(1)))return!1;let i=2;const r=i;for(;i<e.length&&92!==(t=e.charCodeAt(i));i++);return r!==i&&(t=e.charCodeAt(i+1),!isNaN(t)&&92!==t)};const a=/[\\/:\*\?"<>\|]/g,h=/[\\/]/g,u=/^(con|prn|aux|clock\$|nul|lpt[0-9]|com[0-9])(\.(.*?))?$/i;function l(e){return e>=65&&e<=90||e>=97&&e<=122}t.isValidBasename=function(e,t=s.isWindows){const i=t?a:h;return!(!e||0===e.length||/^\s+$/.test(e))&&(i.lastIndex=0,
!i.test(e)&&((!t||!u.test(e))&&("."!==e&&".."!==e&&((!t||"."!==e[e.length-1])&&((!t||e.length===e.trim().length)&&!(e.length>255))))))},t.isEqual=function(e,t,s){const r=e===t;return!s||r?r:!(!e||!t)&&i.equalsIgnoreCase(e,t)},t.isEqualOrParent=function(e,t,s,n=r.sep){if(e===t)return!0;if(!e||!t)return!1;if(t.length>e.length)return!1;if(s){if(!i.startsWithIgnoreCase(e,t))return!1;if(t.length===e.length)return!0;let s=t.length;return t.charAt(t.length-1)===n&&s--,e.charAt(s)===n}return t.charAt(t.length-1)!==n&&(t+=n),0===e.indexOf(t)},t.isWindowsDriveLetter=l,t.sanitizeFilePath=function(e,t){return s.isWindows&&e.endsWith(":")&&(e+=r.sep),r.isAbsolute(e)||(e=r.join(t,e)),e=r.normalize(e),s.isWindows?(e=i.rtrim(e,r.sep)).endsWith(":")&&(e+=r.sep):(e=i.rtrim(e,r.sep))||(e=r.sep),e},t.isRootOrDriveLetter=function(e){const t=r.normalize(e);return s.isWindows?!(e.length>3)&&(l(t.charCodeAt(0))&&58===t.charCodeAt(1)&&(2===e.length||92===t.charCodeAt(2))):t===r.posix.sep},t.indexOfPath=function(e,t,s){
return t.length>e.length?-1:e===t?0:(s&&(e=e.toLowerCase(),t=t.toLowerCase()),e.indexOf(t))},t.parseLineAndColumnAware=function(e){const t=e.split(":");let s=void 0,i=void 0,r=void 0;if(t.forEach(e=>{const t=Number(e);n.isNumber(t)?void 0===i?i=t:void 0===r&&(r=t):s=s?[s,e].join(":"):e}),!s)throw new Error("Format for `--goto` should be: `FILE:LINE(:COLUMN)`");return{path:s,line:void 0!==i?i:void 0,column:void 0!==r?r:void 0!==i?1:void 0}}})),define(e[7],t([0,1,5,2]),(function(e,t,s,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.LRUCache=t.LinkedMap=t.Touch=t.ResourceMap=t.TernarySearchTree=t.UriIterator=t.PathIterator=t.StringIterator=t.setToString=t.mapToString=t.getOrSet=void 0,t.getOrSet=function(e,t,s){let i=e.get(t);return void 0===i&&(i=s,e.set(t,i)),i},t.mapToString=function(e){const t=[];return e.forEach((e,s)=>{t.push(`${s} => ${e}`)}),`Map(${e.size}) {${t.join(", ")}}`},t.setToString=function(e){const t=[];return e.forEach(e=>{t.push(e)}),`Set(${e.size}) {${t.join(", ")}}`}
;class r{constructor(){this._value="",this._pos=0}reset(e){return this._value=e,this._pos=0,this}next(){return this._pos+=1,this}hasNext(){return this._pos<this._value.length-1}cmp(e){return e.charCodeAt(0)-this._value.charCodeAt(this._pos)}value(){return this._value[this._pos]}}t.StringIterator=r;class n{constructor(e=!0,t=!0){this._splitOnBackslash=e,this._caseSensitive=t}reset(e){return this._value=e.replace(/\\$|\/$/,""),this._from=0,this._to=0,this.next()}hasNext(){return this._to<this._value.length}next(){this._from=this._to;let e=!0;for(;this._to<this._value.length;this._to++){const t=this._value.charCodeAt(this._to);if(47===t||this._splitOnBackslash&&92===t){if(!e)break;this._from++}else e=!1}return this}cmp(e){return this._caseSensitive?i.compareSubstring(e,this._value,0,e.length,this._from,this._to):i.compareSubstringIgnoreCase(e,this._value,0,e.length,this._from,this._to)}value(){return this._value.substring(this._from,this._to)}}var o;t.PathIterator=n,function(e){e[e.Scheme=1]="Scheme",
e[e.Authority=2]="Authority",e[e.Path=3]="Path",e[e.Query=4]="Query",e[e.Fragment=5]="Fragment"}(o||(o={}));class a{constructor(e){this._ignorePathCasing=e,this._states=[],this._stateIdx=0}reset(e){return this._value=e,this._states=[],this._value.scheme&&this._states.push(1),this._value.authority&&this._states.push(2),this._value.path&&(this._pathIterator=new n(!1,!this._ignorePathCasing),this._pathIterator.reset(e.path),this._pathIterator.value()&&this._states.push(3)),this._value.query&&this._states.push(4),this._value.fragment&&this._states.push(5),this._stateIdx=0,this}next(){return 3===this._states[this._stateIdx]&&this._pathIterator.hasNext()?this._pathIterator.next():this._stateIdx+=1,this}hasNext(){return 3===this._states[this._stateIdx]&&this._pathIterator.hasNext()||this._stateIdx<this._states.length-1}cmp(e){if(1===this._states[this._stateIdx])return i.compareIgnoreCase(e,this._value.scheme);if(2===this._states[this._stateIdx])return i.compareIgnoreCase(e,this._value.authority)
;if(3===this._states[this._stateIdx])return this._pathIterator.cmp(e);if(4===this._states[this._stateIdx])return i.compare(e,this._value.query);if(5===this._states[this._stateIdx])return i.compare(e,this._value.fragment);throw new Error}value(){if(1===this._states[this._stateIdx])return this._value.scheme;if(2===this._states[this._stateIdx])return this._value.authority;if(3===this._states[this._stateIdx])return this._pathIterator.value();if(4===this._states[this._stateIdx])return this._value.query;if(5===this._states[this._stateIdx])return this._value.fragment;throw new Error}}t.UriIterator=a;class h{isEmpty(){return!(this.left||this.mid||this.right||this.value)}}class u{constructor(e){this._iter=e}static forUris(e=!1){return new u(new a(e))}static forPaths(){return new u(new n)}static forStrings(){return new u(new r)}clear(){this._root=void 0}set(e,t){const s=this._iter.reset(e);let i;for(this._root||(this._root=new h,this._root.segment=s.value()),i=this._root;;){const e=s.cmp(i.segment)
;if(e>0)i.left||(i.left=new h,i.left.segment=s.value()),i=i.left;else if(e<0)i.right||(i.right=new h,i.right.segment=s.value()),i=i.right;else{if(!s.hasNext())break;s.next(),i.mid||(i.mid=new h,i.mid.segment=s.value()),i=i.mid}}const r=i.value;return i.value=t,i.key=e,r}get(e){const t=this._iter.reset(e);let s=this._root;for(;s;){const e=t.cmp(s.segment);if(e>0)s=s.left;else if(e<0)s=s.right;else{if(!t.hasNext())break;t.next(),s=s.mid}}return s?s.value:void 0}delete(e){return this._delete(e,!1)}deleteSuperstr(e){return this._delete(e,!0)}_delete(e,t){const s=this._iter.reset(e),i=[];let r=this._root;for(;r;){const e=s.cmp(r.segment);if(e>0)i.push([1,r]),r=r.left;else if(e<0)i.push([-1,r]),r=r.right;else{if(!s.hasNext()){for(r.value=void 0;i.length>0&&(r.isEmpty()||t);){let[e,t]=i.pop();switch(e){case 1:t.left=void 0;break;case 0:t.mid=void 0;break;case-1:t.right=void 0}r=t}break}s.next(),i.push([0,r]),r=r.mid}}}findSubstr(e){const t=this._iter.reset(e);let s=this._root,i=void 0;for(;s;){
const e=t.cmp(s.segment);if(e>0)s=s.left;else if(e<0)s=s.right;else{if(!t.hasNext())break;t.next(),i=s.value||i,s=s.mid}}return s&&s.value||i}findSuperstr(e){const t=this._iter.reset(e);let s=this._root;for(;s;){const e=t.cmp(s.segment);if(e>0)s=s.left;else if(e<0)s=s.right;else{if(!t.hasNext())return s.mid?this._values(s.mid):void 0;t.next(),s=s.mid}}}forEach(e){for(const[t,s]of this)e(s,t)}*[Symbol.iterator](){yield*this._entries(this._root)}*_values(e){for(const[,t]of this._entries(e))yield t}*_entries(e){e&&(yield*this._entries(e.left),e.value&&(yield[e.key,e.value]),yield*this._entries(e.mid),yield*this._entries(e.right))}}t.TernarySearchTree=u;class l{constructor(e,t){this[Symbol.toStringTag]="ResourceMap",e instanceof l?(this.map=new Map(e.map),this.toKey=null!=t?t:l.defaultToKey):(this.map=new Map,this.toKey=null!=e?e:l.defaultToKey)}set(e,t){return this.map.set(this.toKey(e),t),this}get(e){return this.map.get(this.toKey(e))}has(e){return this.map.has(this.toKey(e))}get size(){return this.map.size}
clear(){this.map.clear()}delete(e){return this.map.delete(this.toKey(e))}forEach(e,t){void 0!==t&&(e=e.bind(t));for(let[t,i]of this.map)e(i,s.URI.parse(t),this)}values(){return this.map.values()}*keys(){for(let e of this.map.keys())yield s.URI.parse(e)}*entries(){for(let e of this.map.entries())yield[s.URI.parse(e[0]),e[1]]}*[Symbol.iterator](){for(let e of this.map)yield[s.URI.parse(e[0]),e[1]]}}t.ResourceMap=l,l.defaultToKey=e=>e.toString(),function(e){e[e.None=0]="None",e[e.AsOld=1]="AsOld",e[e.AsNew=2]="AsNew"}(t.Touch||(t.Touch={}));class c{constructor(){this[Symbol.toStringTag]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){var e;return null===(e=this._head)||void 0===e?void 0:e.value}get last(){var e;return null===(e=this._tail)||void 0===e?void 0:e.value}has(e){return this._map.has(e)}
get(e,t=0){const s=this._map.get(e);if(s)return 0!==t&&this.touch(s,t),s.value}set(e,t,s=0){let i=this._map.get(e);if(i)i.value=t,0!==s&&this.touch(i,s);else{switch(i={key:e,value:t,next:void 0,previous:void 0},s){case 0:this.addItemLast(i);break;case 1:this.addItemFirst(i);break;case 2:default:this.addItemLast(i)}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){const t=this._map.get(e);if(t)return this._map.delete(e),this.removeItem(t),this._size--,t.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");const e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,t){const s=this._state;let i=this._head;for(;i;){if(t?e.bind(t)(i.value,i.key,this):e(i.value,i.key,this),this._state!==s)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){const e=this,t=this._state;let s=this._head;const i={[Symbol.iterator]:()=>i,next(){
if(e._state!==t)throw new Error("LinkedMap got modified during iteration.");if(s){const e={value:s.key,done:!1};return s=s.next,e}return{value:void 0,done:!0}}};return i}values(){const e=this,t=this._state;let s=this._head;const i={[Symbol.iterator]:()=>i,next(){if(e._state!==t)throw new Error("LinkedMap got modified during iteration.");if(s){const e={value:s.value,done:!1};return s=s.next,e}return{value:void 0,done:!0}}};return i}entries(){const e=this,t=this._state;let s=this._head;const i={[Symbol.iterator]:()=>i,next(){if(e._state!==t)throw new Error("LinkedMap got modified during iteration.");if(s){const e={value:[s.key,s.value],done:!1};return s=s.next,e}return{value:void 0,done:!0}}};return i}[Symbol.iterator](){return this.entries()}trimOld(e){if(e>=this.size)return;if(0===e)return void this.clear();let t=this._head,s=this.size;for(;t&&s>e;)this._map.delete(t.key),t=t.next,s--;this._head=t,this._size=s,t&&(t.previous=void 0),this._state++}addItemFirst(e){if(this._head||this._tail){
if(!this._head)throw new Error("Invalid list");e.next=this._head,this._head.previous=e}else this._tail=e;this._head=e,this._state++}addItemLast(e){if(this._head||this._tail){if(!this._tail)throw new Error("Invalid list");e.previous=this._tail,this._tail.next=e}else this._head=e;this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{const t=e.next,s=e.previous;if(!t||!s)throw new Error("Invalid list");t.previous=s,s.next=t}e.next=void 0,e.previous=void 0,this._state++}touch(e,t){if(!this._head||!this._tail)throw new Error("Invalid list");if(1===t||2===t)if(1===t){if(e===this._head)return;const t=e.next,s=e.previous;e===this._tail?(s.next=void 0,this._tail=s):(t.previous=s,s.next=t),e.previous=void 0,e.next=this._head,
this._head.previous=e,this._head=e,this._state++}else if(2===t){if(e===this._tail)return;const t=e.next,s=e.previous;e===this._head?(t.previous=void 0,this._head=t):(t.previous=s,s.next=t),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}toJSON(){const e=[];return this.forEach((t,s)=>{e.push([s,t])}),e}fromJSON(e){this.clear();for(const[t,s]of e)this.set(t,s)}}t.LinkedMap=c;t.LRUCache=class extends c{constructor(e,t=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,t),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,t=2){return super.get(e,t)}peek(e){return super.get(e,0)}set(e,t){return super.set(e,t,2),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}}})),define(e[10],t([0,1,2,3,6,7,9]),(function(e,t,s,i,r,n,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),
t.getPathTerms=t.getBasenameTerms=t.isRelativePattern=t.hasSiblingFn=t.hasSiblingPromiseFn=t.parse=t.match=t.splitGlobAware=t.getEmptyExpression=void 0,t.getEmptyExpression=function(){return Object.create(null)};const a="**",h="/",u="[/\\\\]",l="[^/\\\\]",c=/\//g;function d(e){switch(e){case 0:return"";case 1:return`${l}*?`;default:return`(?:${u}|${l}+${u}|${u}${l}+)*?`}}function m(e,t){if(!e)return[];const s=[];let i=!1,r=!1,n="";for(const o of e){switch(o){case t:if(!i&&!r){s.push(n),n="";continue}break;case"{":i=!0;break;case"}":i=!1;break;case"[":r=!0;break;case"]":r=!1}n+=o}return n&&s.push(n),s}t.splitGlobAware=m;const p=/^\*\*\/\*\.[\w\.-]+$/,f=/^\*\*\/([\w\.-]+)\/?$/,g=/^{\*\*\/[\*\.]?[\w\.-]+\/?(,\*\*\/[\*\.]?[\w\.-]+\/?)*}$/,_=/^{\*\*\/[\*\.]?[\w\.-]+(\/(\*\*)?)?(,\*\*\/[\*\.]?[\w\.-]+(\/(\*\*)?)?)*}$/,v=/^\*\*((\/[\w\.-]+)+)\/?$/,x=/^([\w\.-]+(\/[\w\.-]+)*)\/?$/,P=new n.LRUCache(1e4),b=function(){return!1},y=function(){return null};function w(e,t){if(!e)return y;let i
;const r=`${i=(i="string"!=typeof e?e.pattern:e).trim()}_${!!t.trimForExclusions}`;let n,o=P.get(r);if(o)return T(o,e);if(p.test(i)){const e=i.substr(4);o=function(t,s){return"string"==typeof t&&t.endsWith(e)?i:null}}else o=(n=f.exec(S(i,t)))?function(e,t){const s=`/${e}`,i=`\\${e}`,r=function(r,n){return"string"!=typeof r?null:n?n===e?t:null:r===e||r.endsWith(s)||r.endsWith(i)?t:null},n=[e];return r.basenames=n,r.patterns=[t],r.allBasenames=n,r}(n[1],i):(t.trimForExclusions?_:g).test(i)?function(e,t){const s=R(e.slice(1,-1).split(",").map(e=>w(e,t)).filter(e=>e!==y),e),i=s.length;if(!i)return y;if(1===i)return s[0];const r=function(t,i){for(let r=0,n=s.length;r<n;r++)if(s[r](t,i))return e;return null},n=s.find(e=>!!e.allBasenames);n&&(r.allBasenames=n.allBasenames);const o=s.reduce((e,t)=>t.allPaths?e.concat(t.allPaths):e,[]);o.length&&(r.allPaths=o);return r}(i,t):(n=v.exec(S(i,t)))?k(n[1].substr(1),i,!0):(n=x.exec(S(i,t)))?k(n[1],i,!1):function(e){try{const t=new RegExp(`^${function e(t){if(!t)return""
;let i="";const r=m(t,h);if(r.every(e=>e===a))i=".*";else{let t=!1;r.forEach((n,o)=>{if(n===a)return void(t||(i+=d(2),t=!0));let c=!1,p="",f=!1,g="";for(const t of n)if("}"!==t&&c)p+=t;else if(!f||"]"===t&&g)switch(t){case"{":c=!0;continue;case"[":f=!0;continue;case"}":const r=`(?:${m(p,",").map(t=>e(t)).join("|")})`;i+=r,c=!1,p="";break;case"]":i+="["+g+"]",f=!1,g="";break;case"?":i+=l;continue;case"*":i+=d(1);continue;default:i+=s.escapeRegExpCharacters(t)}else{let e;g+=e="-"===t?t:"^"!==t&&"!"!==t||g?t===h?"":s.escapeRegExpCharacters(t):"^"}o<r.length-1&&(r[o+1]!==a||o+2<r.length)&&(i+=u),t=!1})}return i}(e)}$`);return function(s){return t.lastIndex=0,"string"==typeof s&&t.test(s)?e:null}}catch(e){return y}}(i);return P.set(r,o),T(o,e)}function T(e,t){return"string"==typeof t?e:function(s,n){return i.isEqualOrParent(s,t.base)?e(r.relative(t.base,s),n):null}}function S(e,t){return t.trimForExclusions&&e.endsWith("/**")?e.substr(0,e.length-2):e}function k(e,t,s){
const i=r.sep!==r.posix.sep?e.replace(c,r.sep):e,n=r.sep+i,o=s?function(e,s){return"string"!=typeof e||e!==i&&!e.endsWith(n)?null:t}:function(e,s){return"string"==typeof e&&e===i?t:null};return o.allPaths=[(s?"*/":"./")+e],o}function I(e,t={}){if(!e)return b;if("string"==typeof e||E(e)){const s=w(e,t);if(s===y)return b;const i=function(e,t){return!!s(e,t)};return s.allBasenames&&(i.allBasenames=s.allBasenames),s.allPaths&&(i.allPaths=s.allPaths),i}return function(e,t){const s=R(Object.getOwnPropertyNames(e).map(s=>(function(e,t,s){if(!1===t)return y;const i=w(e,s);if(i===y)return y;if("boolean"==typeof t)return i;if(t){const s=t.when;if("string"==typeof s){const t=(t,r,n,a)=>{if(!a||!i(t,r))return null;const h=a(s.replace("$(basename)",n));return o.isThenable(h)?h.then(t=>t?e:null):h?e:null};return t.requiresSiblings=!0,t}}return i})(s,e[s],t)).filter(e=>e!==y)),i=s.length;if(!i)return y;if(!s.some(e=>!!e.requiresSiblings)){if(1===i)return s[0];const e=function(e,t){for(let i=0,r=s.length;i<r;i++){
const r=s[i](e,t);if(r)return r}return null},t=s.find(e=>!!e.allBasenames);t&&(e.allBasenames=t.allBasenames);const r=s.reduce((e,t)=>t.allPaths?e.concat(t.allPaths):e,[]);return r.length&&(e.allPaths=r),e}const n=function(e,t,i){let n=void 0;for(let o=0,a=s.length;o<a;o++){const a=s[o];a.requiresSiblings&&i&&(t||(t=r.basename(e)),n||(n=t.substr(0,t.length-r.extname(e).length)));const h=a(e,t,n,i);if(h)return h}return null},a=s.find(e=>!!e.allBasenames);a&&(n.allBasenames=a.allBasenames);const h=s.reduce((e,t)=>t.allPaths?e.concat(t.allPaths):e,[]);h.length&&(n.allPaths=h);return n}(e,t)}function C(e){const t={};for(const s of e)t[s]=!0;return t}function E(e){const t=e;return t&&"string"==typeof t.base&&"string"==typeof t.pattern}function R(e,t){const s=e.filter(e=>!!e.basenames);if(s.length<2)return e;const i=s.reduce((e,t)=>{const s=t.basenames;return s?e.concat(s):e},[]);let r;if(t){r=[];for(let e=0,s=i.length;e<s;e++)r.push(t)}else r=s.reduce((e,t)=>{const s=t.patterns;return s?e.concat(s):e},[])
;const n=function(e,t){if("string"!=typeof e)return null;if(!t){let s;for(s=e.length;s>0;s--){const t=e.charCodeAt(s-1);if(47===t||92===t)break}t=e.substr(s)}const s=i.indexOf(t);return-1!==s?r[s]:null};n.basenames=i,n.patterns=r,n.allBasenames=i;const o=e.filter(e=>!e.basenames);return o.push(n),o}t.match=function(e,t,s){return!(!e||"string"!=typeof t)&&I(e)(t,void 0,s)},t.parse=I,t.hasSiblingPromiseFn=function(e){if(!e)return;let t;return s=>(t||(t=(e()||Promise.resolve([])).then(e=>e?C(e):{})),t.then(e=>!!e[s]))},t.hasSiblingFn=function(e){if(!e)return;let t;return s=>{if(!t){const s=e();t=s?C(s):{}}return!!t[s]}},t.isRelativePattern=E,t.getBasenameTerms=function(e){return e.allBasenames||[]},t.getPathTerms=function(e){return e.allPaths||[]}})),define(e[8],t([0,1,5,4]),(function(e,t,s,i){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.FileAccess=t.RemoteAuthorities=t.Schemas=void 0,function(e){e.inMemory="inmemory",e.vscode="vscode",e.internal="private",e.walkThrough="walkThrough",
e.walkThroughSnippet="walkThroughSnippet",e.http="http",e.https="https",e.file="file",e.mailto="mailto",e.untitled="untitled",e.data="data",e.command="command",e.vscodeRemote="vscode-remote",e.vscodeRemoteResource="vscode-remote-resource",e.userData="vscode-userdata",e.vscodeCustomEditor="vscode-custom-editor",e.vscodeNotebook="vscode-notebook",e.vscodeNotebookCell="vscode-notebook-cell",e.vscodeSettings="vscode-settings",e.webviewPanel="webview-panel",e.vscodeWebview="vscode-webview",e.vscodeWebviewResource="vscode-webview-resource",e.extension="extension"}(r=t.Schemas||(t.Schemas={}));t.RemoteAuthorities=new class{constructor(){this._hosts=Object.create(null),this._ports=Object.create(null),this._connectionTokens=Object.create(null),this._preferredWebSchema="http",this._delegate=null}setPreferredWebSchema(e){this._preferredWebSchema=e}setDelegate(e){this._delegate=e}set(e,t,s){this._hosts[e]=t,this._ports[e]=s}setConnectionToken(e,t){this._connectionTokens[e]=t}rewrite(e){
if(this._delegate)return this._delegate(e);const t=e.authority;let n=this._hosts[t];n&&-1!==n.indexOf(":")&&(n=`[${n}]`);const o=this._ports[t],a=this._connectionTokens[t];let h=`path=${encodeURIComponent(e.path)}`;return"string"==typeof a&&(h+=`&tkn=${encodeURIComponent(a)}`),s.URI.from({scheme:i.isWeb?this._preferredWebSchema:r.vscodeRemoteResource,authority:`${n}:${o}`,path:"/vscode-remote-resource",query:h})}};t.FileAccess=new class{asBrowserUri(e,s){const i=this.toUri(e,s);return i.scheme===r.vscodeRemote?t.RemoteAuthorities.rewrite(i):i}asFileUri(e,t){return this.toUri(e,t)}toUri(e,t){return s.URI.isUri(e)?e:s.URI.parse(t.toUrl(e))}}})),define(e[11],t([0,1,3,6,5,2,8,4,10,7]),(function(e,t,s,i,r,n,o,a,h,u){"use strict";function l(e){return r.uriToFsPath(e,!0)}Object.defineProperty(t,"__esModule",{value:!0}),
t.toLocalResource=t.ResourceGlobMatcher=t.DataUri=t.distinctParents=t.addTrailingPathSeparator=t.removeTrailingPathSeparator=t.hasTrailingPathSeparator=t.isEqualAuthority=t.isAbsolutePath=t.resolvePath=t.relativePath=t.normalizePath=t.joinPath=t.dirname=t.extname=t.basename=t.basenameOrAuthority=t.getComparisonKey=t.isEqualOrParent=t.isEqual=t.extUriIgnorePathCase=t.extUriBiasedIgnorePathCase=t.extUri=t.ExtUri=t.originalFSPath=void 0,t.originalFSPath=l;class c{constructor(e){this._ignorePathCasing=e}compare(e,t,s=!1){return e===t?0:n.compare(this.getComparisonKey(e,s),this.getComparisonKey(t,s))}isEqual(e,t,s=!1){return e===t||!(!e||!t)&&this.getComparisonKey(e,s)===this.getComparisonKey(t,s)}getComparisonKey(e,t=!1){return e.with({path:this._ignorePathCasing(e)?e.path.toLowerCase():void 0,fragment:t?null:void 0}).toString()}isEqualOrParent(e,i,r=!1){if(e.scheme===i.scheme){
if(e.scheme===o.Schemas.file)return s.isEqualOrParent(l(e),l(i),this._ignorePathCasing(e))&&e.query===i.query&&(r||e.fragment===i.fragment);if(t.isEqualAuthority(e.authority,i.authority))return s.isEqualOrParent(e.path,i.path,this._ignorePathCasing(e),"/")&&e.query===i.query&&(r||e.fragment===i.fragment)}return!1}joinPath(e,...t){return r.URI.joinPath(e,...t)}basenameOrAuthority(e){return t.basename(e)||e.authority}basename(e){return i.posix.basename(e.path)}extname(e){return i.posix.extname(e.path)}dirname(e){if(0===e.path.length)return e;let t;return e.scheme===o.Schemas.file?t=r.URI.file(i.dirname(l(e))).path:(t=i.posix.dirname(e.path),e.authority&&t.length&&47!==t.charCodeAt(0)&&(console.error(`dirname("${e.toString})) resulted in a relative path`),t="/")),e.with({path:t})}normalizePath(e){if(!e.path.length)return e;let t;return t=e.scheme===o.Schemas.file?r.URI.file(i.normalize(l(e))).path:i.posix.normalize(e.path),e.with({path:t})}relativePath(e,r){
if(e.scheme!==r.scheme||!t.isEqualAuthority(e.authority,r.authority))return;if(e.scheme===o.Schemas.file){const t=i.relative(l(e),l(r));return a.isWindows?s.toSlashes(t):t}let n=e.path||"/",h=r.path||"/";if(this._ignorePathCasing(e)){let e=0;for(const t=Math.min(n.length,h.length);e<t&&(n.charCodeAt(e)===h.charCodeAt(e)||n.charAt(e).toLowerCase()===h.charAt(e).toLowerCase());e++);n=h.substr(0,e)+n.substr(e)}return i.posix.relative(n,h)}resolvePath(e,t){if(e.scheme===o.Schemas.file){const s=r.URI.file(i.resolve(l(e),t));return e.with({authority:s.authority,path:s.path})}return-1===t.indexOf("/")&&(t=s.toSlashes(t),/^[a-zA-Z]:(\/|$)/.test(t)&&(t="/"+t)),e.with({path:i.posix.resolve(e.path,t)})}isAbsolutePath(e){return!!e.path&&"/"===e.path[0]}isEqualAuthority(e,t){return e===t||n.equalsIgnoreCase(e,t)}hasTrailingPathSeparator(e,t=i.sep){if(e.scheme===o.Schemas.file){const i=l(e);return i.length>s.getRoot(i).length&&i[i.length-1]===t}{const t=e.path
;return t.length>1&&47===t.charCodeAt(t.length-1)&&!/^[a-zA-Z]:(\/$|\\$)/.test(e.fsPath)}}removeTrailingPathSeparator(e,s=i.sep){return t.hasTrailingPathSeparator(e,s)?e.with({path:e.path.substr(0,e.path.length-1)}):e}addTrailingPathSeparator(e,r=i.sep){let n=!1;if(e.scheme===o.Schemas.file){const t=l(e);n=void 0!==t&&t.length===s.getRoot(t).length&&t[t.length-1]===r}else{r="/";const t=e.path;n=1===t.length&&47===t.charCodeAt(t.length-1)}return n||t.hasTrailingPathSeparator(e,r)?e:e.with({path:e.path+"/"})}}t.ExtUri=c,t.extUri=new c(()=>!1),t.extUriBiasedIgnorePathCase=new c(e=>e.scheme!==o.Schemas.file||!a.isLinux),t.extUriIgnorePathCase=new c(e=>!0),t.isEqual=t.extUri.isEqual.bind(t.extUri),t.isEqualOrParent=t.extUri.isEqualOrParent.bind(t.extUri),t.getComparisonKey=t.extUri.getComparisonKey.bind(t.extUri),t.basenameOrAuthority=t.extUri.basenameOrAuthority.bind(t.extUri),t.basename=t.extUri.basename.bind(t.extUri),t.extname=t.extUri.extname.bind(t.extUri),t.dirname=t.extUri.dirname.bind(t.extUri),
t.joinPath=t.extUri.joinPath.bind(t.extUri),t.normalizePath=t.extUri.normalizePath.bind(t.extUri),t.relativePath=t.extUri.relativePath.bind(t.extUri),t.resolvePath=t.extUri.resolvePath.bind(t.extUri),t.isAbsolutePath=t.extUri.isAbsolutePath.bind(t.extUri),t.isEqualAuthority=t.extUri.isEqualAuthority.bind(t.extUri),t.hasTrailingPathSeparator=t.extUri.hasTrailingPathSeparator.bind(t.extUri),t.removeTrailingPathSeparator=t.extUri.removeTrailingPathSeparator.bind(t.extUri),t.addTrailingPathSeparator=t.extUri.addTrailingPathSeparator.bind(t.extUri),t.distinctParents=function(e,s){const i=[];for(let r=0;r<e.length;r++){const n=s(e[r]);e.some((e,i)=>i!==r&&t.isEqualOrParent(n,s(e)))||i.push(e[r])}return i},function(e){e.META_DATA_LABEL="label",e.META_DATA_DESCRIPTION="description",e.META_DATA_SIZE="size",e.META_DATA_MIME="mime",e.parseMetaData=function(t){const s=new Map;t.path.substring(t.path.indexOf(";")+1,t.path.lastIndexOf(";")).split(";").forEach(e=>{const[t,i]=e.split(":");t&&i&&s.set(t,i)})
;const i=t.path.substring(0,t.path.indexOf(";"));return i&&s.set(e.META_DATA_MIME,i),s}}(t.DataUri||(t.DataUri={}));t.ResourceGlobMatcher=class{constructor(e,t){this.expressionsByRoot=u.TernarySearchTree.forUris(),this.globalExpression=h.parse(e);for(const e of t)this.expressionsByRoot.set(e.root,{root:e.root,expression:h.parse(e.expression)})}matches(e){const s=this.expressionsByRoot.findSubstr(e);if(s){const i=t.relativePath(s.root,e);if(i&&s.expression(i))return!0}return!!this.globalExpression(e.path)}},t.toLocalResource=function(e,t,s){if(t){let r=e.path;return r&&r[0]!==i.posix.sep&&(r=i.posix.sep+r),e.with({scheme:s,authority:t,path:r})}return e.with({scheme:s})}})),define(e[17],t([0,1,5,3,11,2,18,4,8]),(function(e,t,s,i,r,n,o,a,h){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.create=t.OutputLinkComputer=void 0;class u{constructor(e,t){this.ctx=e,this.patterns=new Map,this.computePatterns(t)}computePatterns(e){
const t=e.workspaceFolders.sort((e,t)=>t.length-e.length).map(e=>s.URI.parse(e));for(const e of t){const t=u.createPatterns(e);this.patterns.set(e,t)}}getModel(e){return this.ctx.getMirrorModels().find(t=>t.uri.toString()===e)}computeLinks(e){const t=this.getModel(e);if(!t)return[];const s=[],i=t.getValue().split(/\r\n|\r|\n/);for(const[e,t]of this.patterns){const n={toResource:t=>"string"==typeof t?r.joinPath(e,t):null};for(let e=0,r=i.length;e<r;e++)s.push(...u.detectLinks(i[e],e+1,t,n))}return s}static createPatterns(e){const t=[],s=e.scheme===h.Schemas.file?e.fsPath:e.path,r=[s];a.isWindows&&e.scheme===h.Schemas.file&&r.push(i.toSlashes(s));for(const e of r){const s='[^\\s\\(\\):<>"]',i=`${`(?:${s}| ${s})`}+\\.${s}+`,r=`${s}+`;t.push(new RegExp(n.escapeRegExpCharacters(e)+`(${i}) on line ((\\d+)(, column (\\d+))?)`,"gi")),t.push(new RegExp(n.escapeRegExpCharacters(e)+`(${i}):line ((\\d+)(, column (\\d+))?)`,"gi")),t.push(new RegExp(n.escapeRegExpCharacters(e)+`(${i})(\\s?\\((\\d+)(,(\\d+))?)\\)`,"gi")),
t.push(new RegExp(n.escapeRegExpCharacters(e)+`(${r})(:(\\d+))?(:(\\d+))?`,"gi"))}return t}static detectLinks(e,t,s,i){const r=[];return s.forEach(s=>{let a;s.lastIndex=0;let h=0;for(;null!==(a=s.exec(e));){const s=n.rtrim(a[1],".").replace(/\\/g,"/");let u;try{const e=i.toResource(s);e&&(u=e.toString())}catch(e){continue}if(a[3]){const e=a[3];if(a[5]){const t=a[5];u=n.format("{0}#{1},{2}",u,e,t)}else u=n.format("{0}#{1}",u,e)}const l=n.rtrim(a[0],"."),c=e.indexOf(l,h);h=c+l.length;const d={startColumn:c+1,startLineNumber:t,endColumn:c+1+l.length,endLineNumber:t};if(r.some(e=>o.Range.areIntersectingOrTouching(e.range,d)))return;r.push({range:d,url:u})}}),r}}t.OutputLinkComputer=u,t.create=function(e,t){return new u(e,t)}}))}).call(this);
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/fcac248b077b55bae4ba5bab613fd6e9156c2f0c/core/vs/workbench/contrib/output/common/outputLinkComputer.js.map
