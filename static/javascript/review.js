import './element_creation'

let add_review_button = document.getElementsByName('button-add-review')[0]
let show_review_form = document.getElementsByName('add_review_first_button')[0]
let review_like_buttons = document.getElementsByName('review_like_button')
let review_dislike_buttons = document.getElementsByName('review_dislike_button')

const url_review = 'add_review/'
const url_review_like_dislike = '/likes/' + '0/' + 'like_dislike_review'

add_review_button.addEventListener('click', async function (e) {
        e.preventDefault()
        let restaurant = document.getElementsByName('restaurant_id_input')[0].value
        let action = this.dataset.action;
        let title = document.getElementsByName('review_title')[0].value
        let body = document.getElementsByName('review_body')[0].value
        let mark = document.getElementsByName('review_mark')[0].value
        if (user === 'AnonymousUser') {
            console.log('Not logged in')
        } else {
            let data = await add_review_func(restaurant, title, body, mark, action)
            create_review_html(title, body, mark, data)
        }
    }
)

async function add_review_func(restaurant, title, body, mark, action) {
    let data = await fetch(url_review, {
            method: 'POST',
            headers: {
                'Content-Type': 'application.json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'restaurant': restaurant,
                'title': title,
                'body': body,
                'mark': mark,
                'action': action
            })
        }
    );
    return await data.json()
}

show_review_form.addEventListener('click', function (e) {
    e.preventDefault()
    let form_review = document.getElementById('add_review_form')
    if (form_review.classList.contains('hide')) {
        form_review.classList.remove('hide')
        form_review.classList.add('hint')
    } else {
        form_review.classList.remove('hint')
        form_review.classList.add('hide')
    }
})

for (let i = 0; i < review_like_buttons.length; i++) {
    review_like_buttons[i].addEventListener('click', function (e) {
        e.preventDefault()
        fetch(url_review_like_dislike, {
            method: 'Post',
            headers: {
                'Content-Type': 'application.json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'action': 'like',
                'review': review_like_buttons[i].value,
            })
        }).then((response) => {
            return response.json()
        }).then((data) => {
            let label = document.getElementById('' + review_like_buttons[i].value + 'review_label')
            label.innerHTML = data['likes'] + ' - ' + data['dislikes']
        });
    })
}
for (let i = 0; i < review_dislike_buttons.length; i++) {
    review_dislike_buttons[i].addEventListener('click', function (e) {
        e.preventDefault()
        fetch(url_review_like_dislike, {
            method: 'Post',
            headers: {
                'Content-Type': 'application.json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'action': 'dislike',
                'review': review_like_buttons[i].value,
            })
        }).then((response) => {
            return response.json()
        }).then((data) => {
            let label = document.getElementById('' + review_like_buttons[i].value + 'review_label')
            label.innerHTML = data['likes'] + ' - ' + data['dislikes']
        });
    })
}

function create_review_html(title, body, mark, data) {
    let parent_div = create_div('')
    let review_body = create_paragraph(body, '')
    let review_title = create_header(title + "   Mark:" + mark, '', 'h5')
    let review_img = create_img(data['image'], '')

    parent_div.appendChild(review_img)
    parent_div.appendChild(review_title)
    parent_div.appendChild(review_body)

    let destination = document.getElementById('reviews_div')
    destination.insertBefore(parent_div, destination.firstChild)
    console.log(data)
}

async function delete_review_button(value) {
    let data = await fetch(url, {
        method: {'POST'},
        headers: {
            'Content-Type': 'application.json',
            'X-CSRFToken': csrftoken,
        },
        body: {
            'id': value,
            'id_user': user_id
        }
    })
    return await data.json()
}

