from datetime import datetime
import re
from flask import render_template, redirect, request, url_for,session, flash,jsonify,make_response
from PyPDF2 import PdfFileReader, PdfFileWriter
from pathlib import Path
from functools import wraps, update_wrapper
import csv
from flask_login import login_user, logout_user, login_required, \
    current_user
import  pandas as pd
from functools import wraps
import uuid
import gc
from pptx import Presentation
import pdfkit
import json
from django.utils.encoding import smart_str, smart_unicode
from bs4 import BeautifulSoup
import urllib2
from jinja2 import Environment, FileSystemLoader
import os
import subprocess
from django.core.validators import URLValidator
import validators
import glob
from flask import Flask
app = Flask(__name__)

@app.route("/homepage")
def homepage():
    return render_template('index.html')

@app.route("/contact")
def contact():
    return render_template('contact.html')

@app.route("/about")
def about():
    return render_template('about.html')

@app.route("/services")
def services():
    return render_template('services.html')

@app.route("/courses")
def courses():
    return render_template('courses.html')

@app.route("/register")
def register():
    return render_template('courses.html')

@app.route("/join")
def join():
    return render_template('join.html')

@app.route("/login")
def login():
    return render_template('courses.html')

@app.route("/teacherslist")
def teacherslist():
    return render_template('courses.html')

@app.route("/teachersprofile")
def teachersprofile():
    return render_template('courses.html')

@app.route("/studentsprofile")
def studentsprofile():
    return render_template('courses.html')

 
if __name__ == "__main__":
    app.run()
