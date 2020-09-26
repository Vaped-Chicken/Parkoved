from rest_framework import serializers

from parks.models import Park,\
    Attraction,\
    Visitor,\
    Queue,\
    Restriction,\
    Photo

class AllParkListSerializer(serializers.ModelSerializer):
    """Список всех парков"""

    class Meta:
        model = Park
        fields = '__all__'

class AllAttractionListSerializer(serializers.ModelSerializer):
    """Список всех аттракционов"""

    class Meta:
        model = Attraction
        fields = '__all__'

class AllVisitorListSerializer(serializers.ModelSerializer):
    """Список всех посетителей"""

    class Meta:
        model = Visitor
        fields = '__all__'

class AllQueueListSerializer(serializers.ModelSerializer):
    """Список всех очередей"""

    class Meta:
        model = Queue
        fields = '__all__'

class AllRestrictionListSerializer(serializers.ModelSerializer):
    """Список всех ограничений"""

    class Meta:
        model = Restriction
        fields = '__all__'

class AllPhotoListSerializer(serializers.ModelSerializer):
    """Список всех Фото"""

    class Meta:
        model = Photo
        fields = '__all__'
