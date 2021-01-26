'use strict';



//長いので短くしてるだけ
function gtElmCls(e) {
  return document.getElementsByClassName(e);
}

function getRdmNum(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//こんなん共通でつかえんやろ
function getRdmNumDpl(min, max, duplicate){//duplicate is array
  let loopNum = 1;
  let loopLength = max - min;
  // console.log('loopLength:' + loopLength);
  while(true){
    let num = Math.floor(Math.random() * (max - min + 1) + min);
    if (!duplicate.includes(num)){
      // duplicate.push(num);
      // console.log('loopNumber:' + loopNum);
      return num
    }
    if (loopNum === loopLength){
      return null}
    loopNum++;
  }
}

function cstElm(tag,parent,childClassName,position,top,bottom,left,right,width,height,zIndex){//return child
  let child;
  child = document.createElement(tag);
  child.className = childClassName;
  child.style.position = position;
  child.style.top = top;
  child.style.bottom = bottom;
  child.style.left = left;
  child.style.right = right;
  child.style.width = width;
  child.style.height = height;
  child.style.zIndex = zIndex;
  parent.appendChild(child);
  return child
}

function gtRdmClr(a=0,b=15) {
  let id = '#';
  for (let i = 0; i < 6; i++) {
    let t = getRdmNum(a,b).toString(16);
    id += t;
  }
  return id;
}

function gtMxAry(ary,mmb){
  let num = ary.map(e=>e[mmb]);
  return num.reduce((a,b)=>Math.max(a,b));//アロー関数はreturn省略可
}

function stCntr(e) {
  let x = e.clientWidth;
  let x2 = window.innerWidth;
  let x3 = x2 / 2 - (x / 2);
  e.style.left = `${x3}px`;
}
function stMdl(e) {
  let y = e.clientHeight;
  let y2 = window.innerHeight;
  let y3 = y2 / 2 - (y / 2);
  e.style.top = `${y3}px`;
}

function hint() {
  console.log(Object.getPrototypeOf(document));
};

