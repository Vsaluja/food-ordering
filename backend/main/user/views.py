from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserModel, UserCart
from .serializers import UserModelSerializer, UserCartSerializer
from django.contrib.auth import authenticate
# Create your views here.


class UserRegisterView(generics.ListCreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer


class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        test = authenticate(request, email=email, password=password)
        print("my test", test)
        serializer = UserModelSerializer(test)
        print("ser", serializer.data)
        return Response(serializer.data)


class UserCartView(generics.ListCreateAPIView):
    queryset = UserCart.objects.all()
    serializer_class = UserCartSerializer
