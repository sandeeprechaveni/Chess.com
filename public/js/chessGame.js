const socket =io();
const chess=new Chess();
const boardElement =document.querySelector(".chessboard");

let draggedpeice = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard= () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowIndex) => {
        row.forEach((square, SquareIndex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add("square");
            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = SquareIndex;
            if ((rowIndex + SquareIndex) % 2 === 0) {
                squareElement.classList.add("light");
            } else {
                squareElement.classList.add("dark");
            }
            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.innerText = getPeiceUnicode(square);
                pieceElement.classList.add("piece", square.type,
                    square.color === "w" ? "white" : "black"
                );
                pieceElement.draggable = playerRole === square.color;
                pieceElement.addEventListener("dragstart", (e) => {
                    if(pieceElement.draggable){
                    draggedpeice = square;
                     sourceSquare = {row: rowIndex, col: SquareIndex};
                     e.dataTransfer.setData("text/plain", "");
                    }
                });

                pieceElement.addEventListener("dragend", () => {
                    draggedpeice = null;
                    sourceSquare = null;
                });
                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", (e) => {
                e.preventDefault();
            });
            squareElement.addEventListener("drop", (e) => {
                e.preventDefault();
                if (draggedpeice) {
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };
                    handleMove(sourceSquare, targetSquare);
                }
            });
            boardElement.appendChild(squareElement);
        });
    });
    if(playerRole === 'b'){
        boardElement.classList.add("flipped");
    } else{
        boardElement.classList.remove("flipped");
    }
};

const handleMove = (sourceSquare, targetSquare) => {
    const move = {
        from: String.fromCharCode(97 + sourceSquare.col) + (8 - sourceSquare.row),
        to: String.fromCharCode(97 + targetSquare.col) + (8 - targetSquare.row),
        promotion: "q",
    };
    socket.emit("move", move);
};

const getPeiceUnicode = (piece) => {
    // Use outline design for pawns (both white and black)
    // Use filled design for other pieces
    if (piece.type === "p") {
        return "♙"; // Outline pawn for both colors
    }
    
    const unicodeMap = {
        "r": "♜",
        "n": "♞",      
        "b": "♝",
        "q": "♛",
        "k": "♚",
    };
    return unicodeMap[piece.type] || "";    
};

socket.on("playerColor", (color) => {
    playerRole = color === "W" ? "w" : "b";
    renderBoard();
});

socket.on("spectatorRole", () => {
    playerRole = null;
    renderBoard();
});
socket.on("move", (move) => {
    chess.move(move); 
    renderBoard();  
});
socket.on("boardState", (fen) => {
    chess.load(fen);
    renderBoard();
});

renderBoard();