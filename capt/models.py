from django.db import models

class Pckt(models.Model):
    timestamp = models.DateTimeField()
    ip_src = models.CharField(max_length=255)
    ip_dst = models.CharField(max_length=255)
    mac_src = models.CharField(max_length=255)
    mac_dst = models.CharField(max_length=255)
    protocol = models.CharField(max_length=255)
    sport = models.IntegerField(null=True)
    dport = models.IntegerField(null=True)

class Endpoint(models.Model):
    mac_address = models.CharField(max_length=255, unique=True)
