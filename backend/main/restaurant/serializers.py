from rest_framework import serializers
from .models import Categories, Products


class CategoriesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Categories
        fields = ['id', 'category_name', 'category_image']
        extra_kwargs = {
            'category_name': {
                'required': True
            },
            'category_image': {
                'required': True
            }
        }


class ProductsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Products
        fields = ['id', 'name', 'description', 'size', 'price', 'category']
        extra_kwargs = {
            'name': {
                'required': True
            },
            'description': {
                'required': True
            },
            'price': {
                'required': True
            },
            # 'category': {
            #     'required': True
            # }
        }
