# Generated by Django 4.2.5 on 2023-10-04 09:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('habits', '0009_alter_habitcompletion_date_today'),
    ]

    operations = [
        migrations.CreateModel(
            name='HabitAchievement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('month', models.PositiveIntegerField()),
                ('year', models.PositiveIntegerField()),
                ('achieved', models.PositiveIntegerField(default=0)),
                ('habit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='habits.habit')),
            ],
        ),
    ]