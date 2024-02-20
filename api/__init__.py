from auth import guard
from flask import Flask
from dotenv import load_dotenv
import os
from rooms.socketio import socketio
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail

db = SQLAlchemy()


load_dotenv()


def create_app():
    app = Flask(__name__)

    import rooms
    import auth

    app.register_blueprint(rooms.sockets)
    app.register_blueprint(auth.bp)

    socketio.init_app(app)

    import models

    app.config.from_mapping(
        SECRET_KEY=os.getenv('FLASK_SECRET_KEY'),
        CORS_HEADERS='Content-Type',
        SQLALCHEMY_DATABASE_URI='sqlite:///db.sqlite',
        MAIL_SERVER='smtp.gmail.com',
        MAIL_PORT=587,
        MAIL_USERNAME=os.environ.get('MAIL_USERNAME'),
        MAIL_PASSWORD=os.environ.get('MAIL_PASSWORD'),
        MAIL_USE_TLS=True,
        MAIL_USE_SSL=False,
        FINALIZE_URI=os.environ.get(
            "FRONTEND_DOMAIN") + '/confirm-registration'  # type: ignore
    )

    mail = Mail(app)  # type: ignore

    guard.init_app(app, models.User)

    db.init_app(app)

    from flask_cors import CORS

    app.config["rooms"] = {}
    print("app.config['secret_key'] = " + app.config["SECRET_KEY"])
    print("app.config['rooms'] = " + str(app.config['rooms']))

    CORS(app, supports_credentials=True, expose_headers="Authorization")

    with app.app_context():
        db.create_all()

    return app
