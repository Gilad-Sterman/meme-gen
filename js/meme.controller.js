'use strict'

let gElCanvas
let gCtx
let isDrag = false

function renderMeme() {
    const currMeme = getMeme()
    const { selectedImgId, selectedLineIdx, lines } = currMeme
    const pos = lines[selectedLineIdx].pos
    const fontSize = lines[selectedLineIdx].size
    setPlaceHolder()
    drawImg(selectedImgId)
    lines.forEach(line => {
        drawText(line.txt, line.pos, line.color, line.size, line.font, line.align)
    })
    drawOutline(pos, fontSize)
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

function drawText(text, y, color, size, font, align) {
    setTimeout(() => {
        gCtx.lineWidth = 1
        gCtx.font = `${size}px ${font}`
        gCtx.textAlign = align
        gCtx.fillStyle = color
        gCtx.fillText(text, gElCanvas.width / 2, y)
        gCtx.strokeStyle = 'white'
        gCtx.strokeText(text, gElCanvas.width / 2, y)
    }, 50)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 20
    renderMeme()
}

function drawOutline(pos, size) {
    let y = pos - size
    setTimeout(() => {
        gCtx.strokeStyle = 'white'
        gCtx.strokeRect(5, y, gElCanvas.width - 10, 1.5 * size)
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
        // document.body.style.cursor = 'grabbing'
        // setNewLinePos(pos)
        // renderMeme()
        return
    }
    document.body.style.cursor = (isDrag) ? 'grabbing' : 'grab'
    // document.body.style.cursor = 'grabbing'
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