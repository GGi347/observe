from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.settings import api_settings
from .serializers import UserRegistrationSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.response import Response

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
# JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER

class UserRegistrationView(APIView):
    
    def post(self, request):
        endpoint = "http://localhost:8000/users}/token/"
        data = request.data
        serializer = UserRegistrationSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()

            # refresh = RefreshToken.for_user(user)
            # tokens = {

            #     'refresh': str(refresh),
            #     'access': str(refresh.access_token),

            # }
            return Response( status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserLoginSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['userId'] = user.id
        # ...

        return token


class UserLoginView(TokenObtainPairView):
    serializer_class = UserLoginSerializer


# @api_view(['GET'])
# def getRoutes(request):
#     routes = [
#         '/api/token',
#         '/api/token/refresh',
#     ]

#     return Response(routes)
    
# class UserLoginView(APIView):
#     def post(self, request):
#         data = request.data
#         serializer = UserLoginSerializer(data=data)
#         serializer.is_valid(raise_exception=True)                
#         if serializer.is_valid():    
#             user = serializer.validated_data['user']

#             refresh = RefreshToken.for_user(user)
#             refresh['userId'] = user.id
#             refresh['username'] = user.username
#             tokens = {

#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
                

#             }
#             return Response({'tokens': tokens, 'username': user.username}, status=status.HTTP_201_CREATED)
#         return Response(serializer.error_messages ,status=status.HTTP_400_BAD_REQUEST)
            

    # serializedUser = serializer.save()