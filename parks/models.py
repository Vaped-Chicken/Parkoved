from django.db import models

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
    restrictions = models.ManyToManyField('Restrictions',
                            verbose_name = 'Огрничения')
    rating = models.CharField("Рейтинг",
                            max_length=50)
    extreme = models.CharField("Рейтинг экстримальности аттракциона",
                            max_length=50)
    queue = models.ForeignKey('Queue',
                            on_delete = models.CASCADE,
                            verbose_name = 'Очередь')
    def __str__(self):
        return 'Аттракцион {}'.format(self.name)

class Visitor(models.Model):
    """обьект - Посетитель"""

    name = models.CharField("Имя посетителя",
                            max_length=50)
    age = models.CharField("Возраст посетителя",
                            max_length=50)
    phoneNumber = models.CharField("Телефон посетителя",
                            max_length=50)
    height = models.CharField("Рост посетителя",
                            max_length=50)
    weight = models.CharField("Вес посетителя",
                            max_length=50)
    family = models.CharField("Семейное положение посетителя",
                            max_length=50)
    def __str__(self):
        return 'Посетитель {}'.format(self.name)

class Queue(models.Model):
    """обьект - Очередь"""
    # id
    visitors = models.ManyToManyField('Visitor',
                            verbose_name = 'Посетители')

    def __str__(self):
        return 'Очередь {}'.format(self.id)

class Restrictions(models.Model):
    """обьект - Ограничение"""
    name = models.CharField("Тип ограничения",
                            max_length=50)

    def __str__(self):
        return 'Ограничение {}'.format(self.name)
