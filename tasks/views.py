
from rest_framework import viewsets
from .serializer  import TaskSerializer
from .models import task


class TaskView (viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = task.objects.all()
    

