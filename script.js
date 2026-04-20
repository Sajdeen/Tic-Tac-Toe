let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let newbtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let modal = document.getElementById("drawModal");
let closeBtn = document.getElementById("closeModal");
let gameArea = document.querySelector(".game-area");

let turnO = true;
 const winningPatterns = [[0,1,2],
                        [0,3,6],
                        [0,4,8],
                        [1,4,7],
                        [2,5,8],
                        [2,4,6],
                        [3,4,5],
                        [6,7,8]
                
];

const reset =()=>{
   turnO=true;
enableBoxes();
modal.classList.add("hide");
msgContainer.classList.add("hide");
   gameArea.classList.remove("hide-all"); 
clearInterval(crackerInterval);
}
 
const draw=()=>{
 /*  msg.innerText = "It's a Draw!";*/
   modal.classList.remove("hide");
 console.log("DRAW TRIGGERED");
   disableBoxes();
};

closeBtn.addEventListener("click", () =>{
modal.classList.add("hide");
reset();
});

 boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        console.log("clcked");
       if(turnO){
        box.innerText="X";
        turnO=false;
       }else{
        box.innerText ="O";
        turnO=true;
       }
   box.disabled = true;
       checkWinner();
    });
 });

 const disableBoxes = ()=>{
   for(let box of boxes){
     box.disabled= true;
   }
 };
 const enableBoxes=()=>{
   for(let box of boxes){
      box.disabled = false;
      box.innerText="";
   }
 };


/*const showWinner =(winner)=>{
   msg.innerText = `Congratulaion! Winner is ${winner}`;
   msgContainer.classList.remove("hide");
gameArea.classList.ass("hide-all");
showCrackers();
   disableBoxes();
};*/

const showWinner =(winner)=>{
   msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
   msgContainer.classList.remove("hide");

   gameArea.classList.add("hide-all");   // ✅ FIXED

   showCrackers();   // 🎆

   disableBoxes();
};

/*let crackerInterval;
function showCrackers(){
   for(let i = 0; i < 25; i++){
      let cracker = document.createElement("div");
      cracker.classList.add("cracker");

      cracker.style.left = Math.random() * 100 + "vw";
      cracker.style.top = Math.random() * 100 + "vh";

      document.body.appendChild(cracker);  // ✅ FIXED

      setTimeout(() => cracker.remove(), 1000);
   }
},200);*/

let crackerInterval;

function showCrackers(){

   crackerInterval = setInterval(() => {

      for(let i = 0; i < 25; i++){
         let cracker = document.createElement("div");
         cracker.classList.add("cracker");

         cracker.style.left = Math.random() * 100 + "vw";
         cracker.style.top = Math.random() * 100 + "vh";

         document.body.appendChild(cracker);

         setTimeout(() => cracker.remove(), 1000);
      }

   }, 200);   // ✅ correct place
}

/*function showCrackers(){
   for(let i = 0; i<25; i++){
      let cracker = document.createElement("div");
      cracker.classList.add("cracker");
      cracker.style.left = Math.random() * 100 +"vw";
    cracker.style.top = Math.random() * 100 +"vw";
   
    document.body.apppendChild(cracker);
    setTimeout(() => cracker.remove(), 1000);
   }
}*/





 const checkWinner = () =>{
   let isWinner = false;
    for(let pattern of winningPatterns){
      
        let pos1= boxes[pattern[0]].innerText;
      let pos2= boxes[pattern[1]].innerText;
      let pos3= boxes[pattern[2]].innerText;

      if(pos1 != "" && pos2 != "" && pos3 != ""){
         if(pos1 === pos2  &&  pos2 === pos3){
            console.log("Winner", pos2);
              isWinner = true;   // ✅ FIX
            showWinner(pos1);
            return;
         }
      }

    }
    let  isDraw= true;
      for(let box of boxes){
         if(box.innerText === ""){
            isDraw = false;
            break;
         }  
      }

      if(!isWinner && isDraw){   
           draw();
      
      }  

   };

newbtn.addEventListener("click",reset);
resetbtn.addEventListener("click",reset);

