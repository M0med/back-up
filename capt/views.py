from rest_framework import generics
from .models import Pckt, Endpoint
from .serializers import PcktSerializer, EndpointSerializer

class PcktList(generics.ListAPIView):
    queryset = Pckt.objects.all()
    serializer_class = PcktSerializer

class EndpointList(generics.ListAPIView):
    queryset = Endpoint.objects.all()
    serializer_class = EndpointSerializer
