from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField,TextAreaField
from wtforms.validators import DataRequired, Length, Email, Regexp, EqualTo
from wtforms import ValidationError
from ..models import User


class TeacherProfileForm(FlaskForm):
    FirstName = StringField('First Name', validators=[
        DataRequired(), Length(1, 64),
        Regexp('^[A-Za-z][A-Za-z0-9]*$', 0,
               'Usernames must have only letters')])
    LastName = StringField('Last Name', validators=[
        DataRequired(), Length(1, 64),
        Regexp('^[A-Za-z][A-Za-z0-9]*$', 0,
               'Usernames must have only letters')])
    Qualifications = StringField('Qualifications', validators=[DataRequired(), Length(1, 64)])
    Experiences = TextAreaField('Experiences', render_kw={"rows": 11, "cols": 11}, validators=[DataRequired(), Length(1, 2000)])
    State = StringField('State', validators=[DataRequired(), Length(1, 64)])
    Country = StringField('Country', validators=[DataRequired(), Length(1, 64)])
    submit = SubmitField('Update')


class StudentProfileForm(FlaskForm):
    FirstName = StringField('First Name', validators=[
        DataRequired(), Length(1, 64),
        Regexp('^[A-Za-z][A-Za-z0-9]*$', 0,
               'Usernames must have only letters')])
    LastName = StringField('Last Name', validators=[
        DataRequired(), Length(1, 64),
        Regexp('^[A-Za-z][A-Za-z0-9]*$', 0,
               'Usernames must have only letters')])
    Qualifications = StringField('Qualifications', validators=[DataRequired(), Length(1, 64)])
    Requirements = TextAreaField('Experiences', render_kw={"rows": 70, "cols": 11}, validators=[DataRequired(), Length(1, 2000)]) # TextAreaField('Text', render_kw={"rows": 70, "cols": 11})
    State = StringField('State', validators=[DataRequired(), Length(1, 64)])
    Country = StringField('Country', validators=[DataRequired(), Length(1, 64)])
    submit = SubmitField('Update')


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Length(1, 64),
                                             Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Keep me logged in')
    submit = SubmitField('Log In')


class RegistrationForm(FlaskForm):
    username = StringField('Email', validators=[
        DataRequired(), EqualTo('email', message='Email must match.')])
    email = StringField('Confirm Email', validators=[DataRequired(), Length(1, 64),
                                                     Email()])

    # username = StringField('Username', validators=[
    #     DataRequired(), Length(1, 64),
    #     Regexp('^[A-Za-z][A-Za-z0-9_.]*$', 0,
    #            'Usernames must have only letters, numbers, dots or '
    #            'underscores')])
    password = PasswordField('Password', validators=[
        DataRequired(), EqualTo('password2', message='Passwords must match.')])
    password2 = PasswordField('Confirm password', validators=[DataRequired()])
    submit = SubmitField('Register')

    # email = StringField('Email', validators=[DataRequired(), Length(1, 64),
    #                                          Email()])
    # username = StringField('Username', validators=[
    #     DataRequired(), Length(1, 64),
    #     Regexp('^[A-Za-z][A-Za-z0-9_.]*$', 0,
    #            'Usernames must have only letters, numbers, dots or '
    #            'underscores')])
    # password = PasswordField('Password', validators=[
    #     DataRequired(), EqualTo('password2', message='Passwords must match.')])
    # password2 = PasswordField('Confirm password', validators=[DataRequired()])
    # submit = SubmitField('Register')

    def validate_email(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('Email already registered.')

    def validate_username(self, field):
        if User.query.filter_by(username=field.data).first():
            raise ValidationError('Username already in use.')


class ChangePasswordForm(FlaskForm):
    old_password = PasswordField('Old password', validators=[DataRequired()])
    password = PasswordField('New password', validators=[
        DataRequired(), EqualTo('password2', message='Passwords must match.')])
    password2 = PasswordField('Confirm new password',
                              validators=[DataRequired()])
    submit = SubmitField('Update Password')


class PasswordResetRequestForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Length(1, 64),
                                             Email()])
    submit = SubmitField('Reset Password')


class PasswordResetForm(FlaskForm):
    password = PasswordField('New Password', validators=[
        DataRequired(), EqualTo('password2', message='Passwords must match')])
    password2 = PasswordField('Confirm password', validators=[DataRequired()])
    submit = SubmitField('Reset Password')


class ChangeEmailForm(FlaskForm):
    email = StringField('New Email', validators=[DataRequired(), Length(1, 64),
                                                 Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Update Email Address')

    def validate_email(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('Email already registered.')
