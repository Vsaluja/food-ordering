from rest_framework import serializers
from .models import Categories, Products


class CategoriesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Categories
        fields = ['id', 'category_name', 'category_image']
        extra_kwargs = {
            'category_name': {
                'write_only': True
            },
            'category_image': {
                'required': True
            }
        }


class ProductsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Products
        fields = ['id', 'name', 'description', 'size', 'price', 'category_id']
        extra_kwargs = {
            'name': {
                'write_only': True
            },
            'description': {
                'required': True
            },
            'price': {
                'required': True
            },
            # 'size': {
            #     'required': False
            # },
            'category_id': {
                'required': True
            }
        }
