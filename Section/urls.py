from .views import SectionAddView, SectionDeleteView, SectionUpdateView
from django.urls import path

app_name = 'Sections'

urlpatterns = [
    path('section_add', SectionAddView, name='section_add'),
    path('section_delete', SectionDeleteView, name='delete_section'),
    path('section_update', SectionUpdateView, name='section_update'),
]