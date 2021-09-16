from .views import SectionAddView
from django.urls import path

app_name = 'Sections'

urlpatterns = [
    path('section_add', SectionAddView, name='section_add'),
]