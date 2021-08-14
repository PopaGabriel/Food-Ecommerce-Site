from django.contrib import admin
from .models import Basket


class BasketAdmin(admin.ModelAdmin):
    list_display = ['restaurant', 'user', 'get_total_price']


admin.site.register(Basket, BasketAdmin)
# Register your models here.
