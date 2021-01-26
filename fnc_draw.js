'use strict';


function fncTglCls(e,cls) {
  for (const e2 of e) e2.classList.toggle(cls);
}
function stCls(e,cls) {
  for (const e2 of e) {
    e2.classList.remove(cls);
    e2.classList.add(cls);
  }
}
function clrCls(e,cls) {
  for (const e2 of e) e2.classList.remove(cls);
}

function stBg() {
  STG.style.background = `linear-gradient(${gtRdmClr(5,10)}, ${gtRdmClr(5,10)})`;
  FIL.style.background = `linear-gradient(${gtRdmClr(0,4)}, ${gtRdmClr(0,4)})`;
}

// function clrTtl(){
//   T_WRPR.style.display ='none';
//   T_MAIN.innerHTML = '';
//   T_NEXT.innerHTML = '';
//   T_PRE.innerHTML = '';
// }

function stTtl() {
  switch (Where) {
    case 'opening':
      stCls(T_ARY,'op')
      T_NEXT.addEventListener('click', fncClkNxt, {once : true});//addEventListenerは関数かつ引数をつけると削除できなくなる
      break;
    case 'lecture':
      clrCls(T_ARY,'op');
      stCls(T_ARY,'lc');
      T_NEXT.addEventListener('click', fncClkNxt, {once : true});
      break;
    case 'setStage':
      clrCls(T_ARY,'lc');
      stCls(T_ARY,'off');
      P_STG.innerHTML = `stage ${Stg + 1}`;
      break;
    case 'clear':
      clrCls(T_ARY,'off');
      stCls(T_ARY,'clr');
      T_NEXT.addEventListener('click', fncClkNxt, {once : true});
      break;
    case 'continue':
      clrCls(T_ARY,'off');
      stCls(T_ARY,'cnt');
      T_NEXT.addEventListener('click', fncClkNxt, {once : true});
    break;
    default:
      break;
  }//switch (Where) {
}//function constTitle() 


function fncClkEvt(snd,elmt,rslt){

  //連鎖処理
  if (rslt === 'match' && fncCin() === true){
    if(CinNum < 6){
      snd = S_OK[CinNum - 1];
    }else{
      snd = S_OK[S_OK.length - 1];
    }
    P_CIN.style.display = '';
    P_CIN.innerHTML = `${CinNum} chain !`
    P_CIN.animate({opacity: [ 1, 0 ]}, CIN_TM);
  }

  snd.load();
  snd.play();

  DT.innerHTML = gtDt(elmt);

  if (rslt === 'select 1st'){
    Slct1st = elmt;
    Slct1st.style.outline = SLCT_BRDR;
  } else if(rslt === 'cancel 1st' || rslt === 'cancel 1st body'){
    Slct1st.style.outline = 'none';
    Slct1st = null;
  } else if (rslt === 'not match'){
    clrEvt();//ミスした瞬間にevent削除
    elmt.style.outline = SLCT_BRDR;
    setTimeout(()=>{//2ndを選択したことが分かるようにちょっと待ってからライン消す
      Slct1st.style.outline = 'none';
      Slct1st = null;
      elmt.style.outline = 'none';
                                          DT.innerHTML = '';//時間がないので暫定
                                          P_CIN.style.display = 'none';//時間がないので暫定
                                          PreOkTm = null;//時間がないので暫定
                                          CinNum = 0;//時間がないので暫定
      fncGmOvr(elmt);
    },800);
  } else if (rslt === 'match'){
    Slct1st.removeEventListener('click', fncClk);
    Slct1st.style.zIndex = ZI.stage
    elmt.removeEventListener('click', fncClk);
    elmt.style.zIndex = ZI.stage
    elmt.style.outline = SLCT_BRDR;
    let tmpSlct1st = Slct1st;//連鎖のため
    Slct1st = null;
    new Promise((resolve)=>{
      setTimeout(()=>{//2ndを選択したことが分かるようにちょっと待ってからライン消す
        tmpSlct1st.style.outline = 'none';
        tmpSlct1st.style.animation = 'none';
        tmpSlct1st.style.filter = 'grayscale(100%)';
        tmpSlct1st.animate({opacity: [ 1, 0 ]}, CIN_TM);
        elmt.style.outline = 'none';
        elmt.style.animation = 'none';
        elmt.style.filter = 'grayscale(100%)';
        elmt.animate({opacity: [ 1, 0 ]}, CIN_TM);
        PsnRest--;
        stPrm(true);
        if (PsnRest === 0){//stage clear
          setTimeout(() => {
            // console.log('clear');
            Stg++;
            if(Stg % 2 === 0)if(Lv < LV_MX) Lv++;
            Where = 'clear';
                                          DT.innerHTML = '';//時間がないので暫定
                                          P_CIN.style.display = 'none';//時間がないので暫定
                                          PreOkTm = null;//時間がないので暫定
                                          CinNum = 0;//時間がないので暫定
            stTtl();
            stLs();
          }, 1000);
        }
        resolve();
      },150);
    }).then((result)=>{
      setTimeout(() => {
        tmpSlct1st.style.display = 'none';
        elmt.style.display = 'none';
        return result
      }, CIN_TM - 150);
    });
  }//} else if (rslt === 'match'){
}//function fncClkEvt(snd,elmt,rslt)

//連鎖判定
function fncCin(){
  if (PreOkTm === null){
    PreOkTm = new Date;
    CinNum++;
    return false;
  }
  let matchTime = new Date;
  if (matchTime - PreOkTm < CIN_TM){
    PreOkTm = new Date;
    CinNum++;
    return true;
  }else{
    P_CIN.style.display = 'none';
    PreOkTm = null;
    CinNum = 0;
    return false;
  }
}

function fncGmOvr(elmt) {
  elmt.children[0].style.animation = 'flipped 0.2s infinite step-end forwards';
  elmt.style.zIndex = ZI.parameter + 1;
  elmt.style.top = '40vh';
  elmt.style.left = '35vw';
  elmt.style.transform = 'scale(7)';
  elmt.style.transition = '1600ms ease-out';
  cltSnd.pause();
  S_WLK.load();
  S_WLK.play();
  //transitionはstyleで設定した項目にたいして適用される
  new Promise((resolve)=>{
    setTimeout(() => {
      S_W.load();
      S_W.play();
      elmt.children[0].style.animation = 'none';
      BODY.style.filter = 'grayscale(100%)';
      T_WRPR.style.display = '';
      T_WRPR.style.zIndex = ZI.title + 1;
      T_WRPR.style.backdropFilter = 'blur(6px)';
      resolve();
    }, 2000);
  }).then((result)=>{
    setTimeout(() => {
      stSnd(S_GO,false)
      // cltSnd = bfSnd;
      Where = 'continue';
      stTtl();
      // T_MAIN.style.display = '';
      // T_MAIN.innerHTML = 'Failed';
      // T_MAIN.style.fontSize = '10rem';
      // T_MAIN.style.top = '30vh';
      // T_MAIN.style.left = '30vw';
      // T_MAIN.animate({opacity: [ 0, 1 ]}, 1500);
      return result
    }, 1500);
  // }).then((result)=>{
    // setTimeout(() => {
    //   T_NEXT.style.display = '';
    //   T_NEXT.innerHTML = 'One more ! >';
    //   T_NEXT.animate({opacity: [ 0, 1 ]}, 300);
    //   T_NEXT.addEventListener('click', fncClkNxt);//startStageかも
    //   Where = 'continue';
    //   stTtl();
    //   return result
    // }, 3000);
  });//new Promise((resolve)=>{
}//function fncGmOvr(elmt) 


function clrPrm(){
  BODY.style.filter = 'none';
}
function stPrm(setType = false) {
  P_PSN.innerHTML = `Ass hole pair ${PsnRest}`;
  if (setType){
    P_PSN.animate([
      // keyframes
      { transform: 'scale(1.2)' },
      { transform: 'scale(1)' }
    ], {
      // timing options
      duration: 100,
    });
  }
}
