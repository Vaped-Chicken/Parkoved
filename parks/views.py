from django.shortcuts import render

from django.views.generic import View

class MainIndexView(View):
    template_name = 'index.html'

    def get(self,request):
        return render(
            request,
            self.template_name,
        )

class IventView(View):
    template_name = 'ivents.html'

    def get(self,request):
        return render(
            request,
            self.template_name,
        )

class ProfileView(View):
    template_name = 'profile.html'

    def get(self,request):
        return render(
            request,
            self.template_name,
        )

class TestMapView(View):
    template_name = 'test_map.html'

    def get(self,request):
        return render(
            request,
            self.template_name,
        )

class TestIndexView(View):
    template_name = 'test_in.html'

    def get(self,request):
        return render(
            request,
            self.template_name,
        )
