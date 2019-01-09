# Generated by Django 2.1 on 2018-12-27 17:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('positionForm', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='employees',
            fields=[
                ('employee_id', models.AutoField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=50)),
                ('surname', models.CharField(max_length=50)),
                ('patronymic', models.CharField(max_length=50)),
                ('passportID', models.CharField(max_length=50)),
                ('adress', models.CharField(max_length=150)),
                ('employment_data', models.DateField(auto_now_add=True)),
                ('position_name', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='positionForm.positions', to_field='position_name')),
            ],
        ),
    ]
