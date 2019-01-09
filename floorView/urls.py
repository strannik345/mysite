from django.urls import path, include

from . import views

urlpatterns = [
	path('',views.index, name = 'index'),
	path('rooms_occupied', views.rooms_occupied),	
	path('room_info', views.room_info),	
]