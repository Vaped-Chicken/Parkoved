from django.db import models
from django.contrib.postgres.fields import JSONField

class Park(models.Model):
    """Макро-обьект - Парк"""

    name = models.CharField("Название парка",
                            max_length=50)
    city = models.CharField("Город",
                            max_length=100,
                            blank=True,
                            null=True)


    class Meta:
        verbose_name        = 'Парк'
        verbose_name_plural = 'Парки'

    def __str__(self):
        return 'Парк {}'.format(self.name)

class Attraction(models.Model):
    """Микро-обьект - Аттракцион"""

    name = models.CharField("Название аттракциона",
                            max_length=50)
    park = models.ForeignKey('Park',
                            on_delete = models.CASCADE,
                            verbose_name = 'Парк')
    restrictions = models.ManyToManyField('Restriction',
                            verbose_name = 'Огрничения')
    rating = models.CharField("Рейтинг",
                            max_length=50)
    extreme = models.CharField("Рейтинг экстримальности аттракциона",
                            max_length=50)
    queue = models.ForeignKey('Queue',
                            on_delete = models.CASCADE,
                            verbose_name = 'Очередь')
    photo = models.ImageField('Фото аттракционна',
                            upload_to = 'attraction',
                            blank=True)
    photo_list = models.ManyToManyField('Photo',
                            verbose_name = 'Фотки')
    altitude = models.CharField('северная широта(°N)',
                            max_length=50,
                            blank=True,
                            null=True)
    price = models.CharField('стоимость билета',
                            max_length=5,
                            blank=True,
                            null=True)
    longitude = models.CharField('восточная долгота(°E)',
                            max_length=50,
                            blank=True,
                            null=True)

    def __str__(self):
        return 'Аттракцион {}'.format(self.name)

class FoodZone(models.Model):
    """Микро-обьект - Фудзона"""

    name = models.CharField("Название фудкорта",
                            max_length=50)
    park = models.ForeignKey('Park',
                            on_delete = models.CASCADE,
                            verbose_name = 'Парк')
    rating = models.CharField("Рейтинг",
                            max_length=50)
    altitude = models.CharField('северная широта(°N)',
                            max_length=50,
                            blank=True,
                            null=True)
    longitude = models.CharField('восточная долгота(°E)',
                            max_length=50,
                            blank=True,
                            null=True)
    photo_list = models.ManyToManyField('Photo',
                            verbose_name = 'Фотки')

    def __str__(self):
        return 'Фудзона {}'.format(self.name)

class Visitor(models.Model):
    """обьект - Посетитель"""

    name = models.CharField("Имя посетителя",
                            max_length=50)
    age = models.CharField("Возраст посетителя",
                            max_length=3,
                            blank=True,
                            null=True)
    phoneNumber = models.CharField("Телефон посетителя",
                            max_length=50)
    height = models.CharField("Рост посетителя",
                            max_length=50,
                            blank=True,
                            null=True)
    weight = models.CharField("Вес посетителя",
                            max_length=50,
                            blank=True,
                            null=True)
    family = models.CharField("Семейное положение посетителя",
                            max_length=50,
                            blank=True,
                            null=True)
    answer_list = models.JSONField("Ответы посетителя",
                            blank=True,
                            null=True)
    visitorType = models.ForeignKey('VisitorType',
                            on_delete = models.CASCADE,
                            blank=True,
                            null=True,
                            verbose_name = 'тип посетителя')
    def __str__(self):
        return 'Посетитель {}'.format(self.name)

class VisitorType(models.Model):
    """обьект - Тип посетителя"""

    name = models.CharField("Имя посетителя",
                            max_length=50)
    def __str__(self):
        return '{}'.format(self.name)

class Queue(models.Model):
    """обьект - Очередь"""

    # id
    visitors = models.ManyToManyField('Visitor',
                            verbose_name = 'Посетители')

    def __str__(self):
        return 'Очередь {}'.format(self.id)

class Restriction(models.Model):
    """обьект - Ограничение"""

    name = models.CharField("Тип ограничения",
                            max_length=50)

    def __str__(self):
        return 'Ограничение {}'.format(self.name)

# class Answer(models.Model):
#     """обьект - Очередь"""
#
#     ANSWER_CHOICES = [
#         ('LI', 'LIKE'),
#         ('DI', 'DISLIKE'),
#     ]
#
#     attraction = models.ForeignKey('Attraction',
#                             on_delete = models.CASCADE,
#                             verbose_name = 'Аттракцион')
#     answer = models.CharField('выбор',
#                             max_length=2,
#                             choices = ANSWER_CHOICES)
#
#     def __str__(self):
#         return 'оценка аттракциона {}'.format(self.attraction)

class Photo(models.Model):
    """обьект - Фото"""

    photo = models.ImageField('Фото аттракционна',
                            upload_to = 'attraction',
                            blank=True)

    def __str__(self):
        return 'photo'
