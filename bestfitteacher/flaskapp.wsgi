#!/usr/bin/python
import sys
import logging
import os
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/bestfitteacher/www.besteacher.com")

os.environ['MAIL_USERNAME'] ="sharmaatul11@gmail.com"
os.environ['MAIL_PASSWORD'] ="TRYambakam1!@#"
os.environ['FLASKY_ADMIN']  ="sharmaatul11@gmail.com"
os.environ['DEV_DATABASE_URL']  ="mysql://root:ircadircad@localhost/flaskyapp"
os.environ['TEST_DATABASE_URL'] ="mysql://root:ircadircad@localhost/flaskyapp"
os.environ['DATABASE_URL'] ="mysql://root:ircadircad@localhost/flaskyapp"

from manage import app as application
application.secret_key = 'askjdhfkjsadhfkjshd'
