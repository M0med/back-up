from rest_framework import serializers
from .models import Pckt, Endpoint

class PcktSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pckt
        fields = '__all__'

class EndpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endpoint
        fields = '__all__'
