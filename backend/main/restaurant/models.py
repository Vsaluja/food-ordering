from django.db import models

# Create your models here.


class Categories(models.Model):

    category_name = models.CharField(max_length=20, blank=False)
    category_image = models.CharField(max_length=1000, blank=False)

    def __str__(self):
        return self.category_name


class Products(models.Model):
    name = models.CharField(max_length=50, blank=False)
    description = models.CharField(max_length=500, blank=False)
    price = models.CharField(max_length=6, blank=False)
    size = models.CharField(max_length=2, blank=True, null=True, default=None)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
