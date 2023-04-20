const statusDisplay = document.querySelector('.status');
let score = [0,0,0];//score array 0 = x, 1 = O, 2 = DRAW
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];




const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;

const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();
//sets the starting person or computer, either X or O
let probability = Math.random()
if(probability <= 0.5){
    currentPlayer = "X";
}else{
    currentPlayer = "O"
    handleComputerMove();    
}

  
function handleCellPlayed(clickedCell, clickedCellIndex) { //handles the updating of board
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function checkWin(){
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            for (let i = 0; i < winCondition.length; i++) {
                document.getElementById(winCondition[i]).style.color = "blue";//sets text color of winning tiles hightlighting them
              }
            // document.getElementById(winCondition[0]).classList.add("winningcell") + gameState[winCondition[0]];
            // document.getElementById(winCondition[1]).className = "winningcell" + gameState[winCondition[1]];
            // document.getElementById(winCondition[2]).className = "winningcell" + gameState[winCondition[2]];

            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        if(currentPlayer=="X"){
            score[0] +=1;
            document.getElementById('xscore').innerHTML = `${score[0]}`
        }
        else{
            score[1]+=1;
            document.getElementById('oscore').innerHTML = `${score[1]}`
        }
        return roundWon;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) { 
        statusDisplay.innerHTML = drawMessage();    
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        score[2]+=1;
        document.getElementById('draws').innerHTML = `${score[2]}`
        return roundDraw;
    }
    return false;

}

function handleResultValidation() {
    checkWin();
    if(gameActive){
        handlePlayerChange();
        handleComputerMove();
    }
}
//ChatGPT provided a solution to the setTimeout
function handleComputerMove(){
    gameActive = false;
    setTimeout(() => {
        pickMove();
        gameActive=true;
        if(!checkWin()){
            handlePlayerChange()
        }
    }, 1000); // 1000ms = 1 second
}

function pickMove(){//this function loops through random numbers and uses that as an index. If index is empty play move
    while(true){
        var move = Math.round(Math.random() * 8)
        if(gameState[move] == ''){
            break
        }
    }
    gameState[move] = currentPlayer//updates gamestate
    
    document.getElementById(move).innerHTML = currentPlayer//updates screen

}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {//checks to see if current cell is available and game is active
         return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    document.querySelectorAll('.cell').forEach(cell => cell.style.color ="rgb(65, 65, 65)");
    // at reset, randomly picks the new first player.
    let probability = Math.random()
        if(probability <= 0.5){
            currentPlayer = "X";
        }else{
            currentPlayer = "O"
            handleComputerMove();    
}
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);