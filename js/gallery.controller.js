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
}

function onImgSelect(imgId) {
    setImg(imgId)
    const elEditor = document.querySelector('.editor')
    elEditor.classList.remove('hide')
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('hide')
    renderMeme()
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
}