'use strict'

let gElCanvas
let gCtx
let isDrag = false

function renderMeme() {
    const currMeme = getMeme()
    const { selectedImgId, selectedLineIdx, lines } = currMeme
    const pos = lines[selectedLineIdx].pos
    const posX = lines[selectedLineIdx].posX
    const fontSize = lines[selectedLineIdx].size
    const txt = lines[selectedLineIdx].txt
    setPlaceHolder()
    drawImg(selectedImgId)
    lines.forEach(line => {
        const posX = line.posX
        drawText(line.txt, line.pos, line.color, line.size, line.font, line.align, posX)
    })
    drawOutline(pos, fontSize, txt, posX)
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

function drawText(text, y, color, size, font, align, x) {
    setTimeout(() => {
        gCtx.lineWidth = 0.2
        gCtx.font = `${size}px ${font}`
        gCtx.textAlign = align
        gCtx.fillStyle = color
        gCtx.fillText(text, x, y)
        gCtx.strokeStyle = 'white'
        gCtx.strokeText(text, x, y)
    }, 50)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 20
    renderMeme()
}

function drawOutline(pos, size, txt, posX) {
    setTimeout(() => {
        let y = pos - size
        let width = gCtx.measureText(txt).width
        let length = width + 3 * size
        gCtx.strokeStyle = 'white'
        gCtx.strokeRect(posX - length / 2, y, length + size, 1.5 * size)
    }, 50)
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onFontChange(val) {
    const fontSize = fontChange(val)
    document.querySelector('.font-size').innerText = fontSize
    renderMeme()
}

function onAddLine() {
    const newLineSize = addLine()
    document.querySelector('.font-size').innerText = newLineSize
    setFontSelect()
    renderMeme()
}

function onSwitchLine() {
    const lineSize = switchLine()
    document.querySelector('.font-size').innerText = lineSize
    setPlaceHolder()
    setFontSelect()
    renderMeme()
}

function onRemoveLine() {
    const fontSize = removeLine()
    setPlaceHolder()
    setFontSelect()
    renderMeme()
    document.querySelector('.font-size').innerText = fontSize
}

function onSetFont(val) {
    setFont(val)
    renderMeme()
}

function onAddSticker(val) {
    addSticker(val)
    renderMeme()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    const { lines, selectedLineIdx } = getMeme()
    const clickedLineIdx = lines.findIndex(line => {
        return pos.x > 5 && pos.x < 345 && pos.y > (line.pos - line.size)
            && pos.y < (line.pos + line.size)
    })
    if (clickedLineIdx === -1) return
    isDrag = true
    switchLine(clickedLineIdx)
    document.body.style.cursor = 'grabbing'
    document.querySelector('.font-size').innerText = lines[clickedLineIdx].size
    setFontSelect()
    renderMeme()
}

function onMove(ev) {
    const pos = getEvPos(ev)
    const { lines } = getMeme()
    const hoveredLineIdx = lines.findIndex(line => {
        return pos.x > 5 && pos.x < 345 && pos.y > (line.pos - line.size)
            && pos.y < (line.pos + line.size)
    })
    if (hoveredLineIdx === -1) {
        if (!isDrag) {
            document.body.style.cursor = 'default'
            return
        }
        return
    }
    document.body.style.cursor = (isDrag) ? 'grabbing' : 'grab'
}

function onUp(ev) {
    if (!isDrag) return
    isDrag = false
    const pos = getEvPos(ev)
    setNewLinePos(pos)
    document.body.style.cursor = 'default'
    renderMeme()
}

function setPlaceHolder() {
    const { selectedLineIdx, lines } = getMeme()
    const elInputTxt = document.querySelector('.text-box')
    elInputTxt.value = lines[selectedLineIdx].txt
}

function setFontSelect() {
    const { selectedLineIdx, lines } = getMeme()
    const elFontSelect = document.querySelector('.font-select')
    elFontSelect.value = lines[selectedLineIdx].font
}

function onTextAlign(align) {
    setTextAlign(align)
    renderMeme()
}