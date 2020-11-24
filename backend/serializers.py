from rest_framework import serializers
from .models import Task, Submission


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'url', 'name', 'details', 'image']


class SubmissionSerializer(serializers.HyperlinkedModelSerializer):
    task_id = serializers.IntegerField(source='task.id', read_only=True)
    task_name = serializers.CharField(source='task.name', read_only=True)
    task_details = serializers.CharField(source='task.details', read_only=True)
    task_image = serializers.ImageField(source='task.image', read_only=True)

    class Meta:
        model = Submission
        fields = '__all__'
