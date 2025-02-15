"""
URLPatterns for the frontend.
"""

from django.urls import path
from .views import IndexView

urlpatterns = [
    path("", IndexView.as_view(), name="base api endpoint, for testing purposese")
]
