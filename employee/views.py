from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.views.generic.edit import FormView
from django.views.generic.list import ListView

from .models import employee_form, employees
from positionForm.models import positions

class employeeFormView(FormView):

	template_name ='employee/employee.html'
	form_class = employee_form
	success_url  = '/employee/success_employee'	

	def clean_position_name(self, value):
	  	self.postion_name=positions.objects.get(position_name='Охранник')

	def form_valid(self, form):				
		form.save()		
		return super().form_valid(form)

def thanks(request):
	return render(request, 'employee/success_employee.html')

class employeeListView(ListView):
	
	model = employees
	template_name = 'employee/employeeList.html'
