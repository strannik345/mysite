from django.urls import path, include

from . import views

urlpatterns = [
	path('', views.employeeFormView.as_view(), name = 'index'),	
	path('list', views.employeeListView.as_view(), name = 'index'),	
	path('list_deleted', views.deletedEmployeeListView.as_view(), name = 'index'),	
	path('success_employee', views.thanks),	
	path('delete', views.delete),
	path('current_rate', views.current_rate),
	path('new_rate', views.new_rate),
	
]