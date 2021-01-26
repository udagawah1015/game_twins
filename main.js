'use strict';


cstStg();

function cstStg(){
    stBg();
    gtLs();
    // clrTtl();
    stTtl();
    clrPsn();
    stPsn();//stage数 * person 作成
    clrEvt();
    stEvt();//click mouseOver/out 設定
    clrPrm();//bodyのgrayScale
    stPrm();//rest person 表示
    setTimeout(()=>stCls(CRTN,'up'), 300);
}


