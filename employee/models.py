from django.db import models
from django.forms import ModelForm, TextInput, DateInput, ChoiceField
from django.utils.translation import gettext_lazy as _

from positionForm.models import positions


# Create your models here.
class employees(models.Model):
	employee_id = models.AutoField(primary_key=True)
	position_name = models.ForeignKey(positions, to_field = 'position_name', on_delete=models.PROTECT)
	first_name = models.CharField(max_length=50)
	surname = models.CharField(max_length=50)
	patronymic = models.CharField(max_length=50)
	passportID = models.CharField(max_length=50)
	adress = models.CharField(max_length=150)
	employment_data = models.DateField(auto_now_add=True)
	sallary_rate = models.FloatField(default=1.0)

class employees_deleted(models.Model):	
	employee_id = models.AutoField(primary_key=True)
	position_name = models.CharField(max_length=150)
	first_name = models.CharField(max_length=50)
	surname = models.CharField(max_length=50)
	patronymic = models.CharField(max_length=50)
	passportID = models.CharField(max_length=50)
	adress = models.CharField(max_length=150)
	employment_data = models.DateField()
	firing_data = models.DateField(auto_now_add=True)

class employee_form(ModelForm):
	position_list=list(positions.objects.values_list('position_name', flat=True))
	choice=[]
	for i in position_list:
		choice.append([i,i])
	position_name = ChoiceField(choices=choice, label='Должность')
	employees.sallary=5.1

	def clean_position_name(self):
		data = self.cleaned_data['position_name']
		position_name = positions.objects.get(position_name=data)
		return position_name

	class Meta:
		model = employees
		fields = ['position_name', 'first_name','surname' , 'patronymic', 'passportID', 'adress']
		labels = {
			'surname' : _('Фамилия'),
			'first_name' : _('Имя'),
			'patronymic' : _('Отчество'),
			'passportID' : _('Номер паспорта'),
			'adress' : _('Место жительства'),						
		}
