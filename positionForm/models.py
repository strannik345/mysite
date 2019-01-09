from django.db import models
from django.forms import ModelForm, TextInput, DateInput
from django.utils.translation import gettext_lazy as _

# Create your models here.
class positions(models.Model):
	position_name = models.CharField(max_length=150, unique=True)
	sallary = models.FloatField()
	

class position_form(ModelForm):
	class Meta:
		model = positions
		fields = ['position_name', 'sallary']
		labels = {
			'position_name' : _('Должность'),
			'sallary' : _('Оклад'),			
		}