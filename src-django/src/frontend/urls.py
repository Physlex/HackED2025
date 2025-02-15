"""
URLPatterns for the frontend.
"""

from django.urls import re_path
from django.views.generic import TemplateView

urlpatterns = [
    re_path(
        r"^(?!api).*$",
        TemplateView.as_view(template_name="index.html"),
        name="Frontend endpoint",
    )
]
