from django.urls import path, include

from . import views


urlpatterns = [
	path('', views.BookingPageView.as_view(number=False), name = 'success'),	
	path('check_in', views.check_in),
	path('clientsList', views.clientsView.as_view()),
	path('clientsList_all', views.clients_allView.as_view()),
	path('success_client', views.thanks),
]