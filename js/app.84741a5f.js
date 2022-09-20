(()=>{"use strict";var e={8094:(e,t,a)=>{var s=a(144),r=a(9876),n=a(998),o=a(4829),i=function(){var e=this,t=e._self._c;return t(n.Z,[t("TheNavBar",{on:{"show-game-menu":e.handleShowGameMenu}}),t(o.Z,[t("TheGame",{ref:"game",on:{round:e.handleRound}}),t("TheGameMenu",{attrs:{isOpen:e.isGameMenuOpen,options:e.gameMenuOptions},on:{"start-new-game":e.handleNewGame,"resume-game":e.handleResumeGame}}),t("TheGameBoardRedactor",{attrs:{isOpen:e.isGameBoardRedactorOpen},on:{"start-game":e.handleStartGame}})],1)],1)},d=[],l=function(){var e=this,t=e._self._c;return t("nav",[t("button",{staticClass:"menu",on:{click:function(t){return e.$emit("show-game-menu")}}},[e._v("Menu")]),t("h1",{staticClass:"logo"},[e._v("Battleship")])])},c=[];const h={name:"TheNavBar"},p=h;var y=a(1001),u=(0,y.Z)(p,l,c,!1,null,"ca7b28fe",null);const m=u.exports;var g=a(3948),x=a(7481),f=function(){var e=this,t=e._self._c;return t(g.Z,{attrs:{persistent:"","overlay-opacity":"0.8"},model:{value:e.isOpen,callback:function(t){e.isOpen=t},expression:"isOpen"}},[t("div",{staticClass:"menu-container"},[e.playerFound?t("div",[t("button",{staticClass:"btn",on:{click:e.newGame}},[e._v(" New Game ")]),t("button",{staticClass:"btn",class:{disable:e.options.resume.isDisabled},on:{click:function(t){return e.$emit("resume-game")}}},[e._v(" Resume ")])]):t("div",[t(x.Z,{attrs:{label:"Share this link",readonly:""},model:{value:e.peerLink,callback:function(t){e.peerLink=t},expression:"peerLink"}})],1)])])},S=[];const v=(0,r.Q_)("main",{state:()=>({conn:null,opponentPlacementDone:!1}),actions:{handleDataFromPeer(e){switch(console.log(e),e.id){case"placementDone":this.opponentPlacementDone=!0;break}},setConnection(e){this.conn=e,e.on("data",this.handleDataFromPeer)}}}),b={name:"TheGameMenu",async mounted(){this.$conn?this.GameStore.setConnection(this.$conn):(this.peerLink=`${window.location.origin}${location.pathname}?id=${this.$peer.id}`,await new Promise((e=>{this.$peer.once("connection",(t=>{console.log("Connected to other peer"),this.GameStore.setConnection(t),e()}))}))),console.log("Conn to other peer: ",this.GameStore.conn.peer),this.playerFound=!0,this.GameStore.conn.once("data",(e=>{"startGame"===e.id&&this.$emit("start-new-game")}))},setup(){const e=v();return{GameStore:e}},methods:{newGame(){console.log("sending startGame"),this.GameStore.conn.send({id:"startGame"}),this.$emit("start-new-game")}},data(){return{playerFound:!1,peerLink:""}},props:{isOpen:Boolean,options:Object}},C=b;var B=(0,y.Z)(C,f,S,!1,null,"7b398d0e",null);const w=B.exports;var k=a(4716),O=function(){var e=this,t=e._self._c;return t(g.Z,{attrs:{persistent:"","overlay-opacity":"0.8"},model:{value:e.resetAndDisplay,callback:function(t){e.resetAndDisplay=t},expression:"resetAndDisplay"}},[t("div",{staticClass:"container"},[t("h2",[e._v("Arrange your board")]),t("div",{staticClass:"redactor"},[t("div",{staticClass:"board-container"},[t("div",{staticClass:"cords letters"},e._l(e.lettersCords,(function(a){return t("div",{key:a,staticClass:"letter"},[e._v(e._s(a))])})),0),t("div",{staticClass:"cords numbers"},e._l(e.numbersCords,(function(a){return t("div",{key:a,staticClass:"number"},[e._v(e._s(a))])})),0),t("div",{staticClass:"board"},e._l(Math.pow(e.MAX+1,2),(function(a,s){return t("div",{key:e.keys[e.MIN+s],staticClass:"spot",attrs:{"data-cord":e.stringifiedCords[e.MIN+s]},on:{dragover:function(t){return t.preventDefault(),e.handleDragOver.apply(null,arguments)},dragleave:e.handleDragLeave,drop:function(t){return t.preventDefault(),e.handleDrop.apply(null,arguments)}}})})),0)]),t("div",{staticClass:"selection"},e._l(e.ships,(function(a,s){return t("div",{key:s,staticClass:"ship-container",on:{dragstart:e.handleDragStart}},[t("span",{staticClass:"count"},[e._v(e._s(a)+"x")]),t("div",{ref:s,refInFor:!0,staticClass:"ship",attrs:{"data-length":e.getShipLength(s),"data-position":"y",draggable:"true"}},e._l(e.getShipLength(s),(function(e){return t("div",{key:e,staticClass:"part"})})),0)])})),0)]),t("div",{staticClass:"tips-container"},[t(k.Z,{staticClass:"tip-ico"},[e._v("mdi-lightbulb-on")]),t("div",{staticClass:"tips"},[t("span",[e._v("* Drag and drop the ships")]),t("span",[e._v("* Click on a ship on the board to switch direction")])])],1),t("div",{staticClass:"options"},[t("button",{on:{click:e.handleRandomPlacement}},[e._v("Random")]),t("button",{on:{click:function(t){return e.resetBoard()}}},[e._v("Reset")]),t("button",{class:{disable:0!==e.totalShips},on:{click:e.onClickStartBtn}},[e._v("Start")])])])])},E=[];a(7658);const G=10,N={ship4:1,ship3:2,ship2:3,ship1:4},T=9,R=0,$=({x:e,y:t})=>{const a=e=>R<=e&&e<=T,s=e=>!Number.isNaN(e)&&"number"===typeof e&&a(e);return s(e)&&s(t)},D=(e,t,a,s)=>{if(s){for(let s=e.y;s<=t.y;s+=1)if("s"===a[e.x][s]||"B"===a[e.x][s])return!1;for(let s=e.y-1;s<=t.y+1;s+=1)if($({x:e.x-1,y:s})&&"s"===a[e.x-1][s])return!1;for(let s=e.y-1;s<=t.y+1;s+=1)if($({x:e.x+1,y:s})&&"s"===a[e.x+1][s])return!1;return(!$({x:e.x,y:e.y-1})||"s"!==a[e.x][e.y-1])&&(!$({x:e.x,y:t.y+1})||"s"!==a[e.x][t.y+1])}for(let r=e.x;r<=t.x;r+=1)if("s"===a[r][e.y]||"B"===a[r][e.y])return!1;for(let r=e.x-1;r<=t.x+1;r+=1)if($({x:r,y:e.y-1})&&"s"===a[r][e.y-1])return!1;for(let r=e.x+1;r<=t.x+1;r+=1)if($({x:r,y:e.y+1})&&"s"===a[r][e.y+1])return!1;return(!$({x:e.x-1,y:e.y})||"s"!==a[e.x-1][e.y])&&(!$({x:e.x+1,y:e.y})||"s"!==a[e.x+1][e.y])},I=(e,t,{x:a,y:s,isVertical:r})=>{if(e&&$({x:a,y:s})){const n={x:a,y:s},o=r?{x:a,y:s+e.getLength()-1}:{x:a+e.getLength()-1,y:s};return $(o)&&D(n,o,t,r)}return!1},M=(e,{x:t,y:a,isVertical:s})=>{const r=[],n={x:t,y:a};if(s){const s={x:t,y:a+e.getLength()-1};for(let e=n.y;e<=s.y;e+=1)r.push({x:n.x,y:e});return r}const o={x:t+e.getLength()-1,y:a};for(let i=n.x;i<=o.x;i+=1)r.push({x:i,y:n.y});return r},P=(e,t)=>{const a=`ship${e.getLength()}`;return t[a]+1<=N[a]},L=(e,t)=>{const a={...t};return a[`ship${e.getLength()}`]+=1,{...a}},A=(e,t)=>{const a={...t};return a[`ship${e.getLength()}`]-=1,{...a}},_=(e,t,{x:a,y:s,isVertical:r})=>{const n={x:a,y:s},o=JSON.parse(JSON.stringify(t));if(r){const t={x:a,y:s+e.getLength()-1};for(let e=n.y;e<=t.y;e+=1)o[n.x][e]="s";for(let e=n.y-1;e<=t.y+1;e+=1)$({x:n.x-1,y:e})&&(o[n.x-1][e]="B");for(let e=n.y-1;e<=t.y+1;e+=1)$({x:n.x+1,y:e})&&(o[n.x+1][e]="B");return $({x:n.x,y:n.y-1})&&(o[n.x][n.y-1]="B"),$({x:n.x,y:t.y+1})&&(o[n.x][t.y+1]="B"),o}const i={x:a+e.getLength()-1,y:s};for(let d=n.x;d<=i.x;d+=1)o[d][n.y]="s";for(let d=n.x-1;d<=i.x+1;d+=1)$({x:d,y:n.y-1})&&(o[d][n.y-1]="B");for(let d=n.x-1;d<=i.x+1;d+=1)$({x:d,y:n.y+1})&&(o[d][n.y+1]="B");return $({x:n.x-1,y:n.y})&&(o[n.x-1][n.y]="B"),$({x:i.x+1,y:n.y})&&(o[i.x+1][n.y]="B"),o},J=(e,{x:t,y:a})=>!(!$({x:t-1,y:a})||"s"!==e[t-1][a])||(!(!$({x:t+1,y:a})||"s"!==e[t+1][a])||(!(!$({x:t,y:a-1})||"s"!==e[t][a-1])||(!(!$({x:t-1,y:a-1})||"s"!==e[t-1][a-1])||(!(!$({x:t+1,y:a-1})||"s"!==e[t+1][a-1])||(!(!$({x:t,y:a+1})||"s"!==e[t][a+1])||(!(!$({x:t-1,y:a+1})||"s"!==e[t-1][a+1])||!(!$({x:t+1,y:a+1})||"s"!==e[t+1][a+1]))))))),j=(e,t)=>{const{ship:a,isVertical:s}=e,{x:r,y:n}=e.cords[0],o={x:r,y:n},i=JSON.parse(JSON.stringify(t));if(s){const e={x:r,y:n+a.getLength()-1};for(let t=o.y;t<=e.y;t+=1)i[o.x][t]="~";for(let t=o.y-1;t<=e.y+1;t+=1)$({x:o.x-1,y:t})&&(J(i,{x:o.x-1,y:t})||(i[o.x-1][t]="~"));for(let t=o.y-1;t<=e.y+1;t+=1)$({x:o.x+1,y:t})&&(J(i,{x:o.x+1,y:t})||(i[o.x+1][t]="~"));return $({x:o.x,y:o.y-1})&&(J(i,{x:o.x,y:o.y-1})||(i[o.x][o.y-1]="~")),$({x:o.x,y:e.y+1})&&(J(i,{x:o.x,y:e.y+1})||(i[o.x][e.y+1]="~")),i}const d={x:r+a.getLength()-1,y:n};for(let l=o.x;l<=d.x;l+=1)i[l][o.y]="~";for(let l=o.x-1;l<=d.x+1;l+=1)$({x:l,y:o.y-1})&&(J(i,{x:l,y:o.y-1})||(i[l][o.y-1]="~"));for(let l=o.x-1;l<=d.x+1;l+=1)$({x:l,y:o.y+1})&&(J(i,{x:l,y:o.y+1})||(i[l][o.y+1]="~"));return $({x:o.x-1,y:o.y})&&(J(i,{x:o.x-1,y:o.y})||(i[o.x-1][o.y]="~")),$({x:d.x+1,y:o.y})&&(J(i,{x:d.x+1,y:o.y})||(i[d.x+1][o.y]="~")),i},V=(e,t)=>{const{ship:a,isVertical:s}=e,{x:r,y:n}=e.cords[0],o={x:r,y:n},i=JSON.parse(JSON.stringify(t)),d=[];if(s){const e={x:r,y:n+a.getLength()-1};for(let t=o.y-1;t<=e.y+1;t+=1)$({x:o.x-1,y:t})&&(i[o.x-1][t]="*",d.push({x:o.x-1,y:t}));for(let t=o.y-1;t<=e.y+1;t+=1)$({x:o.x+1,y:t})&&(i[o.x+1][t]="*",d.push({x:o.x+1,y:t}));return $({x:o.x,y:o.y-1})&&(i[o.x][o.y-1]="*",d.push({x:o.x,y:o.y-1})),$({x:o.x,y:e.y+1})&&(i[o.x][e.y+1]="*",d.push({x:o.x,y:e.y+1})),{newBoard:i,clearedBorders:d}}const l={x:r+a.getLength()-1,y:n};for(let c=o.x-1;c<=l.x+1;c+=1)$({x:c,y:o.y-1})&&(i[c][o.y-1]="*",d.push({x:c,y:o.y-1}));for(let c=o.x-1;c<=l.x+1;c+=1)$({x:c,y:o.y+1})&&(i[c][o.y+1]="*",d.push({x:c,y:o.y+1}));return $({x:o.x-1,y:o.y})&&(i[o.x-1][o.y]="*",d.push({x:o.x-1,y:o.y})),$({x:l.x+1,y:o.y})&&(i[l.x+1][o.y]="*",d.push({x:l.x+1,y:o.y})),{newBoard:i,clearedBorders:d}},Z=()=>Math.floor(Math.random()*(T+1)),F=()=>!!Math.floor(2*Math.random()),H=(e,{x:t,y:a})=>e.find((e=>e.cords.find((e=>e.x===t&&e.y===a)))),q=(e,{x:t,y:a})=>e.cords.findIndex((e=>e.x===t&&e.y===a)),W=(e,{x:t,y:a})=>e.filter((e=>!e.cords.find((e=>e.x===t&&e.y===a)))),z=()=>{let e=[["~","~","~","~","~","~","~","~","~","~"],["~","~","~","~","~","~","~","~","~","~"],["~","~","~","~","~","~","~","~","~","~"],["~","~","~","~","~","~","~","~","~","~"],["~","~","~","~","~","~","~","~","~","~"],["~","~","~","~","~","~","~","~","~","~"],["~","~","~","~","~","~","~","~","~","~"],["~","~","~","~","~","~","~","~","~","~"],["~","~","~","~","~","~","~","~","~","~"],["~","~","~","~","~","~","~","~","~","~"]],t=!1,a=0,s=0,r=[],n={ship4:0,ship3:0,ship2:0,ship1:0};return{isReady:()=>a===G&&t,setBoardToReady(){return a===G&&(t=!0),this},isAllShipsSunk(){return!!this.isReady()&&a===s},getAliveShipsCount:()=>a-s,placeShipAt(t,{x:s=-1,y:o=-1,isVertical:i=!1}={}){if(!this.isReady()&&I(t,e,{x:s,y:o,isVertical:i})&&P(t,n)){n=L(t,n);const d=M(t,{x:s,y:o,isVertical:i});return r.push({ship:t,cords:d,isVertical:i}),e=_(t,e,{x:s,y:o,isVertical:i}),a+=1,!0}return!1},replaceShipFrom({cx:t=-1,cy:s=-1},{nx:o=-1,ny:i=-1,isVertical:d=!1}={}){if(!this.isReady()){const l=H(r,{x:t,y:s});if(l){const c=JSON.parse(JSON.stringify(e)),h=[...r],p={...n};return e=j(l,e),r=W(r,{x:t,y:s}),n=A(l.ship,n),a-=1,!!this.placeShipAt(l.ship,{x:o,y:i,isVertical:d})||(e=c,r=h,n=p,a+=1,!1)}}return!1},placeShipRandom(e){if(!P(e,n))return!1;let t,a,s;do{t=Z(),a=Z(),s=F()}while(!this.placeShipAt(e,{x:t,y:a,isVertical:s}));return{x:t,y:a,isVertical:s}},receiveAttack({x:t,y:a}){if(this.isReady()&&$({x:t,y:a})){if("s"===e[t][a]){const n=H(r,{x:t,y:a}),o=q(n,{x:t,y:a});if(n.ship.hitAt({position:o+1}).isSunk()){s+=1,e[t][a]="x";const{newBoard:r,clearedBorders:o}=V(n,e);return e=r,{damagedShipData:n,clearedBorders:o}}return e[t][a]="x",!0}return"*"===e[t][a]||"x"===e[t][a]?"*":(e[t][a]="*",!1)}return!1}}},X=z,Y=4,Q=1,U=e=>e>Y?Y:e<Q?Q:e,K=e=>Q<=e&&e<=Y,ee=({length:e})=>{const t=[],a=U(e);return{getLength:()=>a,getLives:()=>[...t],isSunk:()=>t.join("").length===a,hitAt({position:e}){return K(e)&&(t[e-1]="x"),this}}},te=ee,ae={name:"TheGameBoardRedactor",props:{isOpen:Boolean},data(){return{MAX:T,MIN:R,ships:{...N},board:X(),draggedShip:null}},computed:{resetAndDisplay(){return this.isOpen&&this.resetBoard(),this.isOpen},cords(){const e=[];for(let t=this.MIN;t<=this.MAX;t+=1)for(let a=this.MIN;a<=this.MAX;a+=1)e.push({x:a,y:t});return e},keys(){return this.cords.map(((e,t)=>`${JSON.stringify(e)}-${t}`))},stringifiedCords(){return this.cords.map((e=>JSON.stringify(e)))},lettersCords(){const e=[];for(let t=this.MIN;t<=this.MAX;t+=1)e.push(String.fromCharCode(65+t));return e},numbersCords(){const e=[];for(let t=this.MIN+1;t<=this.MAX+1;t+=1)e.push(t);return e},totalShips(){return Object.entries(this.ships).reduce(((e,t)=>e+t[1]),0)}},setup(){const e=v();return{GameStore:e}},methods:{onClickStartBtn(){const e=document.querySelector(".board-container").cloneNode(!0),t=e.querySelectorAll(".ship");t.forEach((e=>{e.removeAttribute("draggable");const t="x"===e.dataset.position,{x:a,y:s}=JSON.parse(e.parentElement.dataset.cord);e.querySelectorAll(".part").forEach(((e,r)=>{const n=t?{x:a,y:s+r}:{x:a+r,y:s};e.dataset.cord=JSON.stringify(n)}))})),this.board.setBoardToReady();const a={...this.board};this.resetBoard();const s=document.querySelector(".board-container").cloneNode(!0);this.board.placeShipRandom(te({length:4})),this.board.placeShipRandom(te({length:3})),this.board.placeShipRandom(te({length:3})),this.board.placeShipRandom(te({length:2})),this.board.placeShipRandom(te({length:2})),this.board.placeShipRandom(te({length:2})),this.board.placeShipRandom(te({length:1})),this.board.placeShipRandom(te({length:1})),this.board.placeShipRandom(te({length:1})),this.board.placeShipRandom(te({length:1})),this.board.setBoardToReady();const r={...this.board};this.GameStore.conn.send({id:"placementDone"}),this.$emit("start-game",a,e,r,s)},getShipLength(e){return+e.match(/\d/g).join("")},resetBoard(){document.querySelectorAll(".spot > .ship").forEach((e=>e.remove())),this.board=X(),this.ships={...N}},handleChangePosition(e){const t=e.currentTarget,a=JSON.parse(t.dataset.cord),s="x"===t.dataset.position;if(this.board.replaceShipFrom({cx:a.x,cy:a.y},{nx:a.x,ny:a.y,isVertical:!s})){const e="x"===t.dataset.position?"y":"x";t.dataset.position=e,t.style["grid-auto-flow"]="x"===e?"row":"column"}},handleShipInitialCord(e){const t=JSON.parse(e.currentTarget.dataset.cord),{position:a}=e.currentTarget.dataset;e.dataTransfer.setData("text/plain",JSON.stringify({cord:t,cloned:!0,position:a})),this.draggedShip=e.currentTarget},handleDragStart(e){const{position:t}=e.target.dataset,a=+e.target.dataset.length;e.dataTransfer.setData("text/plain",JSON.stringify({length:a,position:t}))},handleDragOver(e){e.target.classList.add("over")},handleDragLeave(e){e.target.classList.remove("over")},handleDrop(e){let t,a;e.target.classList.remove("over");try{a=JSON.parse(e.dataTransfer.getData("text/plain")),JSON.parse(e.target.dataset.cord),t=!0}catch{t=!1}if(t&&a)if(a.cloned){const t=JSON.parse(e.target.dataset.cord),{cord:s,position:r}=a,n="x"===r;this.board.replaceShipFrom({cx:s.x,cy:s.y},{nx:t.x,ny:t.y,isVertical:n})&&(this.draggedShip.dataset.cord=e.target.dataset.cord,e.target.appendChild(this.draggedShip),this.draggedShip=null)}else{const{length:t,position:s}=a,r=JSON.parse(e.target.dataset.cord),n="x"===s;if(this.board.placeShipAt(te({length:t}),{...r,isVertical:n})){const a=`ship${t}`,r=this.$refs[a][0].cloneNode(!0);r.dataset.cord=e.target.dataset.cord,r.dataset.position=s,this.ships[a]-=1,r.style.position="absolute",e.target.appendChild(r),r.addEventListener("dragstart",this.handleShipInitialCord),r.addEventListener("click",this.handleChangePosition)}}},handleRandomPlacement(){const e=({x:e,y:t,isVertical:a},s)=>{const r=`ship${s}`,n=this.$refs[r][0].cloneNode(!0);n.dataset.cord=JSON.stringify({x:e,y:t}),n.dataset.position=a?"x":"y",this.ships[r]-=1,n.style.position="absolute",n.style["grid-auto-flow"]=a?"row":"column",[...document.querySelectorAll(".spot")].find((a=>a.dataset.cord===JSON.stringify({x:e,y:t}))).appendChild(n),n.addEventListener("dragstart",this.handleShipInitialCord),n.addEventListener("click",this.handleChangePosition)};this.resetBoard(),e({...this.board.placeShipRandom(te({length:4}))},4),e({...this.board.placeShipRandom(te({length:3}))},3),e({...this.board.placeShipRandom(te({length:3}))},3),e({...this.board.placeShipRandom(te({length:2}))},2),e({...this.board.placeShipRandom(te({length:2}))},2),e({...this.board.placeShipRandom(te({length:2}))},2),e({...this.board.placeShipRandom(te({length:1}))},1),e({...this.board.placeShipRandom(te({length:1}))},1),e({...this.board.placeShipRandom(te({length:1}))},1),e({...this.board.placeShipRandom(te({length:1}))},1)}}},se=ae;var re=(0,y.Z)(se,O,E,!1,null,"454c9c14",null);const ne=re.exports;var oe=function(){var e=this,t=e._self._c;return t("div",{staticClass:"game-wrapper"},[t("div",{staticClass:"game-container",style:{display:e.isGameInitiated?"flex":"none"}},[t("div",{ref:"plElement",staticClass:"pl"}),t("div",{staticClass:"game-info",class:{pulse:e.shouldFlash,"top-bot-borders":e.shouldFlash},style:{color:this.gameInfo.color}},[e._v(" "+e._s(this.gameInfoMsg)+" ")]),t("div",{ref:"pcElement",staticClass:"pc"})])])},ie=[];const de={name:"TheGame",setup(){const e=v();return{GameStore:e}},computed:{gameInfoMsg(){return this.GameStore.opponentPlacementDone?this.gameInfo.msg:"Waiting for opponent to finish placement"},shouldFlash(){return this.GameStore.opponentPlacementDone&&this.gameInfoMsg}},data:()=>({isGameInitiated:!1,plBoardElement:null,pcBoardElement:null,plBoardInfoElement:null,pcBoardInfoElement:null,gameInfo:{msg:"",color:"rgb(43, 197, 87)"},pl:null,pc:null}),methods:{initTheGame(e,t,a,s){this.plBoardElement=e,this.pcBoardElement=t,this.pl=a,this.pc=s,this.renderTheBoards(),this.renderTheBoardsInfo(),this.updateTheBoardsInfo(),this.GameStore.opponentPlacementDone?(this.disablePcBoard(),this.gameInfo={msg:"Opponent Turn!",color:"rgb(226, 54, 54)"}):(this.enablePcBoard(),this.gameInfo={msg:"Your Turn!",color:"rgb(43, 197, 87)"}),this.addPcBoardEvent(),this.isGameInitiated=!0},renderTheBoards(){this.$refs.plElement.appendChild(this.plBoardElement),this.$refs.pcElement.appendChild(this.pcBoardElement)},resetTheGame(){this.isGameInitiated&&(this.gameInfo.msg="",this.gameInfo.color="rgb(43, 197, 87)",this.plBoardElement.remove(),this.pcBoardElement.remove(),this.plBoardInfoElement.remove(),this.pcBoardInfoElement.remove())},addPcBoardEvent(){this.pcBoardElement.addEventListener("click",(e=>{e.target.classList.contains("spot")&&this.$emit("round",e.target.dataset.cord)}))},updatePcBoard(e,t){if(!0===t){const t=this.pcBoardElement.querySelector(`.spot[data-cord=${JSON.stringify(e)}]`);t.append("x"),t.style.backgroundColor="rgb(248, 39, 39)",t.style.lineHeight="1",t.style.pointerEvents="none",t.classList.toggle("resize")}if(!1===t){const t=this.pcBoardElement.querySelector(`.spot[data-cord=${JSON.stringify(e)}]`);t.append("*"),t.style.pointerEvents="none",t.classList.toggle("resize")}if(t.damagedShipData){const{damagedShipData:e,clearedBorders:a}=t,s=document.createElement("div");s.classList.add("ship");for(let t=0;t<e.ship.getLength();t+=1){const e=document.createElement("div");e.classList.add("part"),e.append("x"),s.appendChild(e)}s.classList.toggle("resize");const r=this.pcBoardElement.querySelector(`.spot[data-cord=${JSON.stringify(JSON.stringify(e.cords[0]))}]`);s.style["grid-auto-flow"]=e.isVertical?"row":"column",s.style.position="absolute",r.firstChild&&r.firstChild.remove(),r.appendChild(s),a.forEach((e=>{const t=this.pcBoardElement.querySelector(`.spot[data-cord=${JSON.stringify(JSON.stringify(e))}]`);t.firstChild||(t.append("*"),t.style.pointerEvents="none",t.classList.toggle("resize"))}))}},updatePlBoard(e,t){if(!0===t||t.damagedShipData){const a=this.plBoardElement.querySelector(`.part[data-cord=${JSON.stringify(e)}]`);if(a.append("x"),a.style.backgroundColor="rgb(218, 100, 100)",a.classList.toggle("resize"),t.damagedShipData){const{clearedBorders:e}=t;e.forEach((e=>{const t=this.plBoardElement.querySelector(`.spot[data-cord=${JSON.stringify(JSON.stringify(e))}]`);t.firstChild||(t.append("*"),t.classList.toggle("resize"))}))}}if(!1===t){const t=this.plBoardElement.querySelector(`.spot[data-cord=${JSON.stringify(e)}]`);t.append("*"),t.classList.toggle("resize")}},updateTheBoardsInfo(){const e=(e,t)=>{const a=t.firstElementChild,s=t.lastElementChild,r=e.getName(),n=e.getBoard().getAliveShipsCount();`${a.textContent} Board`!==r&&(a.textContent=`${r} Board`),`Alive Ships: ${s.textContent}`!==n&&(s.textContent=`Alive Ships: ${n}`)};e(this.pl,this.plBoardInfoElement),e(this.pc,this.pcBoardInfoElement)},renderTheBoardsInfo(){const e=()=>{const e=document.createElement("div"),t=document.createElement("h3"),a=document.createElement("h4");return e.classList.add("board-info"),t.classList.add("name"),a.classList.add("alive-ships"),e.appendChild(t),e.appendChild(a),e};this.plBoardInfoElement=e(),this.pcBoardInfoElement=e(),this.$refs.plElement.appendChild(this.plBoardInfoElement),this.$refs.pcElement.appendChild(this.pcBoardInfoElement)},disablePcBoard(){this.pcBoardElement.style.pointerEvents="none"},enablePcBoard(){this.pcBoardElement.style.pointerEvents="auto"}}},le=de;var ce=(0,y.Z)(le,oe,ie,!1,null,"178a4b95",null);const he=ce.exports,pe=(e,t)=>e||t?!e&&t?"Opponent":e:"Your",ye={isVertical:null,adjacentCords:null,backwardCord:null,forwardCord:null,initCord:null,damagedShipsCords:null,isBackWardFirst:null},ue=({player:e})=>{let t,a,s;const r=()=>{({x:a,y:s}=ye.backwardCord),ye.isVertical?(s-=1,ye.damagedShipsCords.find((e=>e.x===a&&e.y===s))&&(s-=1)):(a-=1,ye.damagedShipsCords.find((e=>e.x===a&&e.y===s))&&(a-=1)),$({x:a,y:s})?(ye.backwardCord={x:a,y:s},t=e.receiveAttack({x:a,y:s}),!0===t&&ye.damagedShipsCords.push({x:a,y:s})):(ye.backwardCord=null,t="*"),"*"!==t&&!1!==t||(ye.backwardCord=null)},n=()=>{({x:a,y:s}=ye.forwardCord),ye.isVertical?(s+=1,ye.damagedShipsCords.find((e=>e.x===a&&e.y===s))&&(s+=1)):(a+=1,ye.damagedShipsCords.find((e=>e.x===a&&e.y===s))&&(a+=1)),$({x:a,y:s})?(ye.forwardCord={x:a,y:s},t=e.receiveAttack({x:a,y:s}),!0===t&&ye.damagedShipsCords.push({x:a,y:s})):(ye.forwardCord=null,t="*"),"*"!==t&&!1!==t||(ye.forwardCord=null)};do{if(ye.adjacentCords){const r=Math.floor(Math.random()*ye.adjacentCords.length);if(({x:a,y:s}=ye.adjacentCords[r]),t=e.receiveAttack({x:a,y:s}),!0===t){ye.isVertical=ye.initCord.y!==s;const{initCord:e}=ye;ye.backwardCord={...e},ye.forwardCord={...e},ye.isBackWardFirst=1===Math.floor(2*Math.random()),ye.damagedShipsCords.push({x:a,y:s}),ye.adjacentCords=null}}else!ye.backwardCord||!ye.isBackWardFirst&&ye.forwardCord?!ye.forwardCord||ye.isBackWardFirst&&ye.backwardCord?(a=Z(),s=Z(),t=e.receiveAttack({x:a,y:s})):n():r()}while("*"===t);return!0!==t||ye.backwardCord||ye.forwardCord||ye.adjacentCords||(ye.initCord={x:a,y:s},ye.damagedShipsCords=[],ye.adjacentCords=[],ye.damagedShipsCords.push({x:a,y:s}),$({x:a-1,y:s})&&ye.adjacentCords.push({x:a-1,y:s}),$({x:a+1,y:s})&&ye.adjacentCords.push({x:a+1,y:s}),$({x:a,y:s-1})&&ye.adjacentCords.push({x:a,y:s-1}),$({x:a,y:s+1})&&ye.adjacentCords.push({x:a,y:s+1})),t.damagedShipData&&(ye.isVertical=null,ye.adjacentCords=null,ye.backwardCord=null,ye.forwardCord=null,ye.initCord=null,ye.damagedShipsCords=null,ye.isBackWardFirst=null),{attackInfo:t,cord:{x:a,y:s}}},me=({name:e="",board:t,isPc:a=!1}={})=>{const s=v();if(!t)throw new Error("Player must have a board");if(!t.isReady())throw new Error("Player must have a board with ships");const r=pe(e,a),n=t.receiveAttack.bind(t);a||s.conn.on("data",(e=>{if("attack"===e.id){let t=n({x:e.x,y:e.y});console.log(t),s.conn.send({id:"attackReply",success:t})}}));const o=a?ue:async({x:e,y:t})=>(s.conn.send({id:"attack",x:e,y:t}),await new Promise((e=>{s.conn.once("data",(e=>{if(console.log("Something happened",e),"attackReply"===e.id)return console.log(e),e.success}))})));return{getName:()=>r,getBoard:()=>({...t}),attack:o,receiveAttack:n}},ge=me,xe={name:"App",components:{TheGame:he,TheNavBar:m,TheGameMenu:w,TheGameBoardRedactor:ne},setup(){const e=v();return{GameStore:e}},data:()=>({isGameMenuOpen:!0,isGameBoardRedactorOpen:!1,gameMenuOptions:{resume:{isDisabled:!0}},pl:null,pc:null,plHasDamaged:!1,pcHasDamaged:!1,gameHasAwinner:!1}),methods:{hideGameMenu(){this.isGameMenuOpen=!1},handleShowGameMenu(){this.isGameMenuOpen=!0},openGameBoardRedactor(){this.isGameBoardRedactorOpen=!0},closeGameBoardRedactor(){this.isGameBoardRedactorOpen=!1},handleNewGame(){this.gameHasAwinner=!1,this.gameMenuOptions.resume.isDisabled=!1,this.hideGameMenu(),this.openGameBoardRedactor(),this.$refs.game.resetTheGame()},handleResumeGame(){this.hideGameMenu()},handleStartGame(e,t,a,s){this.closeGameBoardRedactor(),this.pl=ge({board:e}),this.pc=ge({board:a,isPc:!0}),this.$refs.game.initTheGame(t,s,this.pl,this.pc)},async handleRound(e){if(!this.gameHasAwinner){if(this.plHasDamaged=await this.makePlTurn(e),console.log("plHasDamaged",this.plHasDamaged),this.$refs.game.updateTheBoardsInfo(),this.pc.getBoard().isAllShipsSunk())return this.gameHasAwinner=!0,this.gameMenuOptions.resume.isDisabled=!0,this.$refs.game.gameInfo={msg:"You Won!",color:"rgb(43, 197, 87)"},void setTimeout(this.handleShowGameMenu,3e3);if(this.plHasDamaged)return;this.$refs.game.gameInfo={msg:"Pc Turn!",color:"rgb(226, 54, 54)"},this.$refs.game.disablePcBoard();const t=e=>{setTimeout((async()=>{if(this.pcHasDamaged=await this.makePcTurn(),this.$refs.game.updateTheBoardsInfo(),this.pl.getBoard().isAllShipsSunk())return this.gameHasAwinner=!0,this.gameMenuOptions.resume.isDisabled=!0,this.$refs.game.gameInfo={msg:"Pc Won!",color:"rgb(226, 54, 54)"},void setTimeout(this.handleShowGameMenu,3e3);this.pcHasDamaged?t(e):(this.$refs.game.gameInfo={msg:"Your Turn!",color:"rgb(43, 197, 87)"},this.$refs.game.enablePcBoard())}),e)};t(500)}},async makePlTurn(e){const{x:t,y:a}=JSON.parse(e),s=await this.pl.attack({player:this.pc,x:t,y:a});return this.$refs.game.updatePcBoard(e,s),!0===s||s.damagedShipData},async makePcTurn(){const{attackInfo:e,cord:t}=await this.pc.attack({player:this.pl}),{x:a,y:s}=t;return this.$refs.game.updatePlBoard(JSON.stringify({x:a,y:s}),e),!0===e||e.damagedShipData}}},fe=xe;var Se=(0,y.Z)(fe,i,d,!1,null,null,null);const ve=Se.exports;var be=a(8864);s.ZP.use(be.Z);const Ce=new be.Z({theme:{dark:!0}});var Be=a(698);let we=new URL(location.href).searchParams.get("id");s.ZP.use(r.og);const ke=(0,r.WB)(),Oe=new Be._z;(async()=>{let e=await new Promise((e=>{Oe.once("open",(t=>{e(t)}))}));if(console.log("My peer ID is: "+e),s.ZP.prototype.$peer=Oe,we){let e=Oe.connect(we);await new Promise((t=>{let a=setTimeout((()=>{location.replace(location.origin)}),5e3);e.once("open",(()=>{clearTimeout(a),t()}))})),console.log("Opened inviter peer connection"),s.ZP.prototype.$conn=e}s.ZP.config.productionTip=!1,new s.ZP({vuetify:Ce,pinia:ke,render:e=>e(ve)}).$mount("#app")})()}},t={};function a(s){var r=t[s];if(void 0!==r)return r.exports;var n=t[s]={exports:{}};return e[s](n,n.exports,a),n.exports}a.m=e,(()=>{var e=[];a.O=(t,s,r,n)=>{if(!s){var o=1/0;for(c=0;c<e.length;c++){for(var[s,r,n]=e[c],i=!0,d=0;d<s.length;d++)(!1&n||o>=n)&&Object.keys(a.O).every((e=>a.O[e](s[d])))?s.splice(d--,1):(i=!1,n<o&&(o=n));if(i){e.splice(c--,1);var l=r();void 0!==l&&(t=l)}}return t}n=n||0;for(var c=e.length;c>0&&e[c-1][2]>n;c--)e[c]=e[c-1];e[c]=[s,r,n]}})(),(()=>{a.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return a.d(t,{a:t}),t}})(),(()=>{a.d=(e,t)=>{for(var s in t)a.o(t,s)&&!a.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}})(),(()=>{a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{a.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{var e={143:0};a.O.j=t=>0===e[t];var t=(t,s)=>{var r,n,[o,i,d]=s,l=0;if(o.some((t=>0!==e[t]))){for(r in i)a.o(i,r)&&(a.m[r]=i[r]);if(d)var c=d(a)}for(t&&t(s);l<o.length;l++)n=o[l],a.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return a.O(c)},s=globalThis["webpackChunkvue_battleship"]=globalThis["webpackChunkvue_battleship"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var s=a.O(void 0,[998],(()=>a(8094)));s=a.O(s)})();
//# sourceMappingURL=app.84741a5f.js.map