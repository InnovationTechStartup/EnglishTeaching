#!/usr/bin/python
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/FlaskApp/FlaskApp_v0")



from atul import app as application
application.secret_key = 'askjdhfkjsadhfkjshd'
