from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
# Create your views here.

class WikiView(APIView):
    def get(self,request, format=None):
        # code=request.data["country"]
        
        try:
            s=request.session['code']
        except KeyError:
            request.session["code"]="United States of America"
            s=request.session['code']
        response=requests.get("https://api.covid19api.com/countries").json()
        toReturn=""
        for i in response:
            if i["Country"]==s:
                toReturn=i["Slug"]
        return Response({'response': toReturn,"Data":response}, status=status.HTTP_200_OK)

    def post(self,request,format=None):
        code=request.data["country"]
        request.session["code"]=code
        return Response({"message": "Got some data!","code":request.session["code"] ,"data": request.data})