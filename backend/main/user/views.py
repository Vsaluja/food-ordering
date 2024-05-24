from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserModel, UserCart
from .serializers import UserModelSerializer, UserCartSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken  # can use this to create a new JWT
import requests
from django.contrib.auth import get_user_model
# from simple_jwt import jwt
import jwt
from django.conf import settings
# Create your views here.


class UserRegisterView(generics.ListCreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer


class UserFindView(generics.RetrieveUpdateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer


class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        authenticatedUser = authenticate(request,
                                         email=email,
                                         password=password)

        if authenticatedUser is not None:
            print("my test", authenticatedUser)
            serializer = UserModelSerializer(authenticatedUser)
            print("ser", serializer.data)

            response = requests.post("http://127.0.0.1:8000/api/token/", {
                "email": email,
                "password": password
            })

            response = response.json()
            tokens = {
                'access': response['access'],
                'refresh': response['refresh']
            }
            print('tokens', tokens)
            return Response({
                "success": True,
                "message": "User logged in",
                "user": serializer.data,
                "tokens": tokens
            })

        return Response({
            "success": False,
            "message": "Invalid login credentials"
        })


class OAuthLogin(APIView):

    def post(self, request):
        try:
            email = request.data.get('email')
            first_name = request.data.get('first_name')
            UserModel = get_user_model()

            # If user is there then its data will get stored in user variable if hes not there then will be created and his data will get stored in user variable
            user, created = UserModel.objects.get_or_create(
                email=email, defaults={'first_name': first_name})

            accessToken = AccessToken.for_user(user)
            refreshToken = AccessToken.for_user(user)
            token = {"access": str(accessToken), "refresh": str(refreshToken)}
            serialize = UserModelSerializer(user)

            # If the user already exists, just return a success message
            return Response({
                "success": True,
                "message": "User logged in",
                "tokens": token,
                "user": serialize.data
            })
        except Exception as e:
            print("error in oauth login", e)
            return Response({
                "success": False,
                "message": "An error occurred",
            })


class DecodeToken(APIView):

    def post(self, request):

        try:
            secret_key = settings.SECRET_KEY
            token = request.data.get('token')
            decode = jwt.decode(token, secret_key, "HS256")

            if decode is not None:
                print("decode", decode)

                return Response({
                    "success": True,
                    "message": "received",
                    "decoded": decode
                })

        except jwt.DecodeError:
            return Response({"success": False, "message": "Expired token"})


class UserCartView(generics.ListCreateAPIView):
    queryset = UserCart.objects.all()
    serializer_class = UserCartSerializer
