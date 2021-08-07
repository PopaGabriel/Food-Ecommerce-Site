from django.contrib import admin
from .models import Restaurant, Location, Tags


class RestaurantAdmin(admin.ModelAdmin):
    search_fields = ['name',
                     'tags',
                     'minimum_value_command']
    list_display = ['email',
                    'name',
                    'minimum_value_command',
                    'personal_site',
                    'phoneNumber',
                    'is_open']

    class Meta:
        model = Restaurant


admin.site.register(Restaurant, RestaurantAdmin)
admin.site.register(Location)
admin.site.register(Tags)
# Register your models here.
