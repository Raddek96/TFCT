from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("housing.urls")),
]

# En desarrollo y en el despliegue de Railway servimos los archivos subidos
# desde Django para que las imágenes de anuncios sean accesibles por /media/.
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)