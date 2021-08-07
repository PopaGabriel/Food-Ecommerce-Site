from django.forms.models import ModelForm
from .models import (Section,
                     Menu,)


class AddSectionForm(ModelForm):
    class Meta:
        model = Section
        fields = ['name']


class AddMenuForm(ModelForm):
    class Meta:
        model = Menu
        fields = ['type']
