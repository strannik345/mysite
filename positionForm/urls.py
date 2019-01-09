from django.urls import path, include

from . import views

urlpatterns = [
	path('', views.positionFormView.as_view(), name = 'index'),	
	
]