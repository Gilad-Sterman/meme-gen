'use strict'

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)
    renderGallery()
}

function onToGallery() {
    renderGallery()
}