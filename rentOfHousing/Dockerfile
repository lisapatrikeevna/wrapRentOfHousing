#from python:3.12-slim
#workdir /app
#copy ./app .
#copy requirements.txt requirements.txt
#run pip install --upgrade pip && \
#        pip install -r requirements.txt
#expose 8088
#cmd ['python', 'manage.py', 'runserver', '0.0.0.0:8088']

# Стартовый образ
FROM python:3.12

# рабочая директория
WORKDIR /usr/src/app
RUN mkdir -p $WORKDIR/static
RUN mkdir -p $WORKDIR/media

# переменные окружения для python
#не создавать файлы кэша .pyc
ENV PYTHONDONTWRITEBYTECODE 1
# не помещать в буфер потоки stdout и stderr
ENV PYTHONUNBUFFERED 1

# обновим pip
RUN pip install --upgrade pip

# Копируем и устанавливаем зависимости. Эта операция кэшируется
# и будет перезапускаться только при изменении requirements.txt
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# копируем всё что осталось.
COPY . .

EXPOSE 8088
CMD ["python", "manage.py", "runserver", "0.0.0.0:8088"]
















