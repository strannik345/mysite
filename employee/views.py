from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.views.generic.edit import FormView
from django.views.generic.list import ListView
import json

from positionForm.models import positions
from .models import employee_form, employees, employees_deleted
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

	def get_context_data(self, **kwargs):
		# Call the base implementation first to get a context
		# context = super().get_context_data(**kwargs)
		# Add in a QuerySet of all the books
		employee_list = list(employees.objects.values())
		position_list = list(positions.objects.values())
		for e in employee_list:
			for p in position_list:
				if e['position_name_id'] == p['position_name']:
					e['sallary'] = e['sallary_rate']*p['sallary']

		context = { 'employees' :  employee_list}
		return context

class deletedEmployeeListView(ListView):	
	model = employees_deleted
	template_name = 'employee/deletedEmployeeList.html'

	def get_context_data(self, **kwargs):
		# Call the base implementation first to get a context
		# context = super().get_context_data(**kwargs)
		# Add in a QuerySet of all the books
		employee_list = list(employees_deleted.objects.values())
		context = { 'employees' :  employee_list}
		return context		

def delete(request):
	request_id = request.POST.get('id')	
	person = employees.objects.get(pk=request_id)
	deleted_person = employees_deleted(employee_id=person.employee_id, position_name=person.position_name_id, first_name=person.first_name, surname=person.surname, patronymic=person.patronymic, passportID=person.passportID, adress=person.adress, employment_data=person.employment_data)
	deleted_person.save()
	person.delete()
	return HttpResponse(True)

def current_rate(request):
	request_id = request.POST.get('id')	
	return HttpResponse(json.dumps(employees.objects.get(pk=request_id).sallary_rate))

def new_rate(request):
	request_id = request.POST.get('id')	
	request_rate = request.POST.get('rate')	
	change = employees.objects.get(pk=request_id)
	change.sallary_rate=request_rate
	change.save()
	return HttpResponse(True)


