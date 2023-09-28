/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useLocation } from "react-router-dom"
import io from "socket.io-client"
import { API_BASE_URL } from "../../constants";
import { useEffect, useState } from "react"
import ChessBoard from '../../components/ChessBoard'
import { DndContext } from "@dnd-kit/core";
import { fenToChessboard } from "../../helpers/fen";
import { useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { Chess } from "chess.js";
import './MultiPlayer.scss'
import Nav from '../../components/Nav'

const socket = io(API_BASE_URL)

const MultiPlayer = () => {
  const [socketioRoom, setSocketioRoom] = useState(null);
  const username = localStorage.getItem('username');

  const mouseSensor = useSensor(MouseSensor); // Initialize mouse sensor
  const touchSensor = useSensor(TouchSensor); // Initialize touch sensor
  const sensors = useSensors(mouseSensor, touchSensor)

  const [fenPosition, setFenPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const [invalidMove, setInvalidMove] = useState(null)
  const [game, setGame] = useState(null);
  const [opponentPlayer, setOpponentPlayer] = useState('');
  const [playerColor, setPlayerColor] = useState(null);

  useEffect(() => {
    var g = new Chess(fenPosition);
    setGame(g);
  }, [])

  const getRoomInfo = (sckRoom) => {
    fetch(`${API_BASE_URL}/room/${sckRoom}`)
      .then(res => res.json())
      .then(data => {
        console.log("getting room info")
        console.log(data);
        setOpponentPlayer(data.w === username ? data.b : data.w)
        if (data.w === username) {
          setPlayerColor('w');
        }

        else {
          setPlayerColor('b');
        }
      });
  }
  useEffect(() => {
    socket.on("new_player", () => {
      console.log("NEW PLAYER")
      console.log("socketioRoom -> " + socketioRoom)
      getRoomInfo(socketioRoom);
    })

    return () => {
      socket.off("new_player");
    }
  }, [socketioRoom]);

  useEffect(() => {
    socket.emit("join_room", { username: username }, (response) => {
      console.log("inside emit join_room")
      console.log(response)
      if (response.success) {
        setSocketioRoom(response.room);
      }
      getRoomInfo(response.room);
    });
    console.log('calling join room');

    return () => {
      socket.emit("leave_room", { username: username, room: socketioRoom });
    }
  }, [])
  useEffect(() => {
    console.log("socketioroom -> " + socketioRoom);
  }, [socketioRoom]);


  useEffect(() => {
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
      game.move({
        from: String.fromCharCode(e.active.data.current?.position[1] + 97) + String(8 - e.active.data.current?.position[0]),
        to: String.fromCharCode(col + 97) + String(8 - row)
      })
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
    socket.emit("move", {
      move: {
        from: String.fromCharCode(e.active.data.current?.position[1] + 97) + String(8 - e.active.data.current?.position[0]),
        to: String.fromCharCode(col + 97) + String(8 - row)
      }, room: socketioRoom
    })
  }

  useEffect(() => {
    console.log(playerColor);
  }, [playerColor])
  return (
    <>
      <Nav />
      <div className="background_control">
        <main className="chess_board_container">
          <h2> {socketioRoom} </h2>
          <div className="username_container">
            <span className="span1">
              <p>{opponentPlayer}</p>
            </span>
            <span className="span2">
              <p>{username}</p>
            </span>
          </div>
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <ChessBoard
              width="60px"
              height="60px"
              fenPosition={fenPosition}
              perspective={playerColor}
              className='chess_board'
            />
          </DndContext>
          
        </main>
      </div>
    </>

  )
}

export default MultiPlayer;
