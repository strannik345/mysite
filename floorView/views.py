from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import datetime
import json
from rooms.models import occupied_info, rooms

def index(request):
	template='floorView/floorView.html'
	today=datetime.date.today()	
	rooms = list(occupied_info.objects.values())
	context =[]
	for i in rooms:
		if(today >= i.get('checkin_date') and today < i.get('checkout_date')):
			context.append(i.get('room_number_id'))

	print(context)
	return render(request, template, {'rooms':context})

def rooms_occupied(request):
	today=datetime.date.today()	
	rooms_occ = list(occupied_info.objects.values())
	context =[]
	for i in rooms_occ:
		if(today >= i.get('checkin_date') and today < i.get('checkout_date')):
			context.append(i.get('room_number_id'))

	json_rooms_to_send=json.dumps(context)
	return HttpResponse(json_rooms_to_send)

def room_info(request):	
	room = rooms.objects.values().get(room_number=request.POST.get('room'))
	json_room=json.dumps(room)
	return HttpResponse(json_room)