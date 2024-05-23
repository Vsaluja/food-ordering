from django.contrib import admin
from django.urls import path, include
from .views import CategoriesView, ProductsView

urlpatterns = [
    path('categories/', CategoriesView.as_view()),
    path('products/', ProductsView.as_view()),
]
