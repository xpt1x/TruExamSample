from django.urls import path, include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register('tasks', TaskViewSet)
router.register('subs', SubmissionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
