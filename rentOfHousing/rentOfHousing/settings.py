import os
from datetime import timedelta
from pathlib import Path

from corsheaders.defaults import default_headers
from environ import Env

# Build paths inside the project like this: BASE_DIR / 'subdir'.
# BASE_DIR = Path(__file__).resolve().parent.parent
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

env = Env()
# Env.read_env(BASE_DIR/'.env')
env.read_env(str(os.path.join(BASE_DIR, '.env')))
# env.read_env(str(BASE_DIR / '.env'))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env.str('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool('DEBUG')

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')

# Application definition

INSTALLED_APPS = [
    'rest_framework',
    'corsheaders',
    'django_filters',
    'rest_framework_simplejwt',
    'apps.apiForRent.apps.ApiforrentConfig',
    'apps.user.apps.UserConfig',
    'drf_spectacular',

    # base
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles', ]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'rentOfHousing.middleware.authentication_middleware.CookieTokenAuthenticationMiddleware',
    # 'rentOfHousing.rentOfHousing.middleware.authentication_middleware.CookieTokenAuthenticationMiddleware',
    #  base
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # end base

]

ROOT_URLCONF = 'rentOfHousing.urls'

TEMPLATES = [{
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [os.path.join(BASE_DIR, 'templates')], 'APP_DIRS': True,
    # 'DIRS': [BASE_DIR / 'templates'], 'APP_DIRS': True,
    'OPTIONS': {'context_processors':
                    ['django.template.context_processors.debug',
                     'django.template.context_processors.request',
                     'django.contrib.auth.context_processors.auth',
                     'django.contrib.messages.context_processors.messages', ],
                }, }, ]

WSGI_APPLICATION = 'rentOfHousing.wsgi.application'

# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

if env.bool('MYSQL', default=False):
    DATABASES = {'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'), }, }
else:
    DATABASES = {'default': {'ENGINE': 'django.db.backends.sqlite3', 'NAME': os.path.join(BASE_DIR, 'db.sqlite3'), }, }

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [{'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', }, {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', }, {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', }, {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', }, ]

# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS')
CORS_ORIGIN_ALLOW_ALL = env.bool('CORS_ALLOW_ALL', default=False)

CORS_ALLOW_CREDENTIALS = True  # Разрешить отправку куков
# CORS_ALLOW_HEADERS = list(default_headers) + [
#     'Authorization',
# ]

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS':
        ('django_filters.rest_framework.DjangoFilterBackend',
         'rest_framework.filters.SearchFilter', 'rest_framework.filters.OrderingFilter',
         ),
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        # 'rest_framework_simplejwt.authentication.JWTStatelessUserAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}
# AUTH_USER_MODEL = 'apps.user.models.CustomUser'
AUTH_USER_MODEL = 'user.CustomUser'
AUTHENTICATION_BACKENDS = [

    'django.contrib.auth.backends.ModelBackend',  # Используется для стандартной аутентификации
    # 'django.contrib.auth.backends.AllowAllUsersBackend',  # Если используете кастомную аутентификацию
]

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=25),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=10),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_COOKIE_SAMESITE': 'None',

}

SESSION_COOKIE_SAMESITE = 'None'
CSRF_COOKIE_SAMESITE = 'None'


SPECTACULAR_SETTINGS = {
    'TITLE': 'realty API',
    'DESCRIPTION': 'Documentation API ',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,  # отключает автоинклуд схемы
    # 'TAGS': [
    #     {'name': 'Users', 'description': 'Управление пользователями'},
    #     {'name': 'Products', 'description': 'Операции с продуктами'},
    # ],
}
# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'handlers': {
#         'console': {
#             'level': 'DEBUG',
#             'class': 'logging.StreamHandler',
#         },
#         'file': {
#             'level': 'DEBUG',
#             'class': 'logging.FileHandler',
#             'filename': os.path.join(BASE_DIR, 'db.log'),  # Путь к файлу логов
#         },
#     },
#     'loggers': {
#         'django.db.backends': {
#             'handlers': ['console', 'file'],
#             'level': 'DEBUG',
#         },
#     },
# }
