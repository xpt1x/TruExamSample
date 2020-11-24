from django.http import JsonResponse
from .models import Task, Submission
from rest_framework import viewsets
from .serializers import TaskSerializer, SubmissionSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.exclude(score__gt=0)
    serializer_class = SubmissionSerializer
