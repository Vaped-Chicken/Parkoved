from django.contrib import admin
from .models import Park,\
    Attraction,\
    Visitor,\
    Queue,\
    Restriction,\
    Photo,\
    FoodZone,\
    VisitorType


admin.site.register(Park)
admin.site.register(Attraction)
admin.site.register(Visitor)
admin.site.register(Queue)
admin.site.register(Restriction)
admin.site.register(Photo)
admin.site.register(FoodZone)
admin.site.register(VisitorType)
