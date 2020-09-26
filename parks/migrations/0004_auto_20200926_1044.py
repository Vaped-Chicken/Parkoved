# Generated by Django 3.1.1 on 2020-09-26 02:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('parks', '0003_auto_20200926_1029'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Restrictions',
            new_name='Restriction',
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.IntegerField(choices=[(1, 'Like'), (2, 'Dislike')], default=1)),
                ('attraction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parks.attraction', verbose_name='Аттракцион')),
            ],
        ),
        migrations.AddField(
            model_name='visitor',
            name='answer_list',
            field=models.ManyToManyField(to='parks.Answer', verbose_name='Ответы посетителя'),
        ),
    ]
