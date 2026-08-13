const g={minWidth:30,minHeight:30,maxWidth:4e3,maxHeight:4e3,snapThreshold:6,maxHistory:40,toastDuration:2200,handleSize:11},L=[{label:"Thumbnail",width:150,icon:"150"},{label:"Small",width:320,icon:"S"},{label:"Medium",width:640,icon:"M"},{label:"Large",width:960,icon:"L"},{label:"X-Large",width:1200,icon:"XL"},{label:"25% Width",pct:25,icon:"¼"},{label:"33% Width",pct:33,icon:"⅓"},{label:"50% Width",pct:50,icon:"½"},{label:"75% Width",pct:75,icon:"¾"},{label:"100% Width",pct:100,icon:"■"}],R=[{label:"None",value:"none",icon:"○"},{label:"Subtle",value:"0 1px 3px rgba(0,0,0,0.12)",icon:"◔"},{label:"Medium",value:"0 4px 12px rgba(0,0,0,0.18)",icon:"◑"},{label:"Strong",value:"0 8px 30px rgba(0,0,0,0.28)",icon:"◕"},{label:"Dreamy",value:"0 12px 40px rgba(99,102,241,0.25)",icon:"●"},{label:"Hard",value:"6px 6px 0px rgba(0,0,0,0.25)",icon:"◧"}],W=[{label:"None",value:"0",icon:"▢"},{label:"Small",value:"4px",icon:"▫"},{label:"Medium",value:"8px",icon:"◻"},{label:"Large",value:"16px",icon:"○"},{label:"Round",value:"50%",icon:"●"}],T=[{label:"None",value:"none",icon:"—"},{label:"Grayscale",value:"grayscale(100%)",icon:"◐"},{label:"Sepia",value:"sepia(80%)",icon:"◩"},{label:"Blur",value:"blur(2px)",icon:"◌"},{label:"Brighten",value:"brightness(130%)",icon:"☀"},{label:"Contrast",value:"contrast(140%)",icon:"◑"},{label:"Saturate",value:"saturate(180%)",icon:"◈"},{label:"Vintage",value:"sepia(40%) contrast(110%) brightness(90%)",icon:"◫"}],M={ArrowUp:{dw:0,dh:-1,desc:"Shrink height by 1px"},ArrowDown:{dw:0,dh:1,desc:"Grow height by 1px"},ArrowLeft:{dw:-1,dh:0,desc:"Shrink width by 1px"},ArrowRight:{dw:1,dh:0,desc:"Grow width by 1px"}},A=10;class D{constructor(t=g.maxHistory){this._stack=[],this._index=-1,this._limit=t}push(t){this._stack=this._stack.slice(0,this._index+1),this._stack.push(JSON.parse(JSON.stringify(t))),this._stack.length>this._limit?this._stack.shift():this._index++}undo(){return this._index<=0?null:(this._index--,JSON.parse(JSON.stringify(this._stack[this._index])))}redo(){return this._index>=this._stack.length-1?null:(this._index++,JSON.parse(JSON.stringify(this._stack[this._index])))}get canUndo(){return this._index>0}get canRedo(){return this._index<this._stack.length-1}clear(){this._stack=[],this._index=-1}}class N{constructor(){this._container=null}_ensureContainer(){this._container&&document.body.contains(this._container)||(this._container=document.createElement("div"),this._container.id="image-resize-toast-container",this._container.style.cssText=`
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      display: flex;
      flex-direction: column-reverse;
      gap: 8px;
      pointer-events: none;
    `,document.body.appendChild(this._container))}show(t,e="info"){this._ensureContainer();const i={info:{bg:"#6366f1",icon:"ℹ"},success:{bg:"#22c55e",icon:"✓"},warning:{bg:"#eab308",icon:"⚠"},error:{bg:"#ef4444",icon:"✕"}},o=i[e]||i.info,n=document.createElement("div");n.style.cssText=`
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      background: ${o.bg};
      color: #fff;
      border-radius: 8px;
      font-size: 13px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      box-shadow: 0 8px 30px rgba(0,0,0,0.25);
      pointer-events: auto;
      opacity: 0;
      transform: translateY(16px) scale(0.95);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      max-width: 340px;
    `,n.innerHTML=`<span style="font-size:16px;line-height:1">${o.icon}</span><span>${t}</span>`,n.addEventListener("click",()=>this._dismiss(n)),this._container.appendChild(n),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateY(0) scale(1)"}),setTimeout(()=>this._dismiss(n),g.toastDuration)}_dismiss(t){!t||!t.parentNode||(t.style.opacity="0",t.style.transform="translateY(16px) scale(0.95)",setTimeout(()=>t.remove(),300))}}const b=new N;class P{constructor(){this._guides=[]}getSnapTargets(t){const e=t.width;return[{value:Math.round(e*.25),label:"25%"},{value:Math.round(e*.33),label:"33%"},{value:Math.round(e*.5),label:"50%"},{value:Math.round(e*.66),label:"66%"},{value:Math.round(e*.75),label:"75%"},{value:Math.round(e),label:"100%"}]}snap(t,e,i=g.snapThreshold){for(const o of e)if(Math.abs(t-o.value)<=i)return{snapped:!0,value:o.value,label:o.label};return{snapped:!1,value:t,label:null}}showGuide(t,e,i){this.clearGuides();const o=document.createElement("div");if(o.className="ir-snap-guide",o.style.cssText=`
      position: fixed;
      top: ${e.top}px;
      left: ${e.left+t}px;
      width: 1px;
      height: ${e.height}px;
      background: #6366f1;
      opacity: 0.6;
      z-index: 10005;
      pointer-events: none;
      transition: opacity 0.15s;
    `,i){const n=document.createElement("span");n.style.cssText=`
        position: absolute;
        top: -22px;
        left: 50%;
        transform: translateX(-50%);
        background: #6366f1;
        color: #fff;
        padding: 2px 7px;
        border-radius: 4px;
        font-size: 10px;
        font-family: monospace;
        white-space: nowrap;
      `,n.textContent=i,o.appendChild(n)}document.body.appendChild(o),this._guides.push(o)}clearGuides(){this._guides.forEach(t=>t.remove()),this._guides=[]}}function z(f,t,e){return Math.min(e,Math.max(t,f))}function $(f,t){let e;return(...i)=>{clearTimeout(e),e=setTimeout(()=>f.apply(null,i),t)}}function C(f,t){let e=0;return(...i)=>{const o=Date.now();o-e>=t&&(e=o,f.apply(null,i))}}function B(f){return f<1024?f+" B":f<1048576?(f/1024).toFixed(1)+" KB":(f/1048576).toFixed(1)+" MB"}function O(f){return!f||f.length>1e3?"":f.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}class F{constructor(){this.initialized=!1,this.activeImage=null,this.activeHandle=null,this.startX=0,this.startY=0,this.startWidth=0,this.startHeight=0,this.aspectRatio=1,this.lockAspect=!0,this.resizeOverlay=null,this.editor=null,this.ghostOutline=null,this.contextMenu=null,this.history=new D,this.snapGuides=new P,this._imageStates=new WeakMap,this._boundOnMouseMove=C(this._onMouseMove.bind(this),16),this._boundOnMouseUp=this._onMouseUp.bind(this),this._boundOnTouchMove=C(this._onTouchMove.bind(this),16),this._boundOnTouchEnd=this._onTouchEnd.bind(this),this._boundOnKeyDown=this._onKeyDown.bind(this),this._boundOnScroll=$(this._onScrollOrResize.bind(this),60),this._boundOnResize=$(this._onScrollOrResize.bind(this),100),this._mutationObserver=null,this._hoverTimer=null}initialize(t={}){this.initialized||(this.editor=t.editor||window.editor,this._injectStyles(),this._setupEventListeners(),this._setupMutationObserver(),this.initialized=!0,console.log("[ImageResize v2] ✓ Feature initialized"))}_injectStyles(){if(document.getElementById("image-resize-styles-v2")?.remove(),document.getElementById("image-resize-styles-v3"))return;const t=document.createElement("style");t.id="image-resize-styles-v3",t.textContent=`
      /* ── Base Image Behaviour ── */
      .markdown-body img[data-loaded="true"] {
        cursor: pointer;
        transition: outline 0.2s ease, filter 0.3s ease,
                    border-radius 0.3s ease, box-shadow 0.3s ease,
                    opacity 0.3s ease, transform 0.3s ease;
      }

      .markdown-body img[data-loaded="true"]:hover {
        outline: 2px solid rgba(99, 102, 241, 0.5);
        outline-offset: 3px;
      }

      .markdown-body img.image-resizing {
        outline: none !important;
      }

      /* ── Marching-ants selection animation ── */
      @keyframes ir-marching-ants {
        0%   { stroke-dashoffset: 0;  }
        100% { stroke-dashoffset: -20; }
      }

      /* ── Resize Overlay ── */
      .ir-overlay {
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        border-radius: 2px;
      }

      .ir-overlay svg.ir-selection-border {
        position: absolute;
        inset: -2px;
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        pointer-events: none;
      }

      .ir-overlay svg.ir-selection-border rect {
        fill: none;
        stroke: #6366f1;
        stroke-width: 2;
        stroke-dasharray: 6 4;
        animation: ir-marching-ants 0.6s linear infinite;
      }

      /* ── Ghost Outline ── */
      .ir-ghost-outline {
        position: fixed;
        border: 1px dashed rgba(99,102,241,0.35);
        background: rgba(99,102,241,0.04);
        pointer-events: none;
        z-index: 9999;
        border-radius: 2px;
        transition: none;
      }

      /* ── Resize Handles ── */
      .ir-handle {
        position: absolute;
        width: ${g.handleSize}px;
        height: ${g.handleSize}px;
        background: #fff;
        border: 2.5px solid #6366f1;
        border-radius: 50%;
        pointer-events: auto;
        z-index: 10001;
        box-shadow: 0 1px 5px rgba(0,0,0,0.22);
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }

      .ir-handle:hover,
      .ir-handle:active {
        transform: scale(1.35);
        box-shadow: 0 0 0 3px rgba(99,102,241,0.25), 0 2px 8px rgba(0,0,0,0.2);
      }

      .ir-handle.nw { top: -6px;  left: -6px;  cursor: nw-resize; }
      .ir-handle.ne { top: -6px;  right: -6px; cursor: ne-resize; }
      .ir-handle.sw { bottom: -6px; left: -6px; cursor: sw-resize; }
      .ir-handle.se { bottom: -6px; right: -6px; cursor: se-resize; }
      .ir-handle.n  { top: -6px;  left: 50%; transform: translateX(-50%); cursor: n-resize; }
      .ir-handle.s  { bottom: -6px; left: 50%; transform: translateX(-50%); cursor: s-resize; }
      .ir-handle.w  { top: 50%; left: -6px;  transform: translateY(-50%); cursor: w-resize; }
      .ir-handle.e  { top: 50%; right: -6px; transform: translateY(-50%); cursor: e-resize; }

      .ir-handle.n:hover, .ir-handle.s:hover { transform: translateX(-50%) scale(1.35); }
      .ir-handle.w:hover, .ir-handle.e:hover { transform: translateY(-50%) scale(1.35); }

      /* ── Size Badge ── */
      .ir-size-badge {
        position: absolute;
        bottom: -32px;
        left: 50%;
        transform: translateX(-50%);
        background: #ffffff;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        color: #334155;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 11px;
        font-family: "SF Mono", "Fira Code", "Cascadia Code", monospace;
        white-space: nowrap;
        pointer-events: none;
        box-shadow: 0 4px 14px rgba(15, 23, 42, 0.12);
        z-index: 10002;
        display: flex;
        align-items: center;
        gap: 6px;
        border: 1px solid rgba(15, 23, 42, 0.1);
      }

      .ir-size-badge .ir-zoom-pct {
        color: #5865f2;
        font-weight: 600;
      }

      .ir-toolbar {
        position: absolute;
        bottom: calc(100% + 12px);
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2px;
        background: #ffffff;
        backdrop-filter: blur(14px) saturate(180%);
        -webkit-backdrop-filter: blur(14px) saturate(180%);
        padding: 5px 7px;
        border-radius: 10px;
        box-shadow: 0 8px 28px rgba(15, 23, 42, 0.14), 0 0 0 1px rgba(15, 23, 42, 0.08);
        pointer-events: auto;
        z-index: 10003;
        width: max-content;
        max-width: 95vw;
        flex-wrap: wrap;
      }

      .ir-toolbar button {
        background: transparent;
        border: none;
        color: #475569;
        padding: 5px 8px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        line-height: 1;
        transition: background 0.12s, color 0.12s, transform 0.1s;
        white-space: nowrap;
        position: relative;
      }

      .ir-toolbar button:hover {
        background: rgba(88, 101, 242, 0.1);
        color: #4338ca;
      }

      .ir-toolbar button:active {
        transform: scale(0.93);
      }

      .ir-toolbar button.active {
        background: #5865f2;
        color: #fff;
      }

      .ir-toolbar button[disabled] {
        opacity: 0.35;
        pointer-events: none;
      }

      .ir-toolbar .ir-sep {
        width: 1px;
        height: 18px;
        background: rgba(15, 23, 42, 0.12);
        margin: 0 3px;
        flex-shrink: 0;
      }

      /* ── Toolbar Tooltip ── */
      .ir-toolbar button[data-tooltip]:hover::after {
        content: attr(data-tooltip);
        position: absolute;
        bottom: calc(100% + 6px);
        left: 50%;
        transform: translateX(-50%);
        background: rgba(15, 23, 42, 0.95);
        color: #e2e8f0;
        padding: 4px 8px;
        border-radius: 5px;
        font-size: 10px;
        white-space: nowrap;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10004;
        border: 1px solid rgba(255,255,255,0.08);
      }

      /* ── Dropdown Menus ── */
      .ir-dropdown {
        position: absolute;
        top: calc(100% + 6px);
        left: 50%;
        transform: translateX(-50%);
        background: #ffffff;
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border-radius: 10px;
        padding: 6px;
        box-shadow: 0 12px 32px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(15, 23, 42, 0.08);
        z-index: 10010;
        min-width: 150px;
        pointer-events: auto;
        display: none;
      }

      .ir-dropdown.visible {
        display: block;
        animation: ir-dropdown-in 0.18s ease;
      }

      @keyframes ir-dropdown-in {
        from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
        to   { opacity: 1; transform: translateX(-50%) translateY(0); }
      }

      .ir-dropdown-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 7px 12px;
        border-radius: 6px;
        cursor: pointer;
        color: #334155;
        font-size: 12px;
        transition: background 0.12s;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
      }

      .ir-dropdown-item:hover {
        background: rgba(88, 101, 242, 0.1);
      }

      .ir-dropdown-item .ir-dd-icon {
        width: 20px;
        text-align: center;
        flex-shrink: 0;
        font-size: 14px;
      }

      /* ── Context Menu ── */
      .ir-context-menu {
        position: fixed;
        background: #ffffff;
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border-radius: 10px;
        padding: 6px;
        box-shadow: 0 12px 32px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(15, 23, 42, 0.08);
        z-index: 10020;
        min-width: 180px;
        animation: ir-dropdown-in 0.15s ease;
      }

      .ir-context-menu .ir-ctx-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 14px;
        border-radius: 6px;
        cursor: pointer;
        color: #334155;
        font-size: 12px;
        transition: background 0.12s;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
      }

      .ir-context-menu .ir-ctx-item:hover {
        background: rgba(88, 101, 242, 0.1);
      }

      .ir-context-menu .ir-ctx-item .ir-ctx-icon {
        width: 18px;
        text-align: center;
        font-size: 13px;
      }

      .ir-context-menu .ir-ctx-item .ir-ctx-shortcut {
        margin-left: auto;
        color: #64748b;
        font-size: 10px;
        font-family: monospace;
      }

      .ir-context-menu .ir-ctx-sep {
        height: 1px;
        background: rgba(255,255,255,0.08);
        margin: 4px 8px;
      }

      /* ── Custom Size Dialog ── */
      .ir-dialog-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.35);
        z-index: 20000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: ir-fade-in 0.2s ease;
      }

      @keyframes ir-fade-in {
        from { opacity: 0; }
        to   { opacity: 1; }
      }

      .ir-dialog {
        background: #ffffff;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 14px;
        padding: 24px;
        box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(15, 23, 42, 0.08);
        width: 320px;
        max-width: 90vw;
        animation: ir-dialog-in 0.25s ease;
      }

      @keyframes ir-dialog-in {
        from { opacity: 0; transform: scale(0.92) translateY(10px); }
        to   { opacity: 1; transform: scale(1) translateY(0); }
      }

      .ir-dialog h3 {
        margin: 0 0 16px;
        color: #0f172a;
        font-size: 15px;
        font-weight: 600;
      }

      .ir-dialog label {
        display: block;
        color: #64748b;
        font-size: 11px;
        margin-bottom: 4px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .ir-dialog input[type="number"] {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid rgba(15, 23, 42, 0.12);
        border-radius: 8px;
        background: #f8fafc;
        color: #0f172a;
        font-size: 14px;
        font-family: monospace;
        outline: none;
        transition: border-color 0.15s;
        box-sizing: border-box;
      }

      .ir-dialog input[type="number"]:focus {
        border-color: #5865f2;
        background: #ffffff;
      }

      .ir-dialog .ir-dialog-row {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;
        align-items: end;
      }

      .ir-dialog .ir-dialog-row > div { flex: 1; }

      .ir-dialog .ir-lock-btn {
        padding: 8px;
        background: rgba(88, 101, 242, 0.08);
        border: 1px solid rgba(88, 101, 242, 0.25);
        border-radius: 8px;
        color: #5865f2;
        cursor: pointer;
        font-size: 16px;
        line-height: 1;
        transition: background 0.15s;
        flex-shrink: 0;
        margin-bottom: 0;
      }

      .ir-dialog .ir-lock-btn:hover {
        background: rgba(88, 101, 242, 0.14);
      }

      .ir-dialog .ir-lock-btn.locked {
        color: #4338ca;
        background: rgba(88, 101, 242, 0.16);
        border-color: #5865f2;
      }

      .ir-dialog .ir-dialog-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        margin-top: 20px;
      }

      .ir-dialog .ir-dialog-actions button {
        padding: 8px 18px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        transition: background 0.12s, transform 0.1s;
      }

      .ir-dialog .ir-dialog-actions button:active { transform: scale(0.95); }

      .ir-dialog .ir-btn-cancel {
        background: #f1f5f9;
        color: #475569;
      }

      .ir-dialog .ir-btn-cancel:hover {
        background: #e2e8f0;
      }

      .ir-dialog .ir-btn-apply {
        background: #5865f2;
        color: #fff;
      }

      .ir-dialog .ir-btn-apply:hover {
        background: #4752c4;
      }

      /* ── Info Panel ── */
      .ir-info-panel {
        position: absolute;
        top: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        background: #ffffff;
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border-radius: 10px;
        padding: 14px 18px;
        box-shadow: 0 12px 32px rgba(15, 23, 42, 0.14), 0 0 0 1px rgba(15, 23, 42, 0.08);
        z-index: 10003;
        min-width: 200px;
        pointer-events: auto;
        animation: ir-dropdown-in 0.18s ease;
      }

      .ir-info-panel table {
        width: 100%;
        border-collapse: collapse;
      }

      .ir-info-panel td {
        padding: 3px 0;
        font-size: 11px;
        color: #64748b;
        vertical-align: top;
      }

      .ir-info-panel td:first-child {
        font-weight: 600;
        color: #475569;
        padding-right: 14px;
        white-space: nowrap;
      }

      .ir-info-panel td:last-child {
        color: #0f172a;
        font-family: monospace;
        font-size: 11px;
      }

      /* ── Opacity Slider ── */
      .ir-slider-container {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
      }

      .ir-slider-container label {
        font-size: 11px;
        color: #64748b;
        min-width: 50px;
      }

      .ir-slider-container input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        flex: 1;
        height: 4px;
        background: rgba(15, 23, 42, 0.12);
        border-radius: 4px;
        outline: none;
      }

      .ir-slider-container input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #6366f1;
        border: 2px solid #fff;
        cursor: pointer;
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
      }

      .ir-slider-container .ir-slider-val {
        font-size: 11px;
        color: #5865f2;
        font-family: monospace;
        min-width: 32px;
        text-align: right;
      }

      /* ── Animations ── */
      @keyframes ir-pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.3); }
        50%      { box-shadow: 0 0 0 6px rgba(99,102,241,0); }
      }

      .ir-handle-pulse {
        animation: ir-pulse 1.5s ease infinite;
      }
    `,document.head.appendChild(t)}_setupEventListeners(){const t=document.getElementById("output");if(!t){console.warn("[ImageResize v2] Preview container #output not found");return}let e=null;this._hoverTimer=null;const i=(s,a,r)=>{o();const d=s.naturalWidth||"?",h=s.naturalHeight||"?",c=Math.round(s.offsetWidth),p=Math.round(s.offsetHeight),x=s.getAttribute("src")||"";let u="image";if(x.startsWith("data:image/"))u=x.split(";")[0].replace("data:image/","").toUpperCase();else{const m=x.split(".").pop().split(/[?#]/)[0].toUpperCase();m&&m.length<=5&&(u=m)}const l=document.createElement("div");l.id="ir-hover-tip",l.style.cssText=`
              position: fixed;
              left: ${a+14}px;
              top: ${r+14}px;
              background: #ffffff;
              backdrop-filter: blur(12px);
              color: #334155;
              padding: 8px 12px;
              border-radius: 8px;
              font-size: 11px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              box-shadow: 0 8px 24px rgba(15, 23, 42, 0.14), 0 0 0 1px rgba(15, 23, 42, 0.08);
              pointer-events: none;
              z-index: 10030;
              line-height: 1.6;
              animation: ir-fade-in 0.15s ease;
              max-width: 220px;
            `,l.innerHTML=[`<span style="color:#64748b;font-size:10px;letter-spacing:.04em;text-transform:uppercase">${u}</span>`,`<div style="margin-top:4px"><span style="color:#5865f2;font-weight:600">${c} × ${p}</span><span style="color:#94a3b8"> px (display)</span></div>`,d!=="?"?`<div style="color:#94a3b8">${d} × ${h} natural</div>`:""].join(""),document.body.appendChild(l),e=l,requestAnimationFrame(()=>{if(!l.isConnected)return;const m=l.getBoundingClientRect();m.right>window.innerWidth-8&&(l.style.left=`${a-m.width-14}px`),m.bottom>window.innerHeight-8&&(l.style.top=`${r-m.height-14}px`)})},o=()=>{clearTimeout(this._hoverTimer),this._hoverTimer=null,e&&(e.remove(),e=null)};t.addEventListener("mousemove",s=>{const a=s.target.closest("img[data-loaded]");if(!a||this.activeImage===a){o();return}e?(e.style.left=`${s.clientX+14}px`,e.style.top=`${s.clientY+14}px`):this._hoverTimer=setTimeout(()=>i(a,s.clientX,s.clientY),350)}),t.addEventListener("mouseleave",o),t.addEventListener("click",s=>{const a=s.target.closest("img[data-loaded]");a&&(s.preventDefault(),s.stopPropagation(),o(),this._selectImage(a))}),t.addEventListener("dblclick",s=>{const a=s.target.closest("img[data-loaded]");a&&(s.preventDefault(),s.stopPropagation(),this._selectImage(a),this._openCustomSizeDialog())}),t.addEventListener("contextmenu",s=>{const a=s.target.closest("img[data-loaded]");a&&(s.preventDefault(),s.stopPropagation(),o(),this._selectImage(a),this._showContextMenu(s.clientX,s.clientY))}),document.addEventListener("click",s=>{this.contextMenu&&!s.target.closest(".ir-context-menu")&&this._closeContextMenu(),!s.target.closest(".ir-dropdown")&&!s.target.closest(".ir-toolbar button")&&this._closeAllDropdowns(),this.activeImage&&!s.target.closest(".ir-overlay")&&!s.target.closest(".ir-context-menu")&&!s.target.closest(".ir-dialog-backdrop")&&!s.target.closest("img[data-loaded]")&&this._deselectImage()}),document.addEventListener("mousemove",this._boundOnMouseMove),document.addEventListener("mouseup",this._boundOnMouseUp),document.addEventListener("touchmove",this._boundOnTouchMove,{passive:!1}),document.addEventListener("touchend",this._boundOnTouchEnd),document.addEventListener("keydown",this._boundOnKeyDown);const n=document.getElementById("output");n&&n.addEventListener("scroll",this._boundOnScroll),window.addEventListener("scroll",this._boundOnScroll,!0),window.addEventListener("resize",this._boundOnResize)}_setupMutationObserver(){const t=document.getElementById("output");t&&(this._mutationObserver=new MutationObserver(e=>{if(this.activeImage){if(!document.body.contains(this.activeImage)){this._deselectImage();return}this.resizeOverlay&&!this.activeHandle&&this._repositionOverlay()}}),this._mutationObserver.observe(t,{childList:!0,subtree:!0}))}_selectImage(t){this.activeImage&&this.activeImage!==t&&this._deselectImage(),this.activeImage=t,t.classList.add("image-resizing"),this._saveState(t),this._createResizeOverlay(t)}_deselectImage(){this.activeImage&&(this.activeImage.classList.remove("image-resizing"),this.activeImage=null),this._removeResizeOverlay(),this._removeGhostOutline(),this._closeContextMenu(),this.snapGuides.clearGuides()}_saveState(t){const e={width:t.style.width||"",height:t.style.height||"",filter:t.style.filter||"",borderRadius:t.style.borderRadius||"",boxShadow:t.style.boxShadow||"",opacity:t.style.opacity||"",transform:t.style.transform||""};this.history.push(e)}_applyState(t,e){!t||!e||(t.style.width=e.width,t.style.height=e.height,t.style.filter=e.filter,t.style.borderRadius=e.borderRadius,t.style.boxShadow=e.boxShadow,t.style.opacity=e.opacity,t.style.transform=e.transform)}_undo(){if(!this.activeImage||!this.history.canUndo)return;const t=this.history.undo();t&&(this._applyState(this.activeImage,t),this._repositionOverlay(),b.show("Undo","info"))}_redo(){if(!this.activeImage||!this.history.canRedo)return;const t=this.history.redo();t&&(this._applyState(this.activeImage,t),this._repositionOverlay(),b.show("Redo","info"))}_createResizeOverlay(t){this._removeResizeOverlay();const e=t.getBoundingClientRect(),i=document.createElement("div");i.className="ir-overlay",i.style.cssText=`
      top: ${e.top}px;
      left: ${e.left}px;
      width: ${e.width}px;
      height: ${e.height}px;
    `;const o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.classList.add("ir-selection-border"),o.setAttribute("preserveAspectRatio","none");const n=document.createElementNS("http://www.w3.org/2000/svg","rect");n.setAttribute("x","1"),n.setAttribute("y","1"),n.setAttribute("width","calc(100% - 2px)"),n.setAttribute("height","calc(100% - 2px)"),n.setAttribute("rx","2"),o.appendChild(n),i.appendChild(o),["nw","ne","sw","se","n","s","w","e"].forEach(h=>{const c=document.createElement("div");c.className=`ir-handle ${h}`,c.dataset.handle=h,["nw","ne","sw","se"].includes(h)&&c.classList.add("ir-handle-pulse"),c.addEventListener("mousedown",p=>this._onHandleMouseDown(p,h)),c.addEventListener("touchstart",p=>this._onHandleTouchStart(p,h),{passive:!1}),i.appendChild(c)});const a=document.createElement("div");a.className="ir-size-badge";const r=t.naturalWidth>0?Math.round(e.width/t.naturalWidth*100):100;a.innerHTML=`
      ${Math.round(e.width)} × ${Math.round(e.height)}
      <span class="ir-zoom-pct">${r}%</span>
    `,i.appendChild(a);const d=this._createToolbar(t);i.appendChild(d),document.body.appendChild(i),this.resizeOverlay=i,this._positionImageToolbar()}_removeResizeOverlay(){this.resizeOverlay&&(this.resizeOverlay.remove(),this.resizeOverlay=null)}_getChromeBottom(){let t=8;const e=document.querySelector(".premium-header"),i=document.querySelector(".premium-toolbar");if(e&&(t=Math.max(t,e.getBoundingClientRect().bottom)),i){const o=i.getBoundingClientRect();o.height>0&&(t=Math.max(t,o.bottom))}return t+8}_positionImageToolbar(){const t=this.resizeOverlay?.querySelector(".ir-toolbar");if(!t||!this.resizeOverlay)return;const e=this._getChromeBottom(),i=this.resizeOverlay.getBoundingClientRect(),o=12,n=t.offsetHeight||40;i.top-e>=n+o?(t.style.top="auto",t.style.bottom=`calc(100% + ${o}px)`,t.dataset.placement="above"):(t.style.bottom="auto",t.style.top=`calc(100% + ${o}px)`,t.dataset.placement="below")}_repositionOverlay(){if(!this.resizeOverlay||!this.activeImage)return;const t=this.activeImage.getBoundingClientRect();this.resizeOverlay.style.top=`${t.top}px`,this.resizeOverlay.style.left=`${t.left}px`,this.resizeOverlay.style.width=`${t.width}px`,this.resizeOverlay.style.height=`${t.height}px`,this._updateSizeBadge(t.width,t.height),this._positionImageToolbar()}_showGhostOutline(){if(!this.activeImage||this.ghostOutline)return;const t=this.activeImage.getBoundingClientRect(),e=document.createElement("div");e.className="ir-ghost-outline",e.style.cssText=`
      top: ${t.top}px;
      left: ${t.left}px;
      width: ${this.startWidth}px;
      height: ${this.startHeight}px;
    `,document.body.appendChild(e),this.ghostOutline=e}_removeGhostOutline(){this.ghostOutline&&(this.ghostOutline.remove(),this.ghostOutline=null)}_createToolbar(t){const e=document.createElement("div");e.className="ir-toolbar";const i=(v,w,H,I="")=>{const S=document.createElement("button");return S.innerHTML=v,S.setAttribute("data-tooltip",w),I&&(S.className=I),S.addEventListener("click",E=>{E.stopPropagation(),H(E,S)}),e.appendChild(S),S},o=()=>{const v=document.createElement("div");v.className="ir-sep",e.appendChild(v)},n=(v,w="0 0 24 24")=>`<svg width="13" height="13" viewBox="${w}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block">${v}</svg>`,s={undo:n('<polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>'),redo:n('<polyline points="15 14 20 9 15 4"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/>'),alignL:n('<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/>'),alignC:n('<line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>'),alignR:n('<line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/>'),lock:n('<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'),unlock:n('<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>'),resize:n('<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>'),filter:n('<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>'),shadow:n('<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'),corners:n('<rect x="3" y="3" width="18" height="18" rx="4"/>'),rotateCW:n('<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>'),rotateCCW:n('<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>'),flipH:n('<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>'),flipV:n('<polyline points="23 7 19 3 15 7"/><path d="M13 21h2a4 4 0 0 0 4-4V3"/><polyline points="1 17 5 21 9 17"/><path d="M11 3H9a4 4 0 0 0-4 4v14"/>'),edit:n('<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>'),reset:n('<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-5"/>'),info:n('<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'),copy:n('<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),download:n('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>')};i(s.undo,"Undo (Ctrl+Z)",()=>this._undo()),i(s.redo,"Redo (Ctrl+Y)",()=>this._redo()),o(),i(s.alignL,"Align Left",()=>this._setAlignment(t,"left")),i(s.alignC,"Center",()=>this._setAlignment(t,"center")),i(s.alignR,"Align Right",()=>this._setAlignment(t,"right")),o();const a=i(this.lockAspect?s.lock:s.unlock,"Toggle Aspect Lock",(v,w)=>{this.lockAspect=!this.lockAspect,w.innerHTML=this.lockAspect?s.lock:s.unlock,b.show(this.lockAspect?"Aspect ratio locked":"Aspect ratio unlocked","info")});this.lockAspect&&a.classList.add("active"),o();const r=document.createElement("div");r.style.position="relative";const d=document.createElement("button");d.innerHTML=s.resize,d.setAttribute("data-tooltip","Size Presets"),d.addEventListener("click",v=>{v.stopPropagation(),this._toggleDropdown(h)}),r.appendChild(d);const h=this._createPresetsDropdown(t);r.appendChild(h),e.appendChild(r);const c=document.createElement("div");c.style.position="relative";const p=document.createElement("button");p.innerHTML=s.filter,p.setAttribute("data-tooltip","Filters"),p.addEventListener("click",v=>{v.stopPropagation(),this._toggleDropdown(x)}),c.appendChild(p);const x=this._createFilterDropdown(t);c.appendChild(x),e.appendChild(c);const u=document.createElement("div");u.style.position="relative";const l=document.createElement("button");l.innerHTML=s.shadow,l.setAttribute("data-tooltip","Shadow"),l.addEventListener("click",v=>{v.stopPropagation(),this._toggleDropdown(m)}),u.appendChild(l);const m=this._createShadowDropdown(t);u.appendChild(m),e.appendChild(u);const y=document.createElement("div");y.style.position="relative";const k=document.createElement("button");k.innerHTML=s.corners,k.setAttribute("data-tooltip","Corners"),k.addEventListener("click",v=>{v.stopPropagation(),this._toggleDropdown(_)}),y.appendChild(k);const _=this._createRadiusDropdown(t);return y.appendChild(_),e.appendChild(y),o(),i(s.rotateCW,"Rotate 90° CW",()=>this._rotate(t,90)),i(s.rotateCCW,"Rotate 90° CCW",()=>this._rotate(t,-90)),i(s.flipH,"Flip Horizontal",()=>this._flip(t,"horizontal")),i(s.flipV,"Flip Vertical",()=>this._flip(t,"vertical")),o(),i(s.edit,"Custom Size (Dbl-click image)",()=>this._openCustomSizeDialog()),i(s.reset,"Reset All (Ctrl+0)",()=>this._resetAll(t)),o(),i(s.info,"Image Info",(v,w)=>this._toggleInfoPanel(t,w)),i(s.copy,"Copy Image",()=>this._copyImage(t)),i(s.download,"Download",()=>this._downloadImage(t)),e}_createPresetsDropdown(t){const e=document.createElement("div");return e.className="ir-dropdown",L.forEach(i=>{const o=document.createElement("button");o.className="ir-dropdown-item",o.innerHTML=`<span class="ir-dd-icon">${i.icon}</span>${i.label}`,o.addEventListener("click",n=>{n.stopPropagation(),i.pct?this._setPercentWidth(t,i.pct):this._setFixedWidth(t,i.width),e.classList.remove("visible")}),e.appendChild(o)}),e}_createFilterDropdown(t){const e=document.createElement("div");e.className="ir-dropdown",T.forEach(a=>{const r=document.createElement("button");r.className="ir-dropdown-item",r.innerHTML=`<span class="ir-dd-icon">${a.icon}</span>${a.label}`,r.addEventListener("click",d=>{d.stopPropagation(),this._saveState(t),t.style.filter=a.value==="none"?"":a.value,this._updateMarkdownSource(t),b.show(`Filter: ${a.label}`,"success"),e.classList.remove("visible")}),e.appendChild(r)});const i=document.createElement("div");i.className="ir-slider-container";const o=document.createElement("label");o.textContent="Opacity";const n=document.createElement("input");n.type="range",n.min="10",n.max="100",n.value=Math.round((parseFloat(t.style.opacity)||1)*100);const s=document.createElement("span");return s.className="ir-slider-val",s.textContent=n.value+"%",n.addEventListener("input",a=>{a.stopPropagation();const r=parseInt(n.value);t.style.opacity=r/100,s.textContent=r+"%"}),n.addEventListener("change",()=>{this._saveState(t),this._updateMarkdownSource(t)}),i.appendChild(o),i.appendChild(n),i.appendChild(s),e.appendChild(i),e}_createShadowDropdown(t){const e=document.createElement("div");return e.className="ir-dropdown",R.forEach(i=>{const o=document.createElement("button");o.className="ir-dropdown-item",o.innerHTML=`<span class="ir-dd-icon">${i.icon}</span>${i.label}`,o.addEventListener("click",n=>{n.stopPropagation(),this._saveState(t),t.style.boxShadow=i.value==="none"?"":i.value,this._updateMarkdownSource(t),b.show(`Shadow: ${i.label}`,"success"),e.classList.remove("visible")}),e.appendChild(o)}),e}_createRadiusDropdown(t){const e=document.createElement("div");return e.className="ir-dropdown",W.forEach(i=>{const o=document.createElement("button");o.className="ir-dropdown-item",o.innerHTML=`<span class="ir-dd-icon">${i.icon}</span>${i.label}`,o.addEventListener("click",n=>{n.stopPropagation(),this._saveState(t),t.style.borderRadius=i.value==="0"?"":i.value,this._updateMarkdownSource(t),b.show(`Corners: ${i.label}`,"success"),e.classList.remove("visible")}),e.appendChild(o)}),e}_toggleDropdown(t){document.querySelectorAll(".ir-dropdown.visible").forEach(e=>{e!==t&&e.classList.remove("visible")}),t.classList.toggle("visible")}_closeAllDropdowns(){document.querySelectorAll(".ir-dropdown.visible").forEach(t=>{t.classList.remove("visible")})}_showContextMenu(t,e){this._closeContextMenu();const i=this.activeImage;if(!i)return;const o=document.createElement("div");o.className="ir-context-menu",o.style.left=`${t}px`,o.style.top=`${e}px`,[{icon:"✏️",label:"Custom Size…",shortcut:"DblClick",action:()=>this._openCustomSizeDialog()},{icon:"↺",label:"Reset All",shortcut:"Ctrl+0",action:()=>this._resetAll(i)},null,{icon:"↶",label:"Undo",shortcut:"Ctrl+Z",action:()=>this._undo()},{icon:"↷",label:"Redo",shortcut:"Ctrl+Y",action:()=>this._redo()},null,{icon:"◧",label:"Align Left",shortcut:"",action:()=>this._setAlignment(i,"left")},{icon:"◫",label:"Center",shortcut:"",action:()=>this._setAlignment(i,"center")},{icon:"◨",label:"Align Right",shortcut:"",action:()=>this._setAlignment(i,"right")},null,{icon:"½",label:"Set 50% Width",shortcut:"",action:()=>this._setPercentWidth(i,50)},{icon:"▣",label:"Set 100% Width",shortcut:"",action:()=>this._setPercentWidth(i,100)},null,{icon:"📋",label:"Copy Image",shortcut:"",action:()=>this._copyImage(i)},{icon:"💾",label:"Download Image",shortcut:"",action:()=>this._downloadImage(i)},{icon:"ℹ",label:"Image Info",shortcut:"",action:()=>this._showInfoPanelStandalone(i)}].forEach(s=>{if(s===null){const r=document.createElement("div");r.className="ir-ctx-sep",o.appendChild(r);return}const a=document.createElement("button");a.className="ir-ctx-item",a.innerHTML=`
        <span class="ir-ctx-icon">${s.icon}</span>
        <span>${s.label}</span>
        ${s.shortcut?`<span class="ir-ctx-shortcut">${s.shortcut}</span>`:""}
      `,a.addEventListener("click",r=>{r.stopPropagation(),this._closeContextMenu(),s.action()}),o.appendChild(a)}),document.body.appendChild(o),this.contextMenu=o,requestAnimationFrame(()=>{const s=o.getBoundingClientRect();s.right>window.innerWidth&&(o.style.left=`${window.innerWidth-s.width-8}px`),s.bottom>window.innerHeight&&(o.style.top=`${window.innerHeight-s.height-8}px`)})}_closeContextMenu(){this.contextMenu&&(this.contextMenu.remove(),this.contextMenu=null)}_openCustomSizeDialog(){const t=this.activeImage;if(!t)return;const e=document.querySelector(".ir-dialog-backdrop");e&&e.remove();const i=Math.round(t.offsetWidth),o=Math.round(t.offsetHeight),n=t.naturalWidth||i,s=t.naturalHeight||o,a=n/s;let r=this.lockAspect;const d=document.createElement("div");d.className="ir-dialog-backdrop";const h=document.createElement("div");h.className="ir-dialog",h.innerHTML=`
      <h3>📐 Custom Image Size</h3>
      <div style="font-size:11px; color:#64748b; margin-bottom:14px;">
        Original: ${n} × ${s}px
      </div>
      <div class="ir-dialog-row">
        <div>
          <label>Width (px)</label>
          <input type="number" id="ir-dlg-width" value="${i}" min="${g.minWidth}" max="${g.maxWidth}" />
        </div>
        <button class="ir-lock-btn ${r?"locked":""}" id="ir-dlg-lock" title="Toggle aspect ratio lock">
          ${r?"🔗":"🔓"}
        </button>
        <div>
          <label>Height (px)</label>
          <input type="number" id="ir-dlg-height" value="${o}" min="${g.minHeight}" max="${g.maxHeight}" />
        </div>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
        <button class="ir-preset-chip" data-pct="25">25%</button>
        <button class="ir-preset-chip" data-pct="33">33%</button>
        <button class="ir-preset-chip" data-pct="50">50%</button>
        <button class="ir-preset-chip" data-pct="75">75%</button>
        <button class="ir-preset-chip" data-pct="100">100%</button>
        <button class="ir-preset-chip" data-w="150">Thumb</button>
        <button class="ir-preset-chip" data-w="320">Small</button>
        <button class="ir-preset-chip" data-w="640">Medium</button>
        <button class="ir-preset-chip" data-w="960">Large</button>
      </div>
      <div class="ir-dialog-actions">
        <button class="ir-btn-cancel">Cancel</button>
        <button class="ir-btn-apply">Apply</button>
      </div>
    `,d.appendChild(h),document.body.appendChild(d),h.querySelectorAll(".ir-preset-chip").forEach(l=>{l.style.cssText=`
        padding: 4px 10px;
        border-radius: 6px;
        border: 1px solid rgba(15, 23, 42, 0.12);
        background: #f8fafc;
        color: #475569;
        font-size: 11px;
        cursor: pointer;
        transition: background 0.12s, border-color 0.12s, color 0.12s;
      `,l.addEventListener("mouseenter",()=>{l.style.background="rgba(88, 101, 242, 0.1)",l.style.borderColor="#5865f2",l.style.color="#4338ca"}),l.addEventListener("mouseleave",()=>{l.style.background="#f8fafc",l.style.borderColor="rgba(15, 23, 42, 0.12)",l.style.color="#475569"})});const c=h.querySelector("#ir-dlg-width"),p=h.querySelector("#ir-dlg-height"),x=h.querySelector("#ir-dlg-lock");x.addEventListener("click",l=>{l.stopPropagation(),r=!r,x.classList.toggle("locked",r),x.innerHTML=r?"🔗":"🔓"}),c.addEventListener("input",()=>{if(r){const l=parseInt(c.value)||1;p.value=Math.round(l/a)}}),p.addEventListener("input",()=>{if(r){const l=parseInt(p.value)||1;c.value=Math.round(l*a)}}),h.querySelectorAll(".ir-preset-chip").forEach(l=>{l.addEventListener("click",m=>{m.stopPropagation();const y=l.dataset.pct,k=l.dataset.w;if(y){const _=t.closest(".markdown-body"),v=_?_.clientWidth-48:window.innerWidth-100,w=Math.round(v*parseInt(y)/100);c.value=w,p.value=Math.round(w/a)}else if(k){const _=parseInt(k);c.value=_,p.value=Math.round(_/a)}})}),h.querySelector(".ir-btn-cancel").addEventListener("click",l=>{l.stopPropagation(),d.remove()}),h.querySelector(".ir-btn-apply").addEventListener("click",l=>{l.stopPropagation();const m=z(parseInt(c.value)||i,g.minWidth,g.maxWidth),y=z(parseInt(p.value)||o,g.minHeight,g.maxHeight);this._saveState(t),t.style.width=`${m}px`,t.style.height=`${y}px`,this._updateMarkdownSource(t),this._repositionOverlay(),b.show(`Resized to ${m} × ${y}`,"success"),d.remove()}),d.addEventListener("click",l=>{l.target===d&&d.remove()});const u=l=>{l.key==="Escape"&&(d.remove(),document.removeEventListener("keydown",u))};document.addEventListener("keydown",u),requestAnimationFrame(()=>{c.focus(),c.select()})}_toggleInfoPanel(t,e){const i=this.resizeOverlay?.querySelector(".ir-info-panel");if(i){i.remove();return}this._showInfoPanelInOverlay(t)}_showInfoPanelInOverlay(t){if(!this.resizeOverlay)return;const e=this.resizeOverlay.querySelector(".ir-info-panel");if(e){e.remove();return}const i=this._buildInfoPanel(t);this.resizeOverlay.appendChild(i)}_showInfoPanelStandalone(t){this.resizeOverlay||this._selectImage(t),this._showInfoPanelInOverlay(t)}_buildInfoPanel(t){const e=document.createElement("div");e.className="ir-info-panel";const i=t.naturalWidth||"?",o=t.naturalHeight||"?",n=Math.round(t.offsetWidth),s=Math.round(t.offsetHeight),a=t.naturalWidth>0?Math.round(n/t.naturalWidth*100)+"%":"N/A",r=t.getAttribute("src")||"";let d=r;if(r.startsWith("data:")){const l=r.match(/^data:([^;]+)/),m=l?l[1]:"unknown",y=Math.round(r.length*3/4);d=`Base64 (${m}, ~${B(y)})`}else r.length>60&&(d="…"+r.slice(-55));const h=t.style.filter||"None",c=t.style.boxShadow||"None",p=t.style.borderRadius||"0",x=t.style.opacity?Math.round(parseFloat(t.style.opacity)*100)+"%":"100%",u=t.style.transform||"None";return e.innerHTML=`
      <table>
        <tr><td>Original</td><td>${i} × ${o} px</td></tr>
        <tr><td>Current</td><td>${n} × ${s} px</td></tr>
        <tr><td>Zoom</td><td>${a}</td></tr>
        <tr><td>Aspect</td><td>${(i/o).toFixed(3)}</td></tr>
        <tr><td>Source</td><td style="word-break:break-all;max-width:160px;">${d}</td></tr>
        <tr><td>Filter</td><td>${h}</td></tr>
        <tr><td>Shadow</td><td style="max-width:140px;word-break:break-all;">${c}</td></tr>
        <tr><td>Corners</td><td>${p}</td></tr>
        <tr><td>Opacity</td><td>${x}</td></tr>
        <tr><td>Transform</td><td>${u}</td></tr>
      </table>
    `,e}_setFixedWidth(t,e){const i=t.naturalWidth&&t.naturalHeight?t.naturalWidth/t.naturalHeight:t.offsetWidth/t.offsetHeight,o=z(e,g.minWidth,g.maxWidth),n=Math.round(o/i);this._saveState(t),t.style.width=`${o}px`,t.style.height=`${n}px`,this._updateMarkdownSource(t),this._repositionOverlay(),b.show(`Size: ${o} × ${n}`,"success")}_setPercentWidth(t,e){const i=t.closest(".markdown-body");if(!i)return;const o=i.clientWidth-48,n=Math.round(o*e/100),s=t.naturalWidth&&t.naturalHeight?t.naturalWidth/t.naturalHeight:t.offsetWidth/t.offsetHeight,a=Math.round(n/s);this._saveState(t),t.style.width=`${n}px`,t.style.height=`${a}px`,this._updateMarkdownSource(t),this._repositionOverlay(),b.show(`${e}% → ${n} × ${a}`,"success")}_setAlignment(t,e){switch(this._saveState(t),t.setAttribute("align",e),t.style.display="block",e){case"left":t.style.marginLeft="0",t.style.marginRight="auto";break;case"center":t.style.marginLeft="auto",t.style.marginRight="auto";break;case"right":t.style.marginLeft="auto",t.style.marginRight="0";break}this._updateMarkdownSource(t),this._repositionOverlay(),b.show(`Align: ${e}`,"info")}_rotate(t,e){this._saveState(t);const i=t.style.transform||"",o=i.match(/rotate\((-?\d+)deg\)/),s=((o?parseInt(o[1]):0)+e)%360;let a=i.replace(/rotate\(-?\d+deg\)\s*/g,"").trim();s!==0&&(a=`rotate(${s}deg) ${a}`.trim()),t.style.transform=a||"",this._updateMarkdownSource(t),this._repositionOverlay(),b.show(`Rotate: ${s}°`,"info")}_flip(t,e){this._saveState(t);const i=t.style.transform||"",o=e==="horizontal"?"scaleX":"scaleY",n=new RegExp(`${o}\\((-?1)\\)`),s=i.match(n);let a;if(s){const d=parseInt(s[1])===1?-1:1;d===1?a=i.replace(n,"").trim():a=i.replace(n,`${o}(${d})`)}else a=`${i} ${o}(-1)`.trim();t.style.transform=a||"",this._updateMarkdownSource(t),b.show(`Flip ${e}`,"info")}_resetAll(t){this._saveState(t),t.style.width="",t.style.height="",t.style.filter="",t.style.borderRadius="",t.style.boxShadow="",t.style.opacity="",t.style.transform="",t.style.display="",t.style.marginLeft="",t.style.marginRight="",t.removeAttribute("width"),t.removeAttribute("height"),t.removeAttribute("align"),this._updateMarkdownSource(t),this._createResizeOverlay(t),b.show("Reset to original","success")}async _copyImage(t){try{const e=document.createElement("canvas");e.width=t.naturalWidth,e.height=t.naturalHeight,e.getContext("2d").drawImage(t,0,0),e.toBlob(async o=>{if(!o){b.show("Failed to copy image","error");return}try{await navigator.clipboard.write([new ClipboardItem({"image/png":o})]),b.show("Image copied to clipboard","success")}catch{try{await navigator.clipboard.writeText(t.src),b.show("Image URL copied","success")}catch{b.show("Copy failed","error")}}},"image/png")}catch(e){b.show("Copy failed: "+e.message,"error")}}_downloadImage(t){try{const e=document.createElement("canvas");e.width=t.naturalWidth,e.height=t.naturalHeight,e.getContext("2d").drawImage(t,0,0);const o=document.createElement("a");o.download=`image_${Date.now()}.png`,o.href=e.toDataURL("image/png"),o.click(),b.show("Download started","success")}catch{const i=document.createElement("a");i.download=`image_${Date.now()}`,i.href=t.src,i.target="_blank",i.click(),b.show("Download started (fallback)","info")}}_onHandleMouseDown(t,e){t.preventDefault(),t.stopPropagation(),this.activeHandle=e,this.startX=t.clientX,this.startY=t.clientY,this.startWidth=this.activeImage.offsetWidth,this.startHeight=this.activeImage.offsetHeight,this.aspectRatio=this.startWidth/this.startHeight,this._saveState(this.activeImage),this._showGhostOutline(),document.body.style.cursor=`${e}-resize`,document.body.style.userSelect="none"}_onHandleTouchStart(t,e){t.preventDefault();const i=t.touches[0];this.activeHandle=e,this.startX=i.clientX,this.startY=i.clientY,this.startWidth=this.activeImage.offsetWidth,this.startHeight=this.activeImage.offsetHeight,this.aspectRatio=this.startWidth/this.startHeight,this._saveState(this.activeImage),this._showGhostOutline()}_onMouseMove(t){if(!this.activeHandle||!this.activeImage)return;const e=t.clientX-this.startX,i=t.clientY-this.startY,o=t.shiftKey?!this.lockAspect:this.lockAspect===!1;this._resize(e,i,o)}_onTouchMove(t){if(!this.activeHandle||!this.activeImage)return;t.preventDefault();const e=t.touches[0],i=e.clientX-this.startX,o=e.clientY-this.startY;this._resize(i,o,!1)}_resize(t,e,i){let o=this.startWidth,n=this.startHeight;const s=this.activeHandle;s.includes("e")&&(o=this.startWidth+t),s.includes("w")&&(o=this.startWidth-t),s.includes("s")&&(n=this.startHeight+e),s.includes("n")&&(n=this.startHeight-e);const a=["nw","ne","sw","se"].includes(s);if(!i&&a){const d=Math.abs(o-this.startWidth),h=Math.abs(n-this.startHeight);d>h?n=o/this.aspectRatio:o=n*this.aspectRatio}o=z(o,g.minWidth,g.maxWidth),n=z(n,g.minHeight,g.maxHeight);const r=this.activeImage.closest(".markdown-body");if(r){const d=r.getBoundingClientRect(),h=this.snapGuides.getSnapTargets(d),c=this.snapGuides.snap(o,h);c.snapped?(o=c.value,!i&&a&&(n=o/this.aspectRatio),this.snapGuides.showGuide(o,d,c.label)):this.snapGuides.clearGuides()}this.activeImage.style.width=`${Math.round(o)}px`,this.activeImage.style.height=`${Math.round(n)}px`,this._updateOverlay(o,n)}_updateOverlay(t,e){if(!this.resizeOverlay||!this.activeImage)return;const i=this.activeImage.getBoundingClientRect();this.resizeOverlay.style.top=`${i.top}px`,this.resizeOverlay.style.left=`${i.left}px`,this.resizeOverlay.style.width=`${t}px`,this.resizeOverlay.style.height=`${e}px`,this._updateSizeBadge(t,e)}_updateSizeBadge(t,e){if(!this.resizeOverlay||!this.activeImage)return;const i=this.resizeOverlay.querySelector(".ir-size-badge");if(i){const o=this.activeImage.naturalWidth>0?Math.round(t/this.activeImage.naturalWidth*100):100;i.innerHTML=`
        ${Math.round(t)} × ${Math.round(e)}
        <span class="ir-zoom-pct">${o}%</span>
      `}}_onMouseUp(t){this.activeHandle&&this._finishResize()}_onTouchEnd(t){this.activeHandle&&this._finishResize()}_finishResize(){if(this.activeImage){const t=Math.round(this.activeImage.offsetWidth),e=Math.round(this.activeImage.offsetHeight);this._updateMarkdownSource(this.activeImage),this._createResizeOverlay(this.activeImage),b.show(`${t} × ${e}`,"success")}this.activeHandle=null,this._removeGhostOutline(),this.snapGuides.clearGuides(),document.body.style.cursor="",document.body.style.userSelect=""}_onKeyDown(t){if(t.key==="Escape"&&this.activeImage){this._deselectImage();return}if(document.querySelector(".ir-dialog-backdrop"))return;const e=document.activeElement;if(!(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable))){if(this.activeImage&&t.ctrlKey&&!t.shiftKey&&t.key==="z"){t.preventDefault(),this._undo();return}if(this.activeImage&&t.ctrlKey&&(t.key==="y"||t.shiftKey&&t.key==="z")){t.preventDefault(),this._redo();return}if(this.activeImage&&t.ctrlKey&&t.key==="0"){t.preventDefault(),this._resetAll(this.activeImage);return}if(this.activeImage&&M[t.key]){t.preventDefault();const i=M[t.key],o=t.shiftKey?A:1,n=i.dw*o,s=i.dh*o,a=this.activeImage.offsetWidth,r=this.activeImage.offsetHeight,d=a/r;let h=z(a+n,g.minWidth,g.maxWidth),c=z(r+s,g.minHeight,g.maxHeight);this.lockAspect&&(n!==0&&s===0?c=Math.round(h/d):s!==0&&n===0&&(h=Math.round(c*d))),this._saveState(this.activeImage),this.activeImage.style.width=`${h}px`,this.activeImage.style.height=`${c}px`,this._updateMarkdownSource(this.activeImage),this._repositionOverlay();return}if(this.activeImage&&t.key==="Delete"){t.preventDefault(),this._resetAll(this.activeImage);return}}}_onScrollOrResize(){this.activeImage&&this.resizeOverlay&&!this.activeHandle&&this._repositionOverlay()}_collectPersistedState(t){const e={},i=parseInt(t.style.width||t.getAttribute("width")||"",10);!Number.isNaN(i)&&i>0&&(e.width=i);const o=parseInt(t.style.height||t.getAttribute("height")||"",10);!Number.isNaN(o)&&o>0&&(e.height=o);const n=t.getAttribute("align")||"";n&&(e.align=n);const s=t.style.filter||"";s&&(e.filter=s);const a=t.style.borderRadius||"";a&&(e.borderRadius=a);const r=t.style.boxShadow||"";r&&(e.boxShadow=r);const d=parseFloat(t.style.opacity||"");!Number.isNaN(d)&&d!==1&&(e.opacity=d);const h=t.style.transform||"";return h&&(e.transform=h),e}_encodePersistedState(t){return Object.keys(t||{}).length>0?encodeURIComponent(JSON.stringify(t)):""}_buildAttrString(t){const e=this._encodePersistedState(t);return e?`{data-ir=${e}}`:""}_updateMarkdownSource(t){if(!this.editor){console.warn("[ImageResize v2] Editor not available");return}const e=t.getAttribute("src")||"",i=t.dataset.originalSrc||e,o=t.dataset.irIndex,n=this._collectPersistedState(t),s=this._encodePersistedState(n),a=this._buildAttrString(n),r=this.editor.getValue();let d=r,h=!1;if(o!==void 0){const c=parseInt(o,10),p=/!\[([^\]]*)\]\(([^)]+)\)\s*(?:\{[^}]*\})?/g;let x=0;d=r.replace(p,(u,l,m)=>x===c?(h=!0,`![${l}](${m})${a}`):(x++,u))}if(!h&&i&&!i.startsWith("data:")){const c=O(i);try{const p=new RegExp(`!\\[([^\\]]*)\\]\\(${c}\\)\\s*(?:\\{[^}]*\\})?`,"g");p.test(r)&&(h=!0,d=r.replace(new RegExp(p.source,"g"),(x,u)=>`![${u}](${i})${a}`))}catch(p){console.warn("[ImageResize v2] Regex error (MD):",p)}}if(!h&&i&&!i.startsWith("data:")&&i.length<500)try{const c=O(i),p=new RegExp(`<img([^>]*)src=["']${c}["']([^>]*)>`,"gi");p.test(r)&&(h=!0,d=r.replace(new RegExp(p.source,"gi"),x=>{let u=x;return u=this._updateHtmlAttribute(u,"width",n.width||null),u=this._updateHtmlAttribute(u,"height",n.height||null),u=this._updateHtmlAttribute(u,"align",n.align||null),u=this._updateHtmlAttribute(u,"data-ir",s||null),u}))}catch(c){console.warn("[ImageResize v2] Regex error (HTML):",c)}if(h&&d!==r){const c=this.editor.getPosition(),p=this.editor.getScrollTop();this.editor.setValue(d),c&&(this.editor.setPosition(c),this.editor.setScrollTop(p))}}_updateHtmlAttribute(t,e,i){if(i===null)return t.replace(new RegExp(`\\s*${e}=["'][^"']*["']`,"gi"),"");if(i){const o=new RegExp(`${e}=["'][^"']*["']`,"gi");return o.test(t)?t.replace(o,`${e}="${i}"`):t.replace(/<img/i,`<img ${e}="${i}"`)}return t}destroy(){this._deselectImage(),this._closeContextMenu(),this._closeAllDropdowns(),this.snapGuides.clearGuides(),this._hoverTimer&&(clearTimeout(this._hoverTimer),this._hoverTimer=null);const t=document.getElementById("ir-hover-tip");t&&t.remove(),document.removeEventListener("mousemove",this._boundOnMouseMove),document.removeEventListener("mouseup",this._boundOnMouseUp),document.removeEventListener("touchmove",this._boundOnTouchMove),document.removeEventListener("touchend",this._boundOnTouchEnd),document.removeEventListener("keydown",this._boundOnKeyDown),window.removeEventListener("scroll",this._boundOnScroll,!0),window.removeEventListener("resize",this._boundOnResize);const e=document.getElementById("output");e&&e.removeEventListener("scroll",this._boundOnScroll),this._mutationObserver&&(this._mutationObserver.disconnect(),this._mutationObserver=null),document.getElementById("image-resize-styles-v2")?.remove(),document.getElementById("image-resize-styles-v3")?.remove();const i=document.getElementById("image-resize-toast-container");i&&i.remove(),this.history.clear(),this.initialized=!1,console.log("[ImageResize v2] ✓ Feature destroyed and cleaned up")}}const G=new F;function X(f={}){G.initialize(f)}export{g as CONFIG,D as HistoryStack,F as ImageResizeManager,L as SIZE_PRESETS,P as SnapGuides,N as ToastManager,X as initImageResize,b as toast};
