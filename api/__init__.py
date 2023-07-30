from flask import Flask
from dotenv import load_dotenv
import os
from rooms.socketio import socketio

load_dotenv()


def create_app():
    app = Flask(__name__)

    import rooms
    app.register_blueprint(rooms.sockets)

    socketio.init_app(app)


    app.config.from_mapping(
        SECRET_KEY=os.getenv('FLASK_SECRET_KEY'),
        CORS_HEADERS='Content-Type'
    )


    from flask_cors import CORS

    app.config["rooms"] = {}
    print("app.config['secret_key'] = " + app.config["SECRET_KEY"])
    print("app.config['rooms'] = " + str(app.config['rooms']))

    CORS(app, supports_credentials=True, expose_headers="Authorization")


    return app
