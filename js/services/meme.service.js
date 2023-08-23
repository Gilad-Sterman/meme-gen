'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny'] }]
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter Your Text:',
            size: 20,
            color: 'red'
        },
        {
            txt: '',
            size: 20,
            color: 'black'
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    gMeme.selectedLineIdx = 0
}

function setLIneTxt(txt) {
    const { selectedLineIdx } = gMeme
    gMeme.lines[selectedLineIdx].txt = txt
}

function setColor(val) {
    gMeme.lines[gMeme.selectedLineIdx].color = val
}

function fontChange(val) {
    gMeme.lines[gMeme.selectedLineIdx].size += val
    return gMeme.lines[gMeme.selectedLineIdx].size
}

function addLine() {
    gMeme.selectedLineIdx++
    gMeme.lines[gMeme.selectedLineIdx].txt = 'Enter Second Line'
    return gMeme.lines[gMeme.selectedLineIdx].size
}

function switchLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx === 1) ? 0 : 1
    return gMeme.lines[gMeme.selectedLineIdx].size
}