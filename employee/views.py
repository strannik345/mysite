from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.views.generic.edit import FormView
from django.views.generic.list import ListView

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

def delete(request):
	request_id = request.POST.get('id')	
	person = employees.objects.get(pk=request_id)
	deleted_person = employees_deleted(employee_id=person.employee_id, position_name=person.position_name_id, first_name=person.first_name, surname=person.surname, patronymic=person.patronymic, passportID=person.passportID, adress=person.adress, employment_data=person.employment_data)
	deleted_person.save()
	person.delete()
	return HttpResponse(True)
