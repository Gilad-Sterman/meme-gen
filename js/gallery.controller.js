'use strict'


function renderGallery() {
    const elEditor = document.querySelector('.editor')
    elEditor.classList.add('hide')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove('hide')
    const imgs = getImgs()
    let strHtmls = imgs.map(img =>
        `<img src="${img.url}" onclick="onImgSelect(${img.id})" alt="">`
    )

    document.querySelector('.gallery').innerHTML = strHtmls.join('')
    renderSearchBy()
}

function onImgSelect(imgId) {
    setImg(imgId)
    const elEditor = document.querySelector('.editor')
    elEditor.classList.remove('hide')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('hide')
    const elSearch = document.querySelector('.search')
    elSearch.classList.add('hide')
    renderMeme()
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    addListeners()
}

function renderSearchBy() {
    const searchMap = getSearchMap()
    const elSearch = document.querySelector('.search')
    let strHtml = `
    <button class="btn-search-by" onclick="onSearchBy('funny')" style="font-size: ${3 * searchMap.funny}px;">Funny</button>
    <button class="btn-search-by" onclick="onSearchBy('cat')" style="font-size: ${3 * searchMap.cat}px;">Cat</button>
    <button class="btn-search-by" onclick="onSearchBy('baby')" style="font-size: ${3 * searchMap.baby}px;">Baby</button>
    <button class="btn-search-by" onclick="onSearchBy('dog')" style="font-size: ${3 * searchMap.dog}px;">Dog</button>
    <button class="btn-search-by" onclick="onSearchBy('celeb')" style="font-size: ${3 * searchMap.celeb}px;">Celeb</button>
    <button class="btn-search-by" onclick="onSearchBy('')" style="color: aquamarine;">All</button>`
    elSearch.innerHTML = strHtml
    elSearch.classList.remove('hide')
}

function onSearchBy(keyWord) {
    setSearchBy(keyWord)
    renderSearchBy()
    renderGallery()
}