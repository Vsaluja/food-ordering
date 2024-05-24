from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager
from restaurant.models import Products


class UserModelManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        """
        Creates and saves a User with the given email, username, and password.
        """
        if not email:
            raise ValueError('The Email field must be set')

        email = self.normalize_email(email)
        print("extra", extra_fields)
        # since providing unique username is compulsory when saving the data so we set out username as email
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Creates and saves a superuser with the given email, username, and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class UserModel(AbstractUser):
    email = models.EmailField(max_length=35, unique=True)

    username = models.CharField(max_length=150,
                                unique=False,
                                blank=True,
                                null=True)
    password = models.CharField(max_length=150, blank=True, null=True)
    first_name = models.CharField(max_length=30, blank=False)
    last_name = models.CharField(max_length=30, blank=True)
    image = models.CharField(
        max_length=1000,
        default=
        "https://i.etsystatic.com/15418561/r/il/f06c80/3233862560/il_fullxfull.3233862560_jwqd.jpg"
        # https://i.pinimg.com/736x/d3/7b/02/d37b020e87945ad7f245e48df752ed03.jpg
        # https://i.etsystatic.com/15418561/r/il/f06c80/3233862560/il_fullxfull.3233862560_jwqd.jpg
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    objects = UserModelManager()

    def __str__(self):
        return self.first_name


class UserCart(models.Model):

    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return self.user.email
