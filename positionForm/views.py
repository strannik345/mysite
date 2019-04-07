from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.views.generic.edit import FormView
from django.views.generic.list import ListView
import json
import datetime

from .models import positions

class positionsList(ListView):	
	model = positions
	template_name = 'positionForm/positionForm.html'


def current_sallary(request):
	request_id = request.POST.get('id')	
	return HttpResponse(json.dumps(positions.objects.get(pk=request_id).sallary))

def save_sallary(request):
	request_id = request.POST.get('id')	
	new_sallary = request.POST.get('sallary')	
	change = positions.objects.get(pk=request_id)
	change.sallary=new_sallary
	change.save()
	return HttpResponse(True)


def save_position(request):
	new_position_name = request.POST.get('position')	
	new_position_sallary = request.POST.get('sallary')	
	new_position = positions(position_name=new_position_name, sallary=new_position_sallary)
	new_position.save()
	return HttpResponse(True)