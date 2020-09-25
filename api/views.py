from rest_framework import viewsets,\
    permissions

from .serializer import AllParkListSerializer,\
    AllAttractionListSerializer,\
    AllVisitorListSerializer,\
    AllQueueListSerializer,\
    AllRestrictionsListSerializer

from parks.models import Park,\
    Attraction,\
    Visitor,\
    Queue,\
    Restrictions

class ParkViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Park instance.
    """
    queryset = Park.objects.all()
    serializer_class = AllParkListSerializer
    permission_classes = [permissions.IsAuthenticated]

class AttractionViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Attraction instance.
    """
    queryset = Attraction.objects.all()
    serializer_class = AllAttractionListSerializer
    permission_classes = [permissions.IsAuthenticated]

class VisitorViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Visitor instance.
    """
    queryset = Visitor.objects.all()
    serializer_class = AllVisitorListSerializer
    permission_classes = [permissions.IsAuthenticated]

class QueueViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Queue instance.
    """
    queryset = Queue.objects.all()
    serializer_class = AllQueueListSerializer
    permission_classes = [permissions.IsAuthenticated]

class RestrictionsViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Restrictions instance.
    """
    queryset = Restrictions.objects.all()
    serializer_class = AllRestrictionsListSerializer
    permission_classes = [permissions.IsAuthenticated]
