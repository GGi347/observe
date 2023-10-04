from django.db import models
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from rest_framework.authtoken.models import Token
from django.conf import settings
# Create your models here.


class Habit(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200, unique=True)
    duration = models.DurationField(null=False)
    created_at = models.DateField(auto_now_add=True)
    goal_per_month = models.PositiveIntegerField(default=30)
    

    def __str__(self) -> str:
        return self.name
    
class HabitCompletion(models.Model):
    habit = models.ForeignKey(Habit,  on_delete=models.CASCADE)
    date_today = models.DateField()
    completed = models.BooleanField(default=False)
    duration = models.DurationField(null=True)

    def __str__(self) -> str:
        return super().__str__()

class HabitAchievement(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)
    month = models.PositiveIntegerField()
    year = models.PositiveIntegerField()
    achieved = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return super().__str__()
