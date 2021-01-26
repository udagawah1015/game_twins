'use strict';

//フリー素材
//効果音：効果音ラボ https://soundeffect-lab.info/sound/button/
//音楽：(C)PANICPUMPKIN http://pansound.com/panicpumpkin/index.html

const S_TIME = new Date;
window.onload = () => {
  const E_TIME = new Date;
  console.log('loadTime:' + (E_TIME - S_TIME));
}

const ZI = {stage : 0, psn : 1, parameter:2, title : 3};
const IMG_SZ = 100;
const MX_PSN = 2;
const MN_XY = 5;
const POSI = {mnX:5,mnY:5,mxX:60,mxY:80};
const SLCT_BRDR = '7px solid rgb(255,0,0,.9)';
const CIN_TM = 5000;
const LV_MX = 4;

const BODY = document.body;
const CRTN = gtElmCls('crt');
const FIL = gtElmCls('fil')[0];
const STCN = gtElmCls('stg')[0];
const STG = gtElmCls('stg')[1];
const T_ARY = gtElmCls('ttl');
const T_WRPR = gtElmCls('ttl')[0];
const T_MAIN = gtElmCls('ttl')[1];
const T_NEXT = gtElmCls('ttl')[2];
const T_PRE = gtElmCls('ttl')[3];
const P_PSN = gtElmCls('prm')[0];
const P_CIN = gtElmCls('prm')[1];
const P_STG = gtElmCls('prm')[2];
const SND = gtElmCls('snd')[0];
const DT = gtElmCls('dt')[0];

//ダサいけどうまく配列に入れられへんからこれで *効果音ラボ
const S_TC = new Audio('sounds/mouse_over.mp3');
const S_SLCT = new Audio('sounds/select.mp3');
const S_CNCL = new Audio('sounds/cancel.mp3');
const S_NG = new Audio('sounds/not_match.mp3');
const S_W = new Audio('sounds/laugh.mp3');
const S_WLK = new Audio('sounds/footsteps.mp3');
const S_GO = new Audio('sounds/gameover.mp3');
const S_STG = [
  new Audio('sounds/stg1.mp3'),
  new Audio('sounds/stg2.mp3'),
  new Audio('sounds/stg3.mp3'),
  new Audio('sounds/stg4.mp3'),
  new Audio('sounds/stg5.mp3'),
  new Audio('sounds/stg6.mp3'),
  new Audio('sounds/stg7.mp3')
]
const S_OK = [
  new Audio('sounds/match1.mp3'),
  new Audio('sounds/match2.mp3'),
  new Audio('sounds/match3.mp3'),
  new Audio('sounds/match4.mp3'),
  new Audio('sounds/match5.mp3'),
  new Audio('sounds/match6.mp3')
]


let Stg = 0;
let Lv = 0;
let PsnRest;
let Where = 'opening';//現在の画面の状態 lecture,onStage,clear,gameOver
let DupX = new Array;//stPstで同じ位置に設定しないため
let DupY = new Array;
let Slct1st = null;
let PreOkTm = null;
let CinNum = 0;
let cltSnd = null;
let cltVlm = 0.3;

//ITEM[layer][Lv][item]
const ITEM2 = [
    {lyr:0, lv:0, nm:'HispanicAmerican', src:'img/HispanicAmerican.svg'},
    {lyr:0, lv:1, nm:'American', src:'img/American.svg'},
    {lyr:0, lv:2, nm:'AfricanAmerican', src:'img/AfricanAmerican.svg'},
    {lyr:0, lv:3, nm:'AngryMan', src:'img/AngryMan.svg'},
    {lyr:0, lv:4, nm:'StoneMan', src:'img/StoneMan.svg'},

    {lyr:1, lv:0, nm:'bozu', src:'img/bozu.svg'},
    {lyr:1, lv:0, nm:'hige', src:'img/hige.svg'},
    {lyr:1, lv:1, nm:'medama', src:'img/medama.svg'},
    {lyr:1, lv:2, nm:'benpatu', src:'img/benpatu.svg'},
    {lyr:1, lv:2, nm:'makeUp', src:'img/makeUp.svg'},
    // {lyr:1, lv:3, nm:'tooth', src:'img/tooth.svg'},
    // {lyr:1, lv:3, nm:'coolEye', src:'img/coolEye.svg'},
    {lyr:1, lv:3, nm:'pien', src:'img/pien.svg'},
    {lyr:1, lv:4, nm:'baseballFace', src:'img/baseballFace.svg'},
    {lyr:1, lv:4, nm:'camoFace', src:'img/camoFace.svg'},

    {lyr:2, lv:0, nm:'faceMask', src:'img/faceMask.svg'},
    {lyr:2, lv:0, nm:'hundosi', src:'img/hundosi.svg'},
    {lyr:2, lv:1, nm:'glassese', src:'img/glassese.svg'},
    {lyr:2, lv:1, nm:'borderShirt', src:'img/borderShirt.svg'},
    {lyr:2, lv:1, nm:'happa', src:'img/happa.svg'},
    {lyr:2, lv:2, nm:'sunglass', src:'img/sunglass.svg'},
    {lyr:2, lv:2, nm:'taitu', src:'img/taitu.svg'},
    {lyr:2, lv:3, nm:'bikini', src:'img/bikini.svg'},
    {lyr:2, lv:3, nm:'zensinTaitu', src:'img/zensinTaitu.svg'},
    {lyr:2, lv:4, nm:'batman', src:'img/batman.svg'},
    {lyr:2, lv:4, nm:'megamanTaitu', src:'img/megamanTaitu.svg'},
    {lyr:2, lv:4, nm:'robin', src:'img/robin.svg'},

    {lyr:3, lv:0, nm:'goldNeckless', src:'img/goldNeckless.svg'},
    {lyr:3, lv:0, nm:'candy', src:'img/candy.svg'},
    {lyr:3, lv:1, nm:'hamaki', src:'img/hamaki.svg'},
    {lyr:3, lv:1, nm:'cap', src:'img/cap.svg'},
    {lyr:3, lv:2, nm:'helmet', src:'img/helmet.svg'},
    {lyr:3, lv:3, nm:'jasonMask', src:'img/jasonMask.svg'},
    {lyr:3, lv:4, nm:'megamanHead', src:'img/megamanHead.svg'}

];

