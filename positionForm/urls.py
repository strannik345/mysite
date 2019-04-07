from django.urls import path, include

from . import views

urlpatterns = [
	path('', views.positionsList.as_view(), name = 'index'),
	path('current_sallary', views.current_sallary),		
	path('save_sallary', views.save_sallary),	
	path('save_position', views.save_position),		
]