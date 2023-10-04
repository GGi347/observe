from rest_framework import serializers
from .models import Habit, HabitCompletion, HabitAchievement
from rest_framework.validators import UniqueValidator

class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ['id', 'name', 'duration', 'goal_per_month', 'created_at']

class HabitCompletionSerializer(serializers.ModelSerializer):
    # habit = serializers.ReadOnlyField(source='habit.id')
    class Meta:
        model = HabitCompletion
        fields = ['habit', 'date_today', 'completed', 'duration']

class HabitAchievement(serializers.ModelSerializer):
    class Meta:
        model = HabitAchievement
        fields = ['habit', 'month', 'year', 'achieved']
