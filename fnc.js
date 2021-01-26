'use strict';

function gtLs() {
  // console.log(localStorage.lv);
  let lsLv = localStorage.lv;
  if(typeof lsLv != 'undefined'){
    Lv = parseInt(lsLv);
    Stg = parseInt(localStorage.stg);
  }
}

function stLs() {
  localStorage.lv = Lv;
  localStorage.stg = Stg;
}

function stSnd(snd,cltCng = true) {
  if(cltSnd != null){
    cltSnd.pause();
    cltSnd.currentTime = 0;
  }
  setTimeout(() => {
    if(cltCng){cltSnd = snd;}
    snd.load();
    snd.play();
    snd.volume = cltVlm;
    snd.loop = true;
  }, 500);
}


function fncSnd() {
  SND.classList.toggle('off')
  if(cltSnd != null){
    if(SND.classList.contains('off')){
      // cltSnd.pause();
      cltVlm = 0;
    }else{
      // cltSnd.play();
      cltVlm = 0.3;
    }
    cltSnd.volume = cltVlm;
  }
}

// function sndFdOut(snd) {
//   //promiseを関数化することで同期的に処理を行う
// // function sleep(fnc,ms,i) {
//   return new Promise((r)=>{
//     setTimeout(() => {
//       r(fnc(i));
//     }, 300);
//   });
// // }

// }

// function sndFdOut(fnc,ms,typ) {
//   return new Promise((r)=>{
//     setTimeout(() => {
//       r(fnc(i,typ));
//     }, ms);
//   });
// }

// function cngVlm(i,typ) {
//   console.log(i);
//   i++;
//   return i;
// }

// let prms = sndFdOut(cngVlm,100,'dwn')//1
// for (let i = 0; i < 10; i++) {
//   prms = prms.then((r)=>sndFdOut(cngVlm,100,'dwn'))
// }


//Where変更とbgm操作して再びstTtlへ戻る 
function fncClkNxt(event) {
  event.stopPropagation();//親要素への伝播を止めるためのメソッド
  S_SLCT.load();
  S_SLCT.play();
  switch (Where) {
    case 'opening':
      Where = 'lecture';
      stTtl();
      break;
    case 'lecture':
      Where = 'setStage';
      stSnd(S_STG[getRdmNum(0,6)]);
      stTtl();
      break;
    case 'clear'://WhereのclearはfncClkEvtでPsnRestが0になったときに設定される
      Where = 'setStage';
      if(Stg % 2 === 0){
        stSnd(S_STG[getRdmNum(0,6)]);
      }
      cstStg();
      break;
    case 'continue':
      Where = 'setStage';
      S_GO.pause();//ダサいけどとりあえずここで暫定処理
      stSnd(cltSnd);
      clrCls(T_ARY,'cnt')
      cstStg();
      break;
    default: break;
  }
}


function clrPsn(){
  let psn = gtElmCls('psn sdw');
  for (let i = psn.length - 1; i > -1; i--) {//逆から削除しないと配列がずれる
    psn[i].remove();
  }
}

//同じIDのキャラは出さない
function stPsn(){
  let aryId = [];
  // PsnRest = MX_PSN * (Lv + 1);
  PsnRest = MX_PSN + Stg;
  for (let i = 0; i < PsnRest; i++) {
    let id = gtId(aryId);
    let id2 = id.map(e=>e.id).reduce((a,b)=>a + b);
    aryId.push(id2);
    let child = cstPsn(i,id);
    let child_partner = child.cloneNode(true);
    STCN.appendChild(child_partner);
    stPst(child);
    stPst(child_partner);
  }
}


//ITEM[layer][Lv][item]
function gtId(aryId){
  let tmpId = '';
  let id =[];
  let lyrMx = gtMxAry(ITEM2,'lyr');
  for (let i = 0; i < 10; i++) {//avoid loop
    for (let l = 0; l <= lyrMx; l++) {//lyr up to 3
      let itm = ITEM2.filter(e=>e.lyr === l && e.lv <= Lv);
      let r =  getRdmNum(0, itm.length - 1);
      tmpId += `${l}${Lv}${r}`;
      id.push({id:`${l}${Lv}${r}`, nm:itm[r].nm, src:itm[r].src})
    }
    if(!aryId.includes(tmpId))break;
    if(i===9)window.alert('err:gtId max count');
  }
  id.sort();//レイヤー順に整える
  return id
}


function cstPsn(num,id){//return returnChild
  let parent;
  let child;
  let returnChild;
  let itemParent;

  //shadow
  // > wrapper *ここでpointerEvents = 'none'をすれば親のshadowをクリックできる
  //    > body
  //    > item

  //psnWrapperに影をつけるためのwrapper
  child = cstElm('div',STCN,'psn sdw crsP ' + num,'absolute',null,null,null,null,IMG_SZ + 'px',IMG_SZ + 'px',ZI.psn);
  returnChild = child;//for return
  parent = child;

  //psnBodyをアニメーションするためのwrapper
  child = cstElm('div',parent,'psn wrp ' + num,'absolute',null,null,null,null,IMG_SZ + 'px',IMG_SZ + 'px',ZI.psn);
  child.style.pointerEvents = 'none';
  itemParent = child;//for add item 
  parent = child;

  id.forEach(e => {
    child = cstElm('img',parent,e.nm,'absolute',null,null,null,null,IMG_SZ + 'px',IMG_SZ + 'px',ZI.psn);
    child.src = e.src;
  });

  return returnChild
}//function cstPsn()


function stPst(target){//すでに配置済みのところに設定しない 
  target.style.top = getRdmNumDpl(POSI.mnY, POSI.mxY, DupY) + '%';
  target.style.left = getRdmNumDpl(POSI.mnX, POSI.mxX, DupX) + '%';
}

function clrEvt(){
  // STG.removeEventListener('click', fncClk);
  STG.removeEventListener('click', fncClk);
  let e = gtElmCls('psn sdw');//psn sdw
  for (let i = e.length - 1; i > -1; i--) {//逆から削除しないと配列がずれる
    e[i].removeEventListener('click', fncClk);
  }
}


function stEvt(){
  STG.addEventListener('click', fncClk);
  SND.addEventListener('click', fncSnd);
  let e = gtElmCls('psn sdw');
  for (const e2 of e) {
    e2.addEventListener('click', fncClk);
  }
}


//switchが使えないのでreturnでifを終了させる
function fncClk(e){
  e.stopPropagation();//psn sdwをclickしたときに親のbody clickが実行されないために必要
  let eSrcE = e.srcElement;
  //select body
  if (eSrcE.className === 'stg bg'){
    if (Slct1st != null){fncClkEvt(S_CNCL,eSrcE,'cancel 1st body');}//cancel 1st
    return;
  }
  //select 1st
  if (Slct1st === null){fncClkEvt(S_SLCT,eSrcE,'select 1st');return;}
  //select 1st again
  if (Slct1st === eSrcE){fncClkEvt(S_CNCL,eSrcE,'cancel 1st');return;}

  //select 2nd *different e 1st
  if (Slct1st != eSrcE){
    //same className
    if (Slct1st.className === eSrcE.className){
      fncClkEvt(S_OK[0],eSrcE,'match');
    } else {
    //different className
      fncClkEvt(S_NG,eSrcE,'not match');
    }
    return;
  }//if (Slct1st[0] != event.srcElement){
}//function fncClk(e)

function gtDt(e) {
  let d = '';
  if (e.className != 'stg bg'){
    let e2 = e.children[0].children;
    for (const e3 of e2) {
      d += e3.className   + '\n';
    }
  }
  return d;
}