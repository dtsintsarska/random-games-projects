let cells = document.querySelectorAll('.cell')
let board = document.querySelector('#board')
let winningMsg = document.querySelector('#winning-msg')
let winningEl = document.querySelector('.winning-message')
let restartBtn = document.querySelector('#restartButton')

let Xmark = 'x'
let Omark = 'o'
let currentMark;

let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame()

function startGame() {

    //clear everything for a new game

    cells.forEach(cell => {
        winningEl.classList.remove('show')
        cell.classList.remove(Omark)
        cell.classList.remove(Xmark)
        cell.removeEventListener('click', markCell)
        cell.addEventListener('click', markCell, {
            once: true
        })

        hoverBoard()

    })
}



function markCell(e) {

    let cell = e.target;
    if (currentMark === Omark) {
        currentMark = Omark;
    } else {
        currentMark = Xmark
    }

    putMarkOnCell(cell, currentMark)

    //checking for winner 
    if (checkWin(currentMark)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        switchTurns()
        hoverBoard()
    }


}

function putMarkOnCell(cell, mark) {
    cell.classList.add(mark)
}

function switchTurns() {
    if (currentMark === Omark) {
        currentMark = Xmark
    } else if (currentMark === Xmark) {
        currentMark = Omark
    }
}

function hoverBoard() {

    board.classList.remove(Omark)
    board.classList.remove(Xmark)
    if (currentMark === Omark) {
        board.classList.add(Omark)
    } else {
        board.classList.add(Xmark)
    }

}

//Winning logic 

function checkWin(currentMark) {
    return winningCombinations.some(comb => {
        return comb.every(index => {
            return cells[index].classList.contains(currentMark)
        })
    })
}

function endGame(draw) {
    if (draw) {
        winningMsg.textContent = 'Draw!'
    } else {
        winningMsg.textContent = `${currentMark.toUpperCase()} is winner!`
    }

    winningEl.classList.add('show')
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(Xmark) || cell.classList.contains(Omark)
    })
}

//Restart game 

restartBtn.addEventListener('click', startGame)