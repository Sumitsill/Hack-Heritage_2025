from django.shortcuts import render
#Rest Framework Imports
from rest_framework import viewsets, permissions
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
#Email Imports
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import get_user_model

model = get_user_model()
# @api_view(['POST'])
# def register_user(request):
#     # Parse data from the request body
#     data = request.data
    
#     # Validate the data using the RegisterSerializer
#     serializer = RegisterSerializer(data=data)
    
#     if serializer.is_valid():
#         # Create the user
#         user = serializer.save()
        
#         # Generate and return an authentication token for the user
#         token, created = Token.objects.get_or_create(user=user)

#         return Response({
#             "message": "Account created successfully.",
#             "token": token.key,
#             "user": {
#                 "name": user.name,
#                 "email": user.email,
#                 "location": user.location,
#                 "role": user.role
#             }
#         }, status=status.HTTP_201_CREATED)
    
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class register_user(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = model.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        
class FoodViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.all().order_by('-created_at')
    serializer_class = FoodSerializer
    permission_classes = [permissions.AllowAny]

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        

class RTEEnrollmentViewSet(viewsets.ModelViewSet):
    queryset = RTEEnrollment.objects.all().order_by("-created_at")
    serializer_class = RTEEnrollmentSerializer
    permission_classes = [permissions.AllowAny]

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)