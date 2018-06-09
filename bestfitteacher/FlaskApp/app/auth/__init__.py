from flask import Blueprint

auth = Blueprint('auth', __name__,static_folder='../app/static')

from . import views
