from django.db import models
from django.forms import ModelForm, TextInput, DateInput
from django.utils.translation import gettext_lazy as _

# Create your models here.
class booked_rooms(models.Model):
	id_room = models.AutoField(primary_key=True)
	room_number = models.IntegerField()
	first_name = models.CharField(max_length=50)
	surname = models.CharField(max_length=50)
	patronymic  = models.CharField(max_length=50)
	passportID = models.CharField(max_length=50)
	adress = models.CharField(max_length=150)
	checkin_date = models.DateField()
	checkout_date = models.DateField()

class booking_form(ModelForm):
	class Meta:
		model = booked_rooms
		fields = ['room_number', 'checkin_date', 'checkout_date', 'first_name', 'surname', 'patronymic', 'passportID', 'adress']
		labels = {
			'room_number' : _('Комната номер '),
			'first_name' : _('Имя'),
			'surname' : _('Фамилия'),
			'patronymic' : _('Отчество'),
			'passportID' : _('Номер пасорта'),
			'adress' : _('адрес'),
			'checkin_date' : _('дата заселения'),
			'checkout_date' : _('дата выселения'),
		}
		widgets = {
			'room_number' : TextInput(attrs = {'readonly' : True}),
			'checkin_date' : DateInput(attrs = {'readonly' : True}),
			'checkout_date' : DateInput(attrs = {'readonly' : True}),
		}

