from flask import Blueprint, current_app

sockets = Blueprint('sockets', __name__)

@sockets.route('/room/<int:id>')
def get_room_info(id: int):
    return current_app.config['rooms'][id]['players']

from . import rooms

