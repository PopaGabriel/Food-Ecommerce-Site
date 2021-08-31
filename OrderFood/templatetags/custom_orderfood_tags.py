from django import template

register = template.Library()


@register.filter(name='contains_order')
def contains(value, arg):
    item = value.filter(food=arg).first()
    return 0 if item is None else item.quantity

