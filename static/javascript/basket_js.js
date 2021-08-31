let addBtns = document.getElementsByName('button-add-cart')

for (i = 0; i < addBtns.length; i++) {
    addBtns[i].addEventListener('click', function () {
        let productID = this.dataset.product;
        let action = this.dataset.action;
        let quantity = document.getElementById(productID+" form_quantity")[0].value
        let restaurant_id = document.getElementsByName('restaurant_id_input')[0].value
        if (user === 'AnonymousUser') {
            console.log('Not logged in')
        } else {
            updateItemOrder(productID, action, quantity, restaurant_id)
        }
    })

    function updateItemOrder(productID, action, quantity, restaurant_id) {
        let url = 'update_basket/'

        fetch(url, {
            method:'POST',
            headers:{
                'Content-Type':'application.json',
                'X-CSRFToken': csrftoken,
            },
            body:JSON.stringify({ 'productID':productID,
                                        'action':action,
                                        'quantity':quantity,
                                        'restaurant_id': restaurant_id})
            }
        ).then((response)=>{
            return response.json();
        }).then((data)=>{
            // location.reload()
        console.log(data)});
    }
}
