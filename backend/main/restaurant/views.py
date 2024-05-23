from django.shortcuts import render
from rest_framework import generics
from .serializers import Categories, Products, CategoriesSerializer, ProductsSerializer
# Create your views here.


class CategoriesView(generics.ListCreateAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer


class ProductsView(generics.ListCreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
