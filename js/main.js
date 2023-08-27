'use strict'

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
}

function onRandMeme() {
    const imgId = setRandMeme()
    onImgSelect(imgId)
}

function onToGallery() {
    resetLInes()
    renderGallery()
}

function readyForDownload() {
    const { selectedImgId, lines } = getMeme()
    const elModal = document.querySelector('dialog')
    drawImg(selectedImgId)
    lines.forEach(line => {
        drawText(line.txt, line.pos, line.color, line.size, line.font, line.align, line.posX)
    })
    elModal.showModal()
}

function onDownloadImg(elLink) {
    downloadImg(elLink)
    const elModal = document.querySelector('dialog')
    elModal.close()
}

function toggleMenu(elBtn) {
    elBtn.innerText = (elBtn.innerText === 'X') ? '☰' : 'X'
    const elDropMenu = document.querySelector('.drop-menu')
    elDropMenu.classList.toggle('hide')
}