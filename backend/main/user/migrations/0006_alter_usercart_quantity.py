# Generated by Django 5.0.6 on 2024-05-21 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_usercart'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usercart',
            name='quantity',
            field=models.IntegerField(default=0),
        ),
    ]
