from django.contrib import admin
from django.urls import path, include
from .views import UserRegisterView, LoginView, UserCartView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    path('api/user/register/', UserRegisterView.as_view()),
    path('api/user/login/', LoginView.as_view()),
    path('api/token/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/token/refresh/',
         TokenRefreshView.as_view(),
         name='token_refresh'),
    path('api/cart/', UserCartView.as_view())
]
