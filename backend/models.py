from django.db import models

def upload_task(self, filename, **kwargs):
    return f'tasks/{str(self.name)}-{filename}'

def upload_submission(self, filename, **kwargs):
    return f'submissions/{str(self.task)}-{filename}'

class Task(models.Model):
    name = models.CharField(max_length=256, blank=False, null=False, unique=True, default='NULL')
    details = models.CharField(max_length=512, blank=False, null=False )
    image = models.ImageField(upload_to=upload_task, blank=False, null=False)

    def __str__(self):
        return self.name

class Submission(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=upload_submission, blank=False, null=False)
    score = models.IntegerField(blank=True, null=True)