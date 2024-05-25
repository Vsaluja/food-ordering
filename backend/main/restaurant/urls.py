from django.contrib import admin
from django.urls import path, include
from .views import CategoriesView, ProductsView, ProductDetailView

urlpatterns = [
    path('categories/', CategoriesView.as_view()),
    path('products/', ProductsView.as_view()),
    path('product/<int:pk>/', ProductDetailView.as_view()),
]
