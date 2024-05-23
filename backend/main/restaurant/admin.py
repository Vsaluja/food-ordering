from django.contrib import admin
from restaurant.models import Categories, Products
# Register your models here..


class CategoriesAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'category_name',
        'category_image',
    )
    search_fields = ('category_name', )
    ordering = ('id', )


class ProductsAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'description',
        'price',
        'size',
        'category_id',
    )
    list_filter = ('name', )
    ordering = ('id', )


admin.site.register(Categories, CategoriesAdmin)
admin.site.register(Products, ProductsAdmin)
