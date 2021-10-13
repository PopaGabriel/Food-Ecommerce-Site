from .models import MenuItem
from django import forms


class AddMenuItemForm(forms.ModelForm):
    class Meta:
        model = MenuItem
        fields = ["section",
                  'is_for_adults',
                  'is_available',
                  'name',
                  'price',
                  'discount',
                  'image',
                  'position']
