import { useLocation } from "react-router-dom"
import io from "socket.io-client"
import { API_BASE_URL } from "../../constants";
import { useEffect } from "react"

const socket = io(API_BASE_URL)

const MultiPlayer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const socketioRoom = searchParams.get('room');
  const username = localStorage.getItem('username');

  useEffect(() => {
    socket.emit("join_room", {room: socketioRoom, username: username})
  })
  return (
    <>
    <h2> {socketioRoom} </h2>
    <p>{username}</p>
    </>
  )
}

export default MultiPlayer;
