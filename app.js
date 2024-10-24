let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn")
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // playerX, playerO

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    removeLine();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "o";
            box.classList.add("o");
            turnO = false;
        } else {
            box.innerText = "x";
            box.classList.add("x");
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach((box) =>  {
        box.disabled = true;
    });
};

const enableBoxes = () => {
     boxes.forEach ((box) =>  {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x", "o");
    });
};

const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                drawLine(pattern);
                setTimeout(() => {
                }, 50); // Delay winner announcement by 500ms
                return;           
            }
        }
    }
};

const drawLine = (pattern) => {
    const line = document.createElement("div");
    line.classList.add("line");

    const startBox = boxes[pattern[0]].getBoundingClientRect();
    const endBox = boxes[pattern[2]].getBoundingClientRect();

    line.style.position = "absolute";
    line.style.backgroundColor = "red";
    line.style.height = "5px";
    line.style.zIndex = "1";

    // Position for horizontal, vertical, or diagonal lines
    if (pattern[0] % 3 === pattern[2] % 3) {
        // Vertical line
        line.style.width = "5px";
        line.style.height = `${Math.abs(endBox.bottom - startBox.top)}px`;
        line.style.top = `${startBox.top}px`;
        line.style.left = `${startBox.left + (startBox.width / 2) - 2.5}px`;
    } else if (Math.floor(pattern[0] / 3) === Math.floor(pattern[2] / 3)) {
        // Horizontal line
        line.style.width = `${Math.abs(endBox.right - startBox.left)}px`;
        line.style.height = "5px";
        line.style.top = `${startBox.top + (startBox.height / 2) - 2.5}px`;
        line.style.left = `${startBox.left}px`;
    } else {
        // Diagonal line
        const diagonalLength = Math.sqrt(Math.pow(endBox.left - startBox.left, 2) + Math.pow(endBox.top - startBox.top, 2));
    
        line.style.width = `${diagonalLength}px`;
        line.style.height = "5px";

    // Position the line to start at the center of the start box
        line.style.top = `${startBox.top + startBox.height / 2}px`;
        line.style.left = `${startBox.left + (startBox.width / 2) - 2.5}px`;

        if (pattern[0] === 0 && pattern[2] === 8) {
            line.style.transform = "rotate(45deg)";
        } else {
            line.style.transform = "rotate(-45deg)";
        }
    }

    document.body.appendChild(line);
};


const removeLine = () => {
    const line = document.querySelector(".line");
    if (line) {
        line.remove();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
