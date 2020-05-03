from django.shortcuts import render, redirect
from django.views.generic import View
from .models import Task
from .forms import TaskForm
from django.http import JsonResponse
from django.forms.models import model_to_dict


# Create your views here.
class TasksView(View):
    def get(self, request):
        tasks = list(Task.objects.values())
        if request.is_ajax():
            return JsonResponse({'tasks': tasks}, status=200)
        return render(request, 'tasks/tasks.html', {})

    def post(self, request):
        form = TaskForm(request.POST)

        if form.is_valid():
            new_task = form.save()
            return JsonResponse({'task': model_to_dict(new_task)}, status=200)

        return redirect('tasks:tasks')


class TaskComplete(View):
    def post(self, request, id):
        task = Task.objects.get(id=id)
        task.completed = True
        task.save()
        return JsonResponse({'task': model_to_dict(task)}, status=200)


class TaskDelete(View):
    def post(self, request, id):
        task = Task.objects.get(id=id)
        task.delete()
        return JsonResponse({'result': 'ok'}, status=200)
