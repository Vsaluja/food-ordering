from .models import UserModel
from rest_framework import serializers
from .models import UserCart


class UserModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        fields = [
            'id', 'email', 'image', 'first_name', 'last_name', 'password'
        ]
        extra_kwargs = {
            'password': {
                'write_only': True
            },
            'email': {
                'required': True
            },
            'first_name': {
                'required': True
            },
            'last_name': {
                'required': True
            }
        }

    def create(self, validated_data):
        # print("val", validated_data)
        # email = validated_data['email']
        # validated_data['username'] = email
        print("val", validated_data)
        # this .create_user method is the method we override in the UserModelManager() above
        user = UserModel.objects.create_user(**validated_data)
        return user


class UserCartSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserCart
        fields = "__all__"
