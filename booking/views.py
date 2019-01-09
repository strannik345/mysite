from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.views.generic.edit import FormView
from django.views.generic.list import ListView
import json
import datetime
from django.db.models import Q
from django.urls import reverse_lazy, reverse

from .models import booking_form, booked_rooms
from rooms.models import occupied_info, rooms 
from booking import views

class BookingPageView(FormView):

	number=True
	template_name ='booking/bookingForm.html'
	form_class = booking_form
	success_url  = '/booking/success_client'
	initial={'room_number' : ''}	

	def form_valid(self, form):
		room_number = form.cleaned_data['room_number']
		checkin_date = form.cleaned_data['checkin_date']
		checkout_date = form.cleaned_data['checkout_date']
		occupied_info.objects.create(room_number = rooms.objects.get(pk=room_number), checkin_date=checkin_date,checkout_date=checkout_date)		
		print(room_number)
		print(checkin_date)
		print(checkout_date)
		print('\n\n\n')
		print(form.cleaned_data)
		print('\n\n\n')		
		form.save()
		return super(BookingPageView, self).form_valid(form)

	def get_context_data(self, **kwargs):
		context = super().get_context_data()
		context['number'] = self.number
		return context


def check_in(request):
	checkin_date = datetime.datetime.date(datetime.datetime.strptime( request.POST.get('checkin_date'), '%m/%d/%Y'))
	checkout_date = datetime.datetime.date(datetime.datetime.strptime( request.POST.get('checkout_date'), '%m/%d/%Y')) 
	rooms = list(occupied_info.objects.values())
	rooms_to_send =[]
	for i in rooms:
		if((checkin_date >= i.get('checkin_date') and checkin_date < i.get('checkout_date')) or
			(checkout_date > i.get('checkin_date') and checkout_date <= i.get('checkout_date')) or
			(checkin_date <= i.get('checkin_date') and checkout_date >= i.get('checkout_date'))):
			rooms_to_send.append(i.get('room_number_id'))					
	print(rooms_to_send)
	json_rooms_to_send=json.dumps(rooms_to_send)	
	print(json_rooms_to_send)
	return HttpResponse(json_rooms_to_send)


class clientsView(ListView):	
	queryset = (booked_rooms.objects.filter(checkin_date__lte=datetime.datetime.date(datetime.datetime.now())) & booked_rooms.objects.filter(checkout_date__gte=datetime.datetime.date(datetime.datetime.now())))
	template_name = 'booking/clientsList.html'

class clients_allView(ListView):	
	queryset = booked_rooms.objects.order_by('-checkin_date')	
	template_name = 'booking/clientsList_all.html'

def thanks(request):
	return render(request, 'booking/success_client.html')