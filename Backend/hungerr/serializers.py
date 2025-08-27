from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *

# class RegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True, min_length=8)

#     class Meta:
#         model = User
#         fields = ['email', 'password', 'name', 'location', 'role']

#     def create(self, validated_data):
#         # Create and return a new user with the validated data
#         user = User.objects.create_user(
#             email=validated_data['email'],
#             password=validated_data['password'],
#             name=validated_data['name'],
#             location=validated_data['location'],
#             role=validated_data['role']
#         )
#         return user

# class RegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['email', 'password', 'name', 'location', 'role']

    def create(self, validated_data):
        # Hash the password before saving
        password = validated_data.pop('password')
        user = User.objects.create_user(
            email=validated_data['email'],
            password=password,  # Django's create_user automatically hashes it
            name=validated_data['name'],
            location=validated_data['location'],
            role=validated_data['role'],
        )
        return user
    

class FoodImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodImage
        fields = ['id', 'image']


class FoodSerializer(serializers.ModelSerializer):
    images = FoodImageSerializer(many=True, read_only=True)  # show uploaded images
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=1000000, allow_empty_file=False, use_url=False),
        write_only=True,
        required=False
    )

    class Meta:
        model = Food
        fields = [
            'id', 'title', 'category', 'description',
            'quantity', 'expiry_date', 'address',
            'pickup_instructions', 'created_at',
            'images', 'uploaded_images'
        ]
        #removed 'user'
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        # request = self.context.get('request')

        # set logged in user automatically
        # if request and hasattr(request, "user"):
        #     validated_data['user'] = request.user  

        food = Food.objects.create(**validated_data)

        for image in uploaded_images:
            FoodImage.objects.create(food=food, image=image)

        return food
    

class RTEEnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = RTEEnrollment
        fields = "__all__"
