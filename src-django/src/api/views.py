"""
API Endpoints are defined here
"""

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView


# Create your views here.

class IndexView(APIView):
    """
    Base view class for the index file.
    """

    def get(self, request: Request):
        """
        Example api view endpoint. Note that this is equivalent to a GET request for the
        assigned urls path. That is, we can make a fetch request to "api/" to access
        this method with the associated request object.

        Although not in this view, we can also pass in parsed variables from the url.
        """

        return Response(status=status.HTTP_200_OK)
