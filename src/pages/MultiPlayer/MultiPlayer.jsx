import { useLocation } from "react-router-dom"
import io from "socket.io-client"
import { API_BASE_URL } from "../../constants";
import { useEffect, useState } from "react"
import ChessBoard from '../../components/ChessBoard' 
import { DndContext } from "@dnd-kit/core";
import { fenToChessboard } from "../../helpers/fen";
import { useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { Chess } from "chess.js";

const socket = io(API_BASE_URL)

const MultiPlayer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const socketioRoom = searchParams.get('room');
  const username = localStorage.getItem('username');

  const mouseSensor = useSensor(MouseSensor); // Initialize mouse sensor
  const touchSensor = useSensor(TouchSensor); // Initialize touch sensor
  const sensors = useSensors(mouseSensor, touchSensor)

  const [fenPosition, setFenPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const [invalidMove, setInvalidMove] = useState(null)
  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState(null);
  const [opponentPlayer, setOpponentPlayer] = useState('');
  const [playerColor, setPlayerColor] = useState(null);

  useEffect(() => {
    var g = new Chess(fenPosition);
    setGame(g);
  }, [])

  useEffect(() => {
    socket.on("new_player", () => {
      fetch(`${API_BASE_URL}/room/${socketioRoom}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setOpponentPlayer(data.w === username ? data.b : data.w)
          if (data.w === username) {
            setPlayerColor('w');
          }

          else {
            setPlayerColor('b');
          }
        });
    })
  }, []);

  useEffect(() => {
    socket.emit("join_room", {room: socketioRoom, username: username})
  }, [])

  useEffect(()=> {
    if (game !== null && game !== undefined) {
      socket.on("opponent_move", (data) => {
        game.move(JSON.parse(data.move))
        setGame(game);
        setFenPosition(game.fen());
      })
    }
  }, [game])

  const handleDragEnd = (e) => {
    if (game.turn() != playerColor) {
      console.log("AAAAAA")
      console.log(game.turn())
      console.log(playerColor)
      setInvalidMove(true);
      return;
    }

    const parent = e.over ? e.over.id : null;
    const sq = parseInt(parent.replace('droppable-', ''));

    let row = Math.floor(sq / 8);
    let col = sq % 8;

    try {
      game.move({from: String.fromCharCode(e.active.data.current?.position[1] + 97) + String(8 - e.active.data.current?.position[0]), 
                    to: String.fromCharCode(col + 97) + String(8 - row) })
    }
    
    catch {
      setInvalidMove(true);
      return;
    }
    
    let sqChildrenCopy = fenToChessboard(fenPosition);
    sqChildrenCopy[row][col] = e.active.data.current?.type;

    sqChildrenCopy[e.active.data.current?.position[0]][e.active.data.current?.position[1]] = null;

    if (game.isGameOver()) {
      if (game.isCheckmate()) {
        setResult(game.turn() == "w" ? "Black Wins" : "White Wins");
      }

      else if (game.isDraw()) {
        setResult("Game ended in draw");
      }
    }

    setFenPosition(game.fen())
    setGame(game);
    socket.emit("move", {move: {from: String.fromCharCode(e.active.data.current?.position[1] + 97) + String(8 - e.active.data.current?.position[0]), 
                    to: String.fromCharCode(col + 97) + String(8 - row) }, room: socketioRoom})
  }

  useEffect(() => {
    console.log(playerColor);
  }, [playerColor])
  return (
    <>
      <h2> {socketioRoom} </h2>
      <p>{opponentPlayer}</p>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <ChessBoard width="60px" height="60px" fenPosition={fenPosition} perspective={playerColor}/>
      </DndContext>
      <p>{username}</p>
    </>
  )
}

export default MultiPlayer;
