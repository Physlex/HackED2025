"""
URLS for the appliation. These are the root urls, meaning anything that starts with this
will be accessed.

-> 'api/' type urls will be all api endpoints (load/store for db)
-> 'admin/' type urls will be for the admin webpage (to view the db)
-> '' generic endpoint for frontend. If no specifier is selected the regex takes over and
      renders the frontend instead.
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('', include('frontend.urls'))
]
