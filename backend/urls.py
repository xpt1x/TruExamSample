from django.urls import path
from .views import *

urlpatterns = [
    path('add', add_task),
    path('getTasks', get_tasks),
    path('getSubs', get_submissions),
    path('submit', submit_task),
    path('submitscore', submit_score),
    path('taskimage/<int:tid>', get_original_image),
]
