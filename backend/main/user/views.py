from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserModel, UserCart, UserCartJunction
from .serializers import UserModelSerializer, UserCartSerializer, UserCartJunctionSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken  # can use this to create a new JWT
import requests
from django.contrib.auth import get_user_model
from rest_framework import status
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
            # user will contain the retrieved or created UserModel object.
            # created will be a boolean value indicating whether the object was created (True) or retrieved from the database (False).
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
    queryset = UserCartJunction.objects.all()
    serializer_class = UserCartJunctionSerializer

    def post(self, request):
        print("data", request.data)
        listOfObjects = request.data['mycart']

        try:
            # If an array is of len 0 it means there is no item left in cart so find the user's cart and delete the row
            if len(listOfObjects) == 0:
                userId = request.data.get('userId')
                getCart = UserCart.objects.get(user=userId)
                cartId = getCart.id
                UserCartJunction.objects.get(cart=cartId).delete()
                print("run")

            for item in listOfObjects:
                userId = request.data.get('userId')
                productId = item.get('product')
                quantity = item.get('quantity')

                if not userId or not productId or not quantity:
                    return Response({"message": "Missing required fields"},
                                    status=status.HTTP_400_BAD_REQUEST)

                try:
                    findUser = UserModel.objects.get(id=userId)
                except UserModel.DoesNotExist:
                    return Response({"message": "User not found"},
                                    status=status.HTTP_404_NOT_FOUND)

                findUserCart, created = UserCart.objects.get_or_create(
                    user=findUser)

                getCart = UserCart.objects.get(user=userId)

                cartId = getCart.id

                # Fetching all product rows relating the specific user's cart
                findAllItems = UserCartJunction.objects.filter(cart=cartId)
                findAllItems = UserCartJunctionSerializer(findAllItems,
                                                          many=True)

                # Checking if the product already exists in the table. If yes then getting its quantity and adding to our quantity variable we are getting in our post request and then using serializeJunction we are storing the new updating quantity
                added = False
                for product in findAllItems.data:
                    if product['product'] == productId:
                        added = True
                        UserCartJunction.objects.filter(
                            product=productId).update(quantity=quantity)

                # Saving the product which was not already in our DB
                if not added:
                    mydata = {
                        'cart': cartId,
                        'product': productId,
                        'quantity': quantity
                    }

                    serializeJunction = UserCartJunctionSerializer(data=mydata)
                    if serializeJunction.is_valid():
                        yo = serializeJunction.save()
                        print("YO", yo)
                    else:
                        return Response(
                            {
                                "message": "Invalid data",
                                "errors": serializeJunction.errors
                            },
                            status=status.HTTP_400_BAD_REQUEST)

                # Below code is deleting other users cart data when a diff user logs in **NEEDS FIX**
                # Removing the products which are not provided in the listOfObjects (array of post req)
                product_ids = [item["product"] for item in listOfObjects]
                # Storing unique productids which are already unique since we only update the quantity of products which are already present and not add another product row but still making sure
                product_ids_set = set(product_ids)

                # The __in lookup in Django's ORM is used to filter querysets based on whether a particular field's value is contained within a given iterable (such as a list, tuple, or queryset). So product is the name of the field of UserCartJunction model and product__in checks for matching values in product_ids_set if a value doesn't match it deletes it
                # for user in findAllItems.data:
                # Delete all the products in the DB that don't match with the products inside listOfObjects also making sure that the cart belongs to the correct user by using filter and not deleting other user's cart products
                UserCartJunction.objects.exclude(
                    product__in=product_ids_set).filter(cart=cartId).delete()

                print("RAN COMPLETE")

            return Response({"success": True, "message": "data added"})

        except Exception as e:
            return Response(
                {
                    "message": "An unexpected error occurred",
                    "error": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetUserCart(APIView):
    # Getting the list of all the items in a user's cart
    def post(self, request):

        userId = request.data.get('user')
        print("user", userId)
        if not userId:
            return Response({"message": "Missing required fields"},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            findUser = UserModel.objects.get(id=userId)
        except UserModel.DoesNotExist:
            return Response({"message": "User not found"},
                            status=status.HTTP_404_NOT_FOUND)

        # print("find", findUser)
        try:
            getCart = UserCart.objects.get(user=userId)
        except UserCart.DoesNotExist:
            return Response({"message": "Cart not found"},
                            status=status.HTTP_404_NOT_FOUND)

        try:
            findAllItems = UserCartJunction.objects.filter(cart=getCart)
            findAllItems = UserCartJunctionSerializer(findAllItems, many=True)
            print("find", findAllItems.data)
            for item in findAllItems.data:
                # frontend user productId as the field
                item['productId'] = item['product']
                del item['product']

            return Response({"success": True, "cartData": findAllItems.data})

        except UserCartJunction.DoesNotExist:
            return Response({"message": "Data not found"},
                            status=status.HTTP_404_NOT_FOUND)
