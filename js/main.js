'use strict'

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
}

function onToGallery() {
    renderGallery()
}