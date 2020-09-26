from rest_framework import viewsets,\
    permissions

from .serializer import AllParkListSerializer,\
    AllAttractionListSerializer,\
    AllVisitorListSerializer,\
    AllQueueListSerializer,\
    AllRestrictionListSerializer,\
    AllPhotoListSerializer

from parks.models import Park,\
    Attraction,\
    Visitor,\
    Queue,\
    Restriction,\
    Photo

class ParkViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Park instance.
    """
    queryset = Park.objects.all()
    serializer_class = AllParkListSerializer
    # permission_classes = [permissions.IsAuthenticated]

class AttractionViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Attraction instance.
    """
    queryset = Attraction.objects.all()
    serializer_class = AllAttractionListSerializer
    # permission_classes = [permissions.IsAuthenticated]

class VisitorViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Visitor instance.
    """
    queryset = Visitor.objects.all()
    serializer_class = AllVisitorListSerializer
    # permission_classes = [permissions.IsAuthenticated]

class QueueViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Queue instance.
    """
    queryset = Queue.objects.all()
    serializer_class = AllQueueListSerializer
    # permission_classes = [permissions.IsAuthenticated]

class RestrictionViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Restrictions instance.
    """
    queryset = Restriction.objects.all()
    serializer_class = AllRestrictionListSerializer
    # permission_classes = [permissions.IsAuthenticated]

class PhotoViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Photo instance.
    """
    queryset = Photo.objects.all()
    serializer_class = AllPhotoListSerializer
    # permission_classes = [permissions.IsAuthenticated]
