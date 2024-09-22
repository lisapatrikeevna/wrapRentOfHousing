from django.core.management.base import BaseCommand
from apiForRent.models import Realty, Category, Autor,TYPE_AUTOR
from faker import Faker
import random

fake = Faker()

class Command(BaseCommand):
    help = 'Populate the database with fake data'

    def handle(self, *args, **kwargs):
        categories = ['Apartment', 'House', 'Condo', 'Townhouse']

        # Создание авторов (агентов)
        authors = []
        for _ in range(10):  # Создаем 10 агентов
            author = Autor.objects.create(
                last_name=fake.last_name(),
                first_name=fake.first_name(),
                birst_day=fake.date_of_birth(),
                email=fake.email(),
                phone=fake.phone_number(),
                autor_type=random.choice(TYPE_AUTOR)[0]  # Выбор типа автора
            )
            authors.append(author)
        print('authors', authors)

        # Создание категорий
        for category_name in categories:
            Category.objects.get_or_create(name=category_name)

        # Генерация объектов Realty
        for _ in range(100):
            title = fake.catch_phrase()
            description = fake.paragraph()
            location = fake.city()
            price = random.uniform(50000, 500000)
            number_of_rooms = random.randint(1, 5)
            category = random.choice(Category.objects.all())
            available = random.choice([True, False])
            rating = random.uniform(1, 10)
            available_date = fake.date_between(start_date='today', end_date='+30d')
            author = random.choice(authors)  # Выбираем случайного автора

            Realty.objects.create(
                title=title,
                description=description,
                location=location,
                price=price,
                number_of_rooms=number_of_rooms,
                category=category,
                available=available,
                rating=rating,
                available_date=available_date,
                author=author  # Привязываем объект к автору
            )

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with fake data!'))
