from django.urls import path, re_path
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView
from . import views
from rest_framework_simplejwt import views as jwt_views 
 
# from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('register/', views.UserRegistrationView.as_view(), name='user-registration'),
    # path('users/',jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
# path('users/refresh', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
     path('signin/', views.UserLoginView.as_view(), name='user-login'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    # path('logout/', LogoutView.as_view()),
    
]