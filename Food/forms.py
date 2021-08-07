from .models import MenuItem
from django import forms


class AddMenuItemForm(forms.ModelForm):
    class Meta:
        model = MenuItem
        fields = ['ingredients',
                  'is_for_adults',
                  'is_available',
                  'name',
                  'price',
                  'discount',
                  'photo']

        photo = forms.ImageField()
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control'}),
            'ingredients': forms.CheckboxSelectMultiple(),
            'price': forms.NumberInput(attrs={'class': 'form-control'}),
            'discount': forms.NumberInput(attrs={'class': 'form-control'}),
        }


class UpdateMenuItemForm(forms.ModelForm):
    class Meta:
        model = MenuItem
        fields = '__all__'

        photo = forms.ImageField()
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control'}),
            'ingredients': forms.CheckboxSelectMultiple(),
            'price': forms.NumberInput(attrs={'class': 'form-control'}),
            'discount': forms.NumberInput(attrs={'class': 'form-control'}),
        }