
from django.contrib import admin
from django.urls import path, include, re_path
from habits import views
# from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('habits/', views.habit_list),
    re_path(r'^api/habits/', views.habit_list),
    path('create_habit/', views.create_habit),
    path('delete_habit/', views.delete_habit),
    path('habit_detail/', views.habit_detail),
    path('delete_habit_detail/', views.delete_habit_detail),
]