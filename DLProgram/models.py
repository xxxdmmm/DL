from django.db import models


# Create your models here.

class UserDL(models.Model):
    name = models.CharField(max_length=32)
    passwd = models.CharField(max_length=32)

