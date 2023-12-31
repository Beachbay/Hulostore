from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer

# Create your views here.
@api_view(['GET', 'POST'])
def product_list(request):
    if request.method == 'GET':   
        queryset = Product.objects.all()
        serializer = ProductSerializer(queryset, many=True, context={'requst':request})
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)      
        serializer.validated_data
        return Response('ok')

@api_view()
def product_detail(request, id):
    product = get_object_or_404(Product, pk=id)
    serializer = ProductSerializer(product)
    serializer.data
    return Response(serializer.data)
   
    
