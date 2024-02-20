from flask_socketio import SocketIO
async_mode = "eventlet"
socketio = SocketIO(cors_allowed_origins="*", async_mode=async_mode)
