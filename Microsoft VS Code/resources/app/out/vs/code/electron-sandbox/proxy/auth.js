/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";const{ipcRenderer:ipcRenderer}=window.vscode;function promptForCredentials(e){return new Promise((t,n)=>{const o=document.getElementById("title"),r=document.getElementById("username"),s=document.getElementById("password"),d=document.getElementById("form"),c=document.getElementById("cancel"),a=document.getElementById("message");function u(){return t({username:r.value,password:s.value}),!1}function i(){return t({username:"",password:""}),!1}d.addEventListener("submit",u),c.addEventListener("click",i),document.body.addEventListener("keydown",(function(e){switch(e.keyCode){case 27:return e.preventDefault(),e.stopPropagation(),i();case 13:return e.preventDefault(),e.stopPropagation(),u()}})),o.textContent=e.title,a.textContent=e.message,r.focus()})}ipcRenderer.on("vscode:openProxyAuthDialog",async(e,t)=>{const n=await promptForCredentials(t);ipcRenderer.send("vscode:proxyAuthResponse",n)});
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/fcac248b077b55bae4ba5bab613fd6e9156c2f0c/core/vs/code/electron-sandbox/proxy/auth.js.map
