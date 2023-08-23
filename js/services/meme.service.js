'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'baby'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] }]
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter Your Text:',
            size: 20,
            color: 'black'
        },
        {
            txt: '',
            size: 20,
            color: 'red'
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
    gMeme.lines[0].txt = 'Enter Your Text:'
    gMeme.lines[1].txt = ''
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

function switchLine(clickedLine) {
    if (clickedLine === 1) {
        gMeme.selectedLineIdx = 1
        return
    }
    if (clickedLine === 0) {
        gMeme.selectedLineIdx = 0
        return
    }
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx === 1) ? 0 : 1
    return gMeme.lines[gMeme.selectedLineIdx].size
}