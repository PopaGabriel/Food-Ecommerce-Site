from .views import (SectionAddView,
                    SectionDeleteView,
                    SectionUpdateView,
                    SectionGet,
                    SectionGetAll)
from django.urls import path

app_name = 'Sections'

urlpatterns = [
    path('section_add', SectionAddView, name='section_add'),
    path('section_delete', SectionDeleteView, name='delete_section'),
    path('section_update', SectionUpdateView, name='section_update'),
    path("section_get/section=<int:section>", SectionGet, name="section_get"),
    path("section_get/menu=<int:menu>", SectionGetAll, name="section_get"),
]
