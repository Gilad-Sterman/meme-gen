'use strict'

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
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
        drawText(line.txt, 10, line.pos, line.color, line.size, line.font)
    })
    elModal.showModal()
}


function onDownloadImg(elLink) {
    downloadImg(elLink)
    const elModal = document.querySelector('dialog')
    elModal.close()
} 