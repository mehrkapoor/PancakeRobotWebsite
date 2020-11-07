/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!function(){"use strict";const e=function(){let e=!1;return()=>{e||(e=!0)}}(),n=require("electron").ipcRenderer;let o=!1;const t={onElectron:!0,postMessage:(e,o)=>{n.sendToHost(e,o)},onMessage:(e,o)=>{n.on(e,o)},focusIframeOnCreate:!0,onIframeLoaded:e=>{e.contentWindow.onbeforeunload=()=>o?(t.postMessage("do-reload"),!1):(console.log("prevented webview navigation"),!1);let n=!1;e.contentWindow.addEventListener("mousedown",()=>{n=!0});const s=e=>{n||t.postMessage("synthetic-mouse-event",{type:e.type,screenX:e.screenX,screenY:e.screenY,clientX:e.clientX,clientY:e.clientY})};e.contentWindow.addEventListener("mouseup",e=>{s(e),n=!1}),e.contentWindow.addEventListener("mousemove",s)},rewriteCSP:e=>e.replace(/vscode-resource:(?=(\s|;|$))/g,"vscode-webview-resource:")};t.onMessage("devtools-opened",()=>{o=!0}),document.addEventListener("DOMContentLoaded",()=>{e(),window.onmessage=e=>{n.sendToHost(e.data.command,e.data.data)}}),require("../../browser/pre/main")(t)}();
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/fcac248b077b55bae4ba5bab613fd6e9156c2f0c/core/vs/workbench/contrib/webview/electron-browser/pre/electron-index.js.map
