'use strict'

let gElCanvas
let gCtx
// let gTxtColor = 'black'
// let gFontSize = 20

function renderMeme() {
    const currMeme = getMeme()
    const { selectedImgId, selectedLineIdx, lines } = currMeme
    setPlaceHolder()
    drawImg(selectedImgId)
    drawText(lines[0].txt, 10, 50, lines[0].color, lines[0].size)
    drawText(lines[1].txt, 10, 300, lines[1].color, lines[1].size)
    drawOutline(selectedLineIdx)
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

function drawText(text, x = 10, y = 50, color, size) {
    setTimeout(() => {
        gCtx.font = `${size}px Arial`
        gCtx.fillStyle = color
        gCtx.fillText(text, x, y)
        gCtx.strokeStyle = color
        gCtx.strokeText(text, x, y)
    }, 50)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 10
    renderMeme()
}

function drawOutline(lineIdx) {
    let y = 10
    if (lineIdx === 1) {
        y = 260
    }
    setTimeout(() => {
        gCtx.strokeStyle = 'white'
        gCtx.strokeRect(5, y, 340, 60)
    }, 50)
}

function onSetColor(color) {
    setColor(color)
}

function onFontChange(val) {
    const fontSize = fontChange(val)
    document.querySelector('.font-size').innerText = fontSize
}

function onAddLine() {
    const newLineSize = addLine()
    document.querySelector('.font-size').innerText = newLineSize
    renderMeme()
}

function onSwitchLine() {
    const lineSize = switchLine()
    // const { selectedLineIdx, lines } = getMeme()
    document.querySelector('.font-size').innerText = lineSize
    setPlaceHolder()
    renderMeme()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mousemove', onMove)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    // gElCanvas.addEventListener('touchmove', onMove)
    // gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (pos.x > 5 && pos.x < 345 && pos.y > 10 && pos.y < 70) switchLine(0)
    if (pos.x > 5 && pos.x < 345 && pos.y > 260 && pos.y < 320) switchLine(1)
    // console.log(pos)
    renderMeme()
}

function setPlaceHolder(isClear){
    const { selectedLineIdx, lines } = getMeme()
    const elInputTxt = document.querySelector('.text-box')
    elInputTxt.value = lines[selectedLineIdx].txt
}