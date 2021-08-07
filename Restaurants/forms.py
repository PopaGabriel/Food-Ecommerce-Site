from django import forms
from .models import Restaurant, Tags


class CreateRestaurantForm(forms.ModelForm):
    class Meta:
        fields = ['name', 'email', 'phoneNumber', 'tags', 'main_image']
        model = Restaurant

        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.TextInput(attrs={'class': 'form-control'}),
            'phoneNumber': forms.TextInput(attrs={'class': 'form-control'}),
            'tags': forms.CheckboxSelectMultiple(),
        }


class EditRestaurantForm(forms.ModelForm):
    class Meta:
        fields = '__all__'
        model = Restaurant
        main_image = forms.ImageField()
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.TextInput(attrs={'class': 'form-control'}),
            'phoneNumber': forms.TextInput(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control'}),
            'personal_site': forms.TextInput(attrs={'class': 'form-control'}),
            'tags': forms.CheckboxSelectMultiple(),
            'minimum_value_command': forms.NumberInput(attrs={'class': 'form-control'}),
            'is_open': forms.NullBooleanSelect(attrs={'class': 'form-control'}),
            'delivery': forms.NullBooleanSelect(attrs={'class': 'form-control'})
        }

