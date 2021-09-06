from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from Food_basket.models import Basket
from Restaurants.models import Restaurant
from OrderFood.models import OrderFood
from Food.models import MenuItem
import json


def create_basket_or_item(product_id, quantity, restaurant_id, user):
    restaurant_instance = Restaurant.objects.get(id=restaurant_id)
    basket, created = Basket.objects.get_or_create(restaurant=restaurant_instance,
                                                   user=user,
                                                   sent=False)
    if created:
        basket.save()
    food = get_object_or_404(MenuItem, id=product_id)
    order_item, created = OrderFood.objects.get_or_create(food_basket=basket,
                                                          food=food)
    order_item.quantity = quantity
    order_item.save()
    return basket, order_item


def UpdateBasket(request):
    data = json.loads(request.body)
    product = data['productID']
    action = data['action']
    quantity = data['quantity']
    restaurant_id = data['restaurant_id']

    if quantity is None:
        return JsonResponse('Error None value', safe=False)
    elif quantity == '' or quantity == '0':
        restaurant = Restaurant.objects.get(id=restaurant_id)
        if Basket.objects.filter(restaurant=restaurant, user=request.user, sent=False).exists():
            basket = Basket.objects.get(restaurant=restaurant,
                                        user=request.user,
                                        sent=False)
            food = MenuItem.objects.get(id=product)
            OrderFood.objects.filter(food=food, food_basket=basket).delete()

            if len(OrderFood.objects.filter(food_basket=basket)) == 0:
                basket.delete()
    else:
        create_basket_or_item(product_id=product, quantity=quantity,
                              restaurant_id=restaurant_id, user=request.user)
    data = {
        'type': 'Item was updated'
    }
    return JsonResponse(data, safe=False)
