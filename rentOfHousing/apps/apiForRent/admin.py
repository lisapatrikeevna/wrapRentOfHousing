from django.contrib import admin

from .models import *
from django.utils.html import format_html



# Register your models here.



@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)


# @admin.register(Autor)
# class AutorAdmin(admin.ModelAdmin):
#     list_display = ('last_name', 'is_active', 'email', 'autor_type')
#     list_filter = ('last_name', 'is_active', 'email', 'autor_type')
#     search_fields = ('last_name', 'is_active', 'email', 'autor_type')
#     ordering = ('-registration_date', 'is_active')


@admin.register(Realty)
class RealtyAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'available', 'rating', 'register_date', 'available_date')
    list_display_links = ('title', 'location', 'available', 'rating', 'register_date', 'available_date')
    list_filter = ('title', 'location', 'available', 'rating', 'register_date', 'available_date')
    search_fields = ('title', 'location', 'available', 'rating', 'register_date', 'available_date')
    ordering = ('available', '-register_date',)
    # prepopulated_fields = {'slug': ('title',)}

    def display_image(self, obj):
        return format_html('<img src="{}" style="width: 50px; height: auto;" />', obj.real_estate_image.url)

    display_image.short_description = 'Image'
