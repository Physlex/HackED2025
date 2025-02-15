"""
This module implements the custom django tags used in the index template.
"""

from django import template
from django.conf import settings

from pathlib import Path
import json


register = template.Library()
BASE_DIR = settings.BASE_DIR


### DJANGO TAG IMPL ######################################################################


def static_vite_js_impl() -> str | None:
    """
    Returns the cache-busted css names from the django manifest
    """

    manifest_path = Path(BASE_DIR) / "static" / ".vite" / "manifest.json"
    try:
        with open(manifest_path) as manifest_file:
            manifest_json = json.load(manifest_file)
            js_hotswap = (
                f"{settings.STATIC_URL}" + manifest_json["src/main.tsx"]["file"]
            )
            return js_hotswap
    except OSError:
        print(f"Error: {manifest_path} could not be found")

    return None


### DJANGO TAG CONNECTION ################################################################


@register.simple_tag
def static_vite_js() -> str:
    """
    Wrapper for js template tag.
    """
    return static_vite_js_impl() or ""
