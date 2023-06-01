let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Winning Pattern Array
let winningPattern = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
]

// Player "X" plays first
let xTurn = true;
let count = 0;

// Diable all buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    // enable popup
    popupRef.classList.remove("hide");
}

// Enable all buttons (for New Game and Restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    // disable popup
    popupRef.classList.add("hide");
}

// New Game
newgameBtn.addEventListener('click', () => {
    count = 0;
    enableButtons();
} )
restartBtn.addEventListener('click', () => {
    count = 0;
    enableButtons();
} )

// This function is executed when a player wins
const winFunction = (letter) => {
    disableButtons();
    if (letter == "X"){
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    }
    else{
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    }
};

// Function for draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
}

// Win logic
const winChecker = () => {
    // Loop through all winning patterns
    for(let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText
        ];
        // Check if elements are filled 
        // If 3 empty elements are same and would give win 
        if (element1 != "" && (element2 != "") && (element3 != "")) {
            if(element1 == element2 && element2 == element3){
                // If all the buttons have same values then passon win function
                winFunction(element1);
            }
        }
    }
};

//Display X/O on click
btnRef.forEach((element) => {
    element.addEventListener('click', () => {
        if(xTurn){
            xTurn = false;
            // Display X
            element.innerText = "X";
            element.disabled = true;
        }
        else{
            xTurn = true;
            // Display O
            element.innerText = "O";
            element.disabled = true;
        }
        // Increament count on each click
        count += 1;
        if (count === 9) {
            drawFunction();
        }
        // Check for wins every click
        winChecker();
    })
})
// Enable buttons and popup on page load
window.onload = enableButtons;