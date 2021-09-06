function create_paragraph(text, classes) {
    let p = document.createElement('p')
    let data = document.createTextNode(text);
    if (classes) {
        p.classList.add(classes)
    }
    p.append(data)
    return p
}

function create_div(classes) {
    let div = document.createElement('div')
    if (classes) {
        div.classList.add(classes)
    }
    return div
}

function create_img(link, classes) {
    let img = document.createElement('img')
    img.src = link
    if (classes) {
        img.classList.add(classes)
    }
    return img
}

function create_header(text, classes, type) {
    let h5 = document.createElement(type)
    h5.append(document.createTextNode(text))
    if (classes) {
        h5.classList.add(classes)
    }
    return h5
}

function create_button(text, classes, func) {
    let button = document.createElement('button')
    button.classList.add(classes)
    button.addEventListener('click', func)
    return button
}
