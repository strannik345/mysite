from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.views.generic.edit import FormView
import json
import datetime

from .models import position_form


class positionFormView(FormView):

	template_name ='positionForm/positionForm.html'
	form_class = position_form
	success_url  = '/thanks/'	

	def form_valid(self, form):		
		form.save()
		return super().form_valid(form)
