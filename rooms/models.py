from django.db import models

class rooms(models.Model):		
	room_number = models.IntegerField(primary_key=True)
	capacity = models.IntegerField()
	price_per_night = models.FloatField()


class occupied_info(models.Model):
	room_number = models.ForeignKey('rooms', on_delete=models.PROTECT)
	checkin_date = models.DateField()
	checkout_date = models.DateField()  