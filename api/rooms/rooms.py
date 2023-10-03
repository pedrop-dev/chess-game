from flask_socketio import join_room, leave_room, emit
from flask import current_app, json
from .socketio import socketio
import flask_praetorian
import sys
import json

guard = flask_praetorian.Praetorian()

@socketio.on('join_room')
def on_join(data):
    if 'token' in data:
        current_user_id = guard.extract_jwt_token(data['token'])['id']
        from models import User
        username = User.query.filter_by(id=current_user_id).first().username
        
    else:
        username = data['username']
        
    room = data.get('room')


    print("JOINING ROOM", file=sys.stderr)
    
    for room, player_count in current_app.config['rooms'].items():
        if player_count['num'] < 2:
            join_room(room)
            emit('message', f'{username} has joined room {room}', room=room)
            print(f'{username} has joined room {room}')

            data = {'room': room}

            current_app.config['rooms'][room]['num'] += 1
            current_app.config['rooms'][room]['players']['b'] = username

            emit('new_player', room=room)
            return {"room": room, "success": 1}

    new_room = len(current_app.config['rooms']) + 1
    current_app.config['rooms'][new_room] = {'num': 1, 'players': {'w': username}}
    join_room(new_room)

    emit('message', f'{username} has joined room {new_room}', room=new_room)

    data = {'room': new_room, 'username': username}

    emit('new_player', room=room)
    return {"room": new_room, "success": 1}

@socketio.on('leave_room')
def on_leave(data):
    username = data['username']
    room = data['room']
    
    leave_room(room)
    socketio.emit('message', f'{username} has left room {room}', room=room)

@socketio.on("move")
def on_move(data):
    emit('opponent_move', {'color': data['color'], 'move': json.dumps(data['move'])}, room=data['room'])
