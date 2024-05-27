from django.contrib import admin
from user.models import UserModel, UserCart, UserCartJunction
# Register your models here..


class UserModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'first_name', 'last_name', 'password',
                    'image', 'date_joined')
    search_fields = ('name', )
    ordering = ('id', )


class UserCartAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user_id',
    )
    list_filter = ('id', )
    ordering = ('id', )


class CartJunctionAdmin(admin.ModelAdmin):
    list_display = ('id', 'cart', 'product', 'quantity')
    list_filter = ('id', )
    ordering = ('id', )


admin.site.register(UserModel, UserModelAdmin)
admin.site.register(UserCart, UserCartAdmin)
admin.site.register(UserCartJunction, CartJunctionAdmin)
