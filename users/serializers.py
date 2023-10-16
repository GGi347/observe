from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')
        
    
    def create(self, validate_data):
        user = User.objects.create_user(**validate_data)
        return user
    
# class UserLoginSerializer(serializers.ModelSerializer):
#     email = serializers.CharField(max_length=255)
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = ( 'email', 'password')
        

#     def validate(self, data):
#         email = data.get('email')
#         password = data.get('password')

#         if email and password:
#             user = authenticate(request=self.context.get('request'),email=email, password=password)

#             if not user:
#                 raise serializers.ValidationError('Invalid credentials', code='authorization')
#             data['user'] = user
#             return data
#         raise serializers.ValidationError('Must include email and password', code='authorization')

        