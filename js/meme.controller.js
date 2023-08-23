'use strict'

let gElCanvas
let gCtx
let gTxtColor = 'black'

function renderMeme() {
    const currMeme = getMeme()
    const { selectedImgId, selectedLineIdx, lines } = currMeme
    drawImg(selectedImgId)
    drawText(lines[selectedLineIdx].txt)
}

function onWriteTxt(txt) {
    setLIneTxt(txt)
    renderMeme()
}

function drawImg(img) {
    const elImg = new Image()
    elImg.src = `img/${img}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawText(text, x = 10, y = 50) {
    gCtx.lineWidth = 2
    // gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = gTxtColor
    gCtx.font = '40px Arial'
    // gCtx.textAlign = 'center'
    // gCtx.textBaseline = 'middle'
    setTimeout(() => {
        gCtx.fillText(text, x, y)
        gCtx.strokeStyle = 'black'
        // gCtx.strokeRect(x - 5, y - 40, 340, 50)
        // gCtx.strokeText(text, x, y)
    }, 50)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    // Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth - 5
    renderMeme()
}