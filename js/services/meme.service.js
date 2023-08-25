'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'celeb'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'baby', 'dog'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'celeb'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny'] },
    { id: 12, url: 'img/12.jpg', keywords: ['celeb'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'celeb'] },
    { id: 14, url: 'img/14.jpg', keywords: ['celeb'] },
    { id: 15, url: 'img/15.jpg', keywords: ['celeb'] }]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter Your Text:',
            size: 30,
            color: 'black',
            pos: 50,
            font: 'Impact',
            align: 'center'
        },
        {
            txt: 'Enter Second Line',
            size: 20,
            color: 'red',
            pos: 300,
            font: 'Impact',
            align: 'center'
        }
    ]
}

var gNextLineIdx = 2
var gDiff = 0
var gStickerDiff = 0
const gStickers = ['😜', '🤣', '😣', '😘']

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 1, 'baby': 4, 'dog': 2, 'celeb': 5 }

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
    gMeme.lines.push(createLine())
    gDiff++
    gMeme.selectedLineIdx = gNextLineIdx
    const size = gMeme.lines[gNextLineIdx].size
    gNextLineIdx++
    return size
}

function addSticker(val) {
    const sticker = gStickers[val]
    gMeme.lines.push(createSticker(sticker))
    gStickerDiff++
    gNextLineIdx++
}

function switchLine(clickedLine) {
    if (clickedLine || clickedLine === 0) {
        gMeme.selectedLineIdx = clickedLine
        return
    }
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
    return gMeme.lines[gMeme.selectedLineIdx].size
}

function setNewLinePos(pos) {
    gMeme.lines[gMeme.selectedLineIdx].pos = pos.y
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
    gNextLineIdx = gMeme.lines.length
    return gMeme.lines[0].size
}

function setFont(val) {
    gMeme.lines[gMeme.selectedLineIdx].font = val
}

function setTextAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
}

function setRandMeme() {
    const randImgId = getRandomIntInclusive(1, gImgs.length - 1)
    gMeme.lines = [{
        txt: getRandTxt(),
        size: 30,
        color: 'black',
        pos: 50,
        font: 'Impact',
        align: 'center'
    }]
    gNextLineIdx = 1
    gDiff = 0
    return randImgId
}

function createLine(val = 'Enter New Text:') {
    return {
        txt: val,
        size: 15,
        color: 'black',
        pos: 150 + (30 * gDiff),
        font: 'Impact',
        align: 'center'
    }
}

function createSticker(val) {
    return {
        txt: val,
        size: 30,
        color: 'black',
        pos: 150 + (30 * gStickerDiff),
        font: 'Impact',
        align: 'center'
    }
}

function resetLInes() {
    gMeme.lines = [
        {
            txt: 'Enter Your Text:',
            size: 30,
            color: 'black',
            pos: 50,
            font: 'Impact',
            align: 'center'
        },
        {
            txt: 'Enter Second Line',
            size: 20,
            color: 'red',
            pos: 300,
            font: 'Impact',
            align: 'center'
        }
    ]
    gMeme.selectedLineIdx = 0
    gDiff = 0
    gNextLineIdx = 2
    gStickerDiff = 0
}