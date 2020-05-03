from django.urls import path
from . import views

app_name = 'tasks'

urlpatterns = [
    path('', views.TasksView.as_view(), name='tasks'),
    path('<int:id>/complete/', views.TaskComplete.as_view(), name='task-complete'),
    path('<int:id>/delete/', views.TaskDelete.as_view(), name='task-delete'),
]
