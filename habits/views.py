from django.shortcuts import render
from django.http import JsonResponse
from .models import Habit, HabitCompletion, HabitAchievement
from .serializers import HabitSerializer, HabitCompletionSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
import datetime


# Create your views here.v
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def habit_list(request):
    if request.method == 'GET':
        habits = Habit.objects.all()
        if(habits.exists()):
            serializer = HabitSerializer(habits, many=True)
            return JsonResponse({"habits" : serializer.data})
        else:
            return Response({"habits": []})

    if request.method == 'POST':
        serializer = HabitSerializer(data= request.data)
        if serializer.is_valid:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
# @api_view(['GET'])
# def login(request){

# }
@api_view([ 'POST'])
@permission_classes([IsAuthenticated])
def create_habit(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = HabitSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("error", serializer.error_messages)
            return Response( status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response( status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete_habit(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print("data", data)
        try:
            habit = Habit.objects.get(name=data.get('name'))
            Habit.objects.filter(name=data.get("name")).delete();
            HabitCompletion.objects.filter(habit=habit.id).delete();          
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_202_ACCEPTED)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete_habit_detail(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print("data", data)
        try:
            
            habit = HabitCompletion.objects.filter(habit=data.get('habit')).get(date_today=data.get('date_today'))
            serializer = HabitCompletionSerializer(habit)
            
            res = serializer.data
            print("RES",res)
            habit.delete()

            return Response(res, status=status.HTTP_202_ACCEPTED)      # return ({habit=habit.values()}, status=status.HTTP_f)          
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def habit_detail(request):
    
    if request.method == 'GET':
        # habit = HabitCompletion.objects.filter(habit=data.get('habit'))
        # habit = request.query_params.get("habit")
        month = request.query_params.get('month')
        # habit = HabitCompletion.objects.filter(habit=habit).filter(date_today__month=month) 
        habit = HabitCompletion.objects.filter(date_today__month=month)
        if(habit.exists()):
            serializer = HabitCompletionSerializer(habit, many=True)
    
            return JsonResponse({"habitDetails" : serializer.data})
        else:
            return Response({"habitDetails": []})
        
    elif request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            habit = HabitCompletion.objects.filter(habit=data.get('habit')).filter(date_today=data.get('date_today')) 
            if habit.exists():
                print(habit.values())
                return Response(status=status.HTTP_404_NOT_FOUND)
            
            serializer = HabitCompletionSerializer(data = data)

            if serializer.is_valid():
                serializer.save()
                print("success", serializer.data)
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as error:
            print("ERRRO", error)
            return Response(status=status.HTTP_404_NOT_FOUND)
        
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def habit_achievement(request):
    if request.method == 'GET':
        month = request.query_params.get('month')
        year = request.query_params.get('year')
        habit = request.query_params.get('habit')
        # habit = HabitCompletion.objects.filter(habit=habit).filter(date_today__month=month) 
        item = HabitAchievement.objects.filter(month=month, year=year, habit=habit)
        if item.exists():
            serializer = HabitCompletionSerializer(item, many=False)
            print("HA", serializer.data)
            return JsonResponse({"habitAchievement" : serializer.data})
        else:
            return Response({"habitAchievement": []}) 

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)    
    # elif request.method == 'PUT':
    #     data = JSONParser().parse(request)
    #     print("HABIT", data.get('day'), data.get('habit'))
    #     try:
    #         habits = HabitCompletion.objects.filter(habit=data.get('habit'))
    #         habit = habits.filter(date_today=data.get('day'))
    #         serializer = HabitCompletionSerializer(habit, completion=data.get('completion'))
    #         if serializer.is_valid():
    #             serializer.save()
    #             return Response(serializer.data)
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #     except:
    #         return Response(status=status.HTTP_400_BAD_REQUEST)