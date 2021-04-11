from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
import wikipedia as w
# Create your views here.

class WikiView(APIView):
    def get(self,request, format=None):
        try:
            s=request.session['code']
        except KeyError:
            request.session["code"]="United States of America"
            s=request.session['code']
        second=w.summary(s, sentences=1)
        return Response({"data":second}, status=status.HTTP_200_OK)

    def post(self,request,format=None):
        code=request.data["Country"]
        request.session["code"]=code
        return Response({"message": "Got some data!","code":request.session["code"] ,"data": request.data})