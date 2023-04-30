const cells = document.querySelectorAll(".cell");
const playerTurn = document.getElementById("turn");
const restart = document.getElementById("rstbtn");


const winningCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;


startGame();
 
//for each cell that was chosen go to cellclicked
function startGame(){
    cells.forEach(cells => cells.addEventListener("click", cellClicked));
    restart.addEventListener("click", restartGame);
    playerTurn.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const id = this.getAttribute("index");
    if (options[id] != "" || !running){
        return;
    }else{
        updateCell(this , id);
        checkWinner();
    }   
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}


function checkWinner(){
    let roundWon = false;
    for(i= 0; i<winningCondition.length; i++){
        const condition = winningCondition[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon =true;
            break;
        }
    }

    if(roundWon){
        playerTurn.textContent =  `${currentPlayer} won`;
        running= false;
    } else if(!options.includes("")){
        playerTurn.textContent = `NO ONE WON!`;
    }
    else{
        changePlayer();
    }
}


function changePlayer(){
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    playerTurn.textContent = `${currentPlayer}'s turn`;
}

function restartGame(){
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    playerTurn.textContent =  `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}