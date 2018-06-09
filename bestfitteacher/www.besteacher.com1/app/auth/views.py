from datetime import datetime
import re
from flask import render_template, redirect, request, url_for,session, flash,jsonify
from flask_login import login_user, logout_user, login_required, \
    current_user
from . import auth
from functools import wraps
from .. import db
from ..models import User,Teacher,Student
from ..email import send_email
from .forms import LoginForm, RegistrationForm, ChangePasswordForm,\
    PasswordResetRequestForm, PasswordResetForm, ChangeEmailForm,TeacherProfileForm,StudentProfileForm
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
THIS_DIR='/var/www/bestfitteacher/www.besteacher.com' +'/app'
@auth.before_app_request
def before_request():
    if current_user.is_authenticated:
        current_user.ping()
        if not current_user.confirmed \
                and request.endpoint \
                and request.blueprint != 'auth' \
                and request.endpoint != 'static':
            return redirect(url_for('auth.unconfirmed'))


@auth.route('/unconfirmed')
def unconfirmed():
    if current_user.is_anonymous or current_user.confirmed:
        return redirect(url_for('main.index'))
    return render_template('auth/unconfirmed.html')


@auth.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user, form.remember_me.data)
            next = request.args.get('next')
            if next is None or not next.startswith('/'):
                next = url_for('main.index')
                session['logged_in'] = True
                session['email']=form.email.data
                session['authenticated'] = False
                if user.confirmed==1:
                    #print(user.is_authenticated)
                    session['authenticated']=True
                    thisuseremail = session['email']
                    thisuseremail = thisuseremail.replace("@", "at")
                    thisuseremail = thisuseremail.replace(".", "dot")
                    # thisuserdirectory='uploadedimages/' + thisuseremail
                    thisuserdirectory = 'static'
                    # '''uploadedimages/'
                    target1 = os.path.join(THIS_DIR, thisuserdirectory)
                    target = os.path.join(target1, thisuseremail)
                    print(target)
                    if not os.path.isdir(target):
                        os.mkdir(target)
                        profileimagepath="/".join([target, 'profilephoto'])
                        profilephotodir="/".join([thisuseremail, 'profilephoto'])

                        os.mkdir(profileimagepath)
                        filename="profilephoto.jpg"
                        profilephotoloc = "/".join([profilephotodir, filename])
                        filenamepath = "/".join([profileimagepath, filename])
                        filetocopy="/".join([THIS_DIR, '/static/images/profile.jpg'])
                        subprocess.call(["cp", filetocopy, filenamepath], shell=False)
                        thisteacher = Teacher( email=session['email'], profilephotoloc=profilephotoloc)
                        db.session.add(thisteacher)
                        db.session.commit()
                # next= url_for('auth.bookslist')
            return redirect(url_for('auth.teacherprofilepage')) #next)
        flash('Invalid username or password.')
    return render_template('auth/login.html', form=form)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.')
    session['logged_in'] = False
    return redirect(url_for('main.index'))


@auth.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        thisuseremail = form.email.data #session['email']
        thisuseremail = thisuseremail.replace("@", "at")
        thisuseremail = thisuseremail.replace(".", "dot")
        profileimagepath = "/".join([thisuseremail, 'profilephoto'])
        filename = "profilephoto.jpg"
        profileimagefile = "/".join([profileimagepath, filename])
        user = User(email=form.email.data,
                    username=form.username.data,
                    password=form.password.data)
        db.session.add(user)
        db.session.commit()
        token = user.generate_confirmation_token()
        send_email(user.email, 'Confirm Your Account',
                   'auth/email/confirm', user=user, token=token)
        flash('A confirmation email has been sent to you by email.')
        return redirect(url_for('auth.login'))
    return render_template('auth/register.html', form=form)
    # form = RegistrationForm(request.form)
    # if request.method == 'POST' and form.validate():
    #
    # # form = RegistrationForm()
    # #     # if request.method == "POST":
    # # if form.validate_on_submit():
    #     user = User(email=form.email.data,
    #                 username=form.username.data,
    #                 password=form.password.data)
    #     db.session.add(user)
    #     db.session.commit()
    #     token = user.generate_confirmation_token()
    #     send_email(user.email, 'Confirm Your Account',
    #                'auth/email/confirm', user=user, token=token)
    #     flash('A confirmation email has been sent to you by email.')
    #     return redirect(url_for('auth.login'))
    # return render_template('auth/register.html',form=form)



@auth.route('/confirm/<token>')
@login_required
def confirm(token):
    if current_user.confirmed:
        return redirect(url_for('main.index'))
    if current_user.confirm(token):
        db.session.commit()
        flash('You have confirmed your account. Thanks!')
    else:
        flash('The confirmation link is invalid or has expired.')
    return redirect(url_for('main.index'))


@auth.route('/confirm')
@login_required
def resend_confirmation():
    token = current_user.generate_confirmation_token()
    send_email(current_user.email, 'Confirm Your Account',
               'auth/email/confirm', user=current_user, token=token)
    flash('A new confirmation email has been sent to you by email.')
    return redirect(url_for('main.index'))


@auth.route('/change-password', methods=['GET', 'POST'])
@login_required
def change_password():
    form = ChangePasswordForm()
    if form.validate_on_submit():
        if current_user.verify_password(form.old_password.data):
            current_user.password = form.password.data
            db.session.add(current_user)
            db.session.commit()
            flash('Your password has been updated.')
            return redirect(url_for('main.index'))
        else:
            flash('Invalid password.')
    return render_template("auth/change_password.html", form=form)


@auth.route('/reset', methods=['GET', 'POST'])
def password_reset_request():
    if not current_user.is_anonymous:
        return redirect(url_for('main.index'))
    form = PasswordResetRequestForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user:
            token = user.generate_reset_token()
            send_email(user.email, 'Reset Your Password',
                       'auth/email/reset_password',
                       user=user, token=token,
                       next=request.args.get('next'))
        flash('An email with instructions to reset your password has been '
              'sent to you.')
        return redirect(url_for('auth.login'))
    return render_template('auth/reset_password.html', form=form)


@auth.route('/reset/<token>', methods=['GET', 'POST'])
def password_reset(token):
    if not current_user.is_anonymous:
        return redirect(url_for('main.index'))
    form = PasswordResetForm()
    if form.validate_on_submit():
        if User.reset_password(token, form.password.data):
            db.session.commit()
            flash('Your password has been updated.')
            return redirect(url_for('auth.login'))
        else:
            return redirect(url_for('main.index'))
    return render_template('auth/reset_password.html', form=form)


@auth.route('/change_email', methods=['GET', 'POST'])
@login_required
def change_email_request():
    form = ChangeEmailForm()
    if form.validate_on_submit():
        if current_user.verify_password(form.password.data):
            new_email = form.email.data
            token = current_user.generate_email_change_token(new_email)
            send_email(new_email, 'Confirm your email address',
                       'auth/email/change_email',
                       user=current_user, token=token)
            flash('An email with instructions to confirm your new email '
                  'address has been sent to you.')
            return redirect(url_for('main.index'))
        else:
            flash('Invalid email or password.')
    return render_template("auth/change_email.html", form=form)


@auth.route('/change_email/<token>')
@login_required
def change_email(token):
    if current_user.change_email(token):
        db.session.commit()
        flash('Your email address has been updated.')
    else:
        flash('Invalid request.')
    return redirect(url_for('main.index'))


@auth.route("/homepage")
def homepage():
    return render_template('index.html')

@auth.route("/contact")
def contact():
    return render_template('contact.html')

@auth.route("/about")
def about():
    return render_template('about.html')

@auth.route("/services")
def services():
    return render_template('services.html')

@auth.route("/courses")
def courses():
    return render_template('courses.html')

# @auth.route("/register")
# def register():
#     return render_template('courses.html')

@auth.route("/join")
def join():
    return render_template('join.html')

# @auth.route("/login")
# def login():
#     return render_template('courses.html')


@auth.route("/teacherprofilepage", methods=['GET', 'POST'])
def teacherprofilepage():
    # thisuseremail = session['email']
    # thisuseremail = thisuseremail.replace("@", "at")
    # thisuseremail = thisuseremail.replace(".", "dot")
    # profileimagepath = "/".join([thisuseremail, 'profilephoto'])
    # filename = "profilephoto.jpg"
    # profileimagefile = "/".join([profileimagepath, filename])
    form = TeacherProfileForm(request.form)
    thisteacher = Teacher.query.filter_by(email=session['email']).first()
    teachernames = 'atul'
    if form.validate_on_submit():
        thisteacher = Teacher.query.filter_by(email=session['email']).first()
        thisteacher.FirstName=form.FirstName.data
        thisteacher.LastName=form.LastName.data
        thisteacher.Qualifications=form.Qualifications.data
        thisteacher.Experiences=form.Experiences.data
        thisteacher.State=form.State.data
        thisteacher.Country=form.Country.data
        #db.session.add(thisteacher)
        db.session.commit()
        flash('Profile updated successfully!')
        return render_template('auth/teacherprofilepage.html', form=form,thisteacher=thisteacher)
    form.FirstName.data = thisteacher.FirstName
    form.LastName.data = thisteacher.LastName
    form.Qualifications.data = thisteacher.Qualifications
    form.Experiences.data = thisteacher.Experiences
    form.State.data = thisteacher.State
    form.Country.data = thisteacher.Country
    return render_template('auth/teacherprofilepage.html', form=form,thisteacher=thisteacher)  # , teachernames=teachernames,profileimagefile=profileimagefile)
        #, teachernames=teachernames,profileimagefile=profileimagefile)
    #     else:
    #         # Teacher.query.filter_by(email=session['email']).first().update(FirstName=form.FirstName.data,
    #         #                       LastName=form.LastName.data,
    #         #                       Qualifications=form.Qualifications.data,Experiences=form.Experiences.data,
    #         #                       State=form.State.data,
    #         #                       Country=form.Country.data,email=session['email'])

    #
    #         db.session.commit()
    #         flash('Profile updated successfully!')
    #         return render_template('auth/teacherprofilepage.html', form=form,thisteacher=thisteacher, teachernames=teachernames,profileimagefile=profileimagefile)
    #
    # else:


@auth.route("/teacherprofilepagenoedit", methods=['GET', 'POST'])
def teacherprofilepagenoedit():
    thisuseremail = session['email']
    thisuseremail = thisuseremail.replace("@", "at")
    thisuseremail = thisuseremail.replace(".", "dot")
    profileimagepath = "/".join([thisuseremail, 'profilephoto'])
    filename = "profilephoto.jpg"
    profileimagefile = "/".join([profileimagepath, filename])
    form = TeacherProfileForm(request.form)
    thisteacher = Teacher.query.filter_by(email=session['email']).first()
    teachernames = 'atul'
    if form.validate_on_submit():

        thisteacher = Teacher(FirstName=form.FirstName.data,
                              LastName=form.LastName.data,
                              Qualifications=form.Qualifications.data,Experiences=form.Experiences.data,
                              State=form.State.data,
                              Country=form.Country.data,email=session['email'])
        db.session.add(thisteacher)
        db.session.commit()
        form.FirstName.data = thisteacher.FirstName
        form.LastName.data = thisteacher.LastName
        form.Qualifications.data = thisteacher.Qualifications
        form.Experiences.data = thisteacher.Experiences
        form.State.data = thisteacher.State
        form.Country.data = thisteacher.Country
        flash('Profile updated successfully!')
        return render_template('auth/teacherprofilepagenoedit.html',thisteacher=thisteacher, form=form, teachernames=teachernames,profileimagefile=profileimagefile)
    elif thisteacher is not None:
        form.FirstName.data = thisteacher.FirstName
        form.LastName.data = thisteacher.LastName
        form.Qualifications.data = thisteacher.Qualifications
        form.Experiences.data = thisteacher.Experiences
        form.State.data = thisteacher.State
        form.Country.data = thisteacher.Country
        return render_template('auth/teacherprofilepagenoedit.html',thisteacher=thisteacher, form=form, teachernames=teachernames,profileimagefile=profileimagefile)
    else:

        return  render_template('auth/teacherprofilepagenoedit.html',thisteacher=thisteacher, form=form,teachernames=teachernames,profileimagefile=profileimagefile)



@auth.route("/uploadprofilephoto", methods=['GET', 'POST'])
def uploadprofilephoto():
    thisuseremail = session['email']
    thisuseremail = thisuseremail.replace("@", "at")
    thisuseremail = thisuseremail.replace(".", "dot")
    # thisuserdirectory='uploadedimages/' + thisuseremail
    thisuserdirectory = 'static'
    for file in request.files.getlist("file"):

        # '''uploadedimages/'
        target1 = os.path.join(THIS_DIR, thisuserdirectory)
        target = os.path.join(target1, thisuseremail)
        profileimagepath = "/".join([target, 'profilephoto'])
        filepath="/".join([profileimagepath, file.filename])
        file.save(filepath)
        print(filepath)
    return "XX"






@auth.route("/teacherslist")
def teacherslist():
    print(session['authenticated'])
    if session['authenticated']==True:
        try:
            thisuseremail = session['email']
            print(thisuseremail)
            teachernames = Teacher.query.all()
            return  render_template('auth/teachernames.html', teachernames=teachernames)
        except Exception as e:
            return render_template("500.html", error=e)
    return redirect(url_for('main.index'))


@auth.route("/teachersprofile")
def teachersprofile():
    return render_template('courses.html')

@auth.route("/studentsprofile")
def studentsprofile():
    return render_template('courses.html')
