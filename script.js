
let gameSeq=[]; //tarck of game
let userSeq=[]; //track of user
let high=[];
let btns=["yellow","red","purple","green"];

let started=false;
let level=0;

let h2=document.querySelector('h2');
document.addEventListener("keypress",function(){ //after pressing any key on keybord game is started
    if(started==false){
        console.log("game started");  //for start a game only one time
        started=true;

        levelUp();
    }
});


function gameFlash(btn){
    btn.classList.add("btn-flash");//it add the classlish which change that div color to white
    setTimeout(function(){//here it will remove the class after some time
        btn.classList.remove("btn-flash");
    },200);
}

function userFlash(btn){
 btn.classList.add("userflash");
     setTimeout(function(){
            btn.classList.remove("userflash");
    },200);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`level ${level}`; //upadate the level and show in h2


    let randomIdx=Math.floor(Math.random()*3);//it create a index no to chosses the array element of brns array


    let randcolor=btns[randomIdx];//in randcolor it stores the element by its randomIdx


    let randombtn=document.querySelector(`.${randcolor}`);//div of tha color is selected by class name

    gameSeq.push(randcolor);//push color generate by random color
    //console.log(gameSeq);

    gameFlash(randombtn);//we pass that div to gameflash function 
}

function checkAns(index){
    //console.log(level);
    //let index=level-1;

    if(userSeq[index]=== gameSeq[index]){
      if(userSeq.length==gameSeq.length){
       setTimeout( levelUp,1000);
      }

    }else{
           high.push(level);
           let big=highestScore();
           
           h2.innerHTML=`Game Over! <br>Your score was<b> <u>${level}</u></b><br/>Your highest score upto is  <b><u>${big}</u></b><br/>Press any key to start`;
        
          document.querySelector("body").style.backgroundColor="red";
          setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },200);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    userColor= btn.getAttribute("id");
   userSeq.push(userColor);

   checkAns(userSeq.length-1);

}

function highestScore(){
    let score=0;
    for(i of high){
    if(score<i)
        score=i;
   
    }
     return score;
}


let allbtns=document.querySelectorAll('.btn');

for(btn of allbtns){
    btn.addEventListener("click",btnPress);//after adding this event listener it call the function
}


function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}