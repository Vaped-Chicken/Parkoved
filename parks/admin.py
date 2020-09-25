from django.contrib import admin
from .models import Park,\
    Attraction,\
    Visitor,\
    Queue,\
    Restrictions


admin.site.register(Park)
admin.site.register(Attraction)
admin.site.register(Visitor)
admin.site.register(Queue)
admin.site.register(Restrictions)
