from flask_socketio import join_room, leave_room, emit
from flask import current_app
from .socketio import socketio
import sys

@socketio.on('join_room')
def on_join(data):
    username = data['username']
    room = data.get('room')

    if room is not None:
        join_room(room)
        emit("success_join_room")
        return

    print("JOINING ROOM", file=sys.stderr)
    
    for room, player_count in current_app.config['rooms'].items():
        if player_count < 2:
            join_room(room)
            emit('message', f'{username} has joined room {room}', room=room)

            data = {'room': room}
            emit("success_join_room", data, room=room)

            current_app.config['rooms'][room] += 1
            return

    new_room = len(current_app.config['rooms']) + 1
    current_app.config['rooms'][new_room] = 1
    join_room(new_room)
    emit('message', f'{username} has joined room {new_room}', room=new_room)

    data = {'room': new_room}

    emit("success_join_room", data, room=new_room)

@socketio.on('leave_room')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    socketio.emit('message', f'{username} has left room {room}', room=room)
