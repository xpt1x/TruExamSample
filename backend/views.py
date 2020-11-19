from django.http import JsonResponse
from .models import  Task, Submission

def add_task(request):
    if request.method == 'POST':
        try:
            name = request.POST['name']
            image = request.FILES['docimage']
            details = request.POST['details']
        except Exception as e:
            return JsonResponse({'success': False, 'err': 'Exception occured'})
            # not very much handled DB will reject
        task = Task(name=name, details=details, image=image)
        task.save()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False, 'err': 'Data not provided'})

def submit_task(request):
    if request.method == 'POST':
        try:
            tid = request.POST['tid']
            image = request.FILES['docimage']
        except Exception as e:
            return JsonResponse({'success': False, 'err': 'Exception occured'})
        
        task = Task.objects.get(pk=tid)
        if not task:
            return JsonResponse({'success': False, 'err': 'No such task'})
        else:
            submission = Submission(task=task, image=image)
            submission.save()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False, 'err': 'Data not provided'})

def submit_score(request):
    if request.method == 'POST':
        try:
            sid = request.POST['sid']
            score = request.POST['score']
        except Exception as e:
            return JsonResponse({'success': False, 'err': 'Exception occured'})
        
        submission = Submission.objects.get(pk=sid)
        if not submission:
            return JsonResponse({'success': False, 'err': 'No such submission'})
        else:
            submission.score = score
            submission.save()
            return JsonResponse({'success': True})
    return JsonResponse({'success': False, 'err': 'Data not provided'})
        

def get_tasks(request):
    if request.method == 'GET':
        task_list = [{'id': task.pk, 'name': task.name, 'details': task.details, 'imageurl': get_image_url(request, image=task.image)} for task in Task.objects.all()]
        return JsonResponse(task_list, safe=False)

def get_submissions(request):
    if request.method == 'GET':
        submission_list = [{'id': submission.pk, 'imageurl': get_image_url(request, image=submission.image), 'original_image_url': get_image_url(request, image=submission.task.image), 'name': submission.task.name, 'details': submission.task.details, 'task_id': submission.task.pk} for submission in Submission.objects.exclude(score__gt=0)]            
        return JsonResponse(submission_list, safe=False)

def get_original_image(request, tid):
    if request.method == 'GET':
        task = Task.objects.get(pk=tid)
        if not task:
            return JsonResponse({'success': False})
        return JsonResponse({'success': True, 'imageurl': get_image_url(request,task.image)})

def get_image_url(request, image):
    return 'http://' + request.META['HTTP_HOST'] + '/media/' + str(image)