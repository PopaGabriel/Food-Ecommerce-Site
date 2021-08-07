from django import forms
from django.contrib.auth import get_user_model
from.models import Review


class BaseReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['title', 'body', 'is_anonymous', 'mark']

        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'body': forms.TextInput(attrs={'class': 'form-control'}),
            'is_anonymous': forms.NullBooleanSelect(attrs={'class': 'form-control'}),
            'mark': forms.NumberInput(attrs={'class': 'form-control'})
        }
