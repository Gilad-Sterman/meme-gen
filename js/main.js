'use strict'

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
}

function onToGallery() {
    renderGallery()
}

function onDownloadImg(elLink) {
    const { selectedImgId, lines } = getMeme()
    drawImg(selectedImgId)
    drawText(lines[0].txt, 10, 50, lines[0].color, lines[0].size)
    drawText(lines[1].txt, 10, 300, lines[1].color, lines[1].size)
    setTimeout(downloadImg, 300, elLink)
} 