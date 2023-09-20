import flask_praetorian
from flask import Blueprint, request, current_app
from __init__ import db

guard = flask_praetorian.Praetorian()

bp = Blueprint('auth', __name__)


@bp.route('/api/login', methods=["POST"])
def login_user():
    req = request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)

    user = guard.authenticate(username, password)

    ret = { 'access_token': guard.encode_jwt_token(user)}
    return ret, 200

@bp.route('/api/refresh', methods=["POST"])
def refresh():
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = { 'access_token': new_token }
    return ret, 200

@bp.route('/api/signup', methods=["POST"])
def sign_up():
    req = request.get_json(force=True)
    
    email = req.get('email', None)
    username = req.get('username', None)
    password = req.get('password', None)

    if email is None or password is None or username is None:
        return {}, 403
    
    from models import User
    new_user = User(
            username=username,
            password=guard.hash_password(password)
    )

    db.session.add(new_user)
    db.session.commit()

    print(current_app.config['MAIL_USERNAME'])
    print(current_app.config['MAIL_PASSWORD'])
    guard.send_registration_email(email,
                                  user=new_user,
                                  confirmation_sender=current_app.config['MAIL_USERNAME'],
                                  confirmation_uri=current_app.config["FINALIZE_URI"])

    return {'result': 'success'}, 201

@bp.route('/api/finalize', methods=["POST"])
def finalize():
    registration_token = guard.read_token_from_header()
    user = guard.get_user_from_registration_token(registration_token)

    ret = { 'access_token': guard.encode_jwt_token(user) }
    return ret, 200
