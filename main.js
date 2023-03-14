const turnHeading = document.getElementById("turnHeading");
const gameBoard= document.getElementById("gameBoard");
const resetButton= document.getElementById("resetButton");
const gameBoxes = document.getElementsByClassName("gameBox");
const winningPositions = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[7,5,3]];
let Xwin=[]
let Owin=[]
let turnX=true;

const resetGame=()=>{
  gameBoard.style.pointerEvents="all"
  gameBoard.style.display="flex"
  resetButton.style.display="none"
  Xwin=[]
  Owin=[]
  for (const gameBox of gameBoxes) {
    gameBox.style.background="transparent"
    gameBox.style.pointerEvents="all"
  }
  if(turnX){
    turnHeading.innerHTML="X's Turn";
  }
  else{
    turnHeading.innerHTML="O's Turn";
  }
}
resetButton.addEventListener("click",resetGame)
const checkForXWin = ()=>{
  for(const child of winningPositions){
    let c=[false,false,false];
    let i=0;
    for(const elem of child){
      if(Xwin.includes(elem.toString())){
        c[i]=true;
      }
      i++;
    }
    if(c[0] && c[1] && c[2]){
      turnHeading.innerHTML="X's Wins!!";
      gameBoard.style.pointerEvents="none"
      gameBoard.style.display="none"
      resetButton.style.display="block"
      return true;
    }
  }
  return false;
}
const checkForOWin = ()=>{
  for(const child of winningPositions){
    let c=[false,false,false];
    let i=0;
    for(const elem of child){
      if(Owin.includes(elem.toString())){
        c[i]=true;
      }
      i++;
    }
    if(c[0] && c[1] && c[2]){
      turnHeading.innerHTML="O's Wins!!";
      gameBoard.style.pointerEvents="none"
      gameBoard.style.display="none"
      resetButton.style.display="block"
      return true;
    }
  }
  return false;
}
const checkForDraw = ()=>{
  if((Xwin.length+Owin.length)==9){
      turnHeading.innerHTML="Match Draw";
      gameBoard.style.pointerEvents="none"
      gameBoard.style.display="none"
      resetButton.style.display="block"
  }
}
for (const gameBox of gameBoxes) {
  gameBox.addEventListener("click",()=>{
    gameBox.style.pointerEvents="none"
    if(turnX){
      gameBox.style.background="url(./X.svg)"
      gameBoard.classList.replace("boxX","boxO")
      turnHeading.innerHTML="O's Turn";
      Xwin.push(gameBox.getAttribute("data-index"))
    }
    else{
      gameBox.style.background="url(./O.svg)"
      gameBoard.classList.replace("boxO","boxX")
      turnHeading.innerHTML="X's Turn";
      Owin.push(gameBox.getAttribute("data-index"))
    }
    turnX=!turnX
    gameBox.style.backgroundRepeat="no-repeat"
    gameBox.style.backgroundPosition="center"
    let xwins=checkForXWin();
    let owins=checkForOWin();
    if(!xwins && !owins){
      checkForDraw();
    }
  })
}
