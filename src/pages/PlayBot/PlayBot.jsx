/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useContext, useEffect, useState } from "react"
import ChessBoard from "../../components/ChessBoard"
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Chess } from "chess.js"
import { fenToChessboard, chessBoardToFEN } from "../../helpers/fen";
import { toast } from "react-toastify";
import Nav from '../../components/Nav'
import './PlayBot.scss'
import { ThemeContext } from "../../App";

const PlayBot = () => {
  const [stockfish, setStockfish] = useState(null);
  const [fenPosition, setFenPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const [game, setGame] = useState(null);
  const [depth, setDepth] = useState("15")

  const mouseSensor = useSensor(MouseSensor); // Initialize mouse sensor
  const touchSensor = useSensor(TouchSensor); // Initialize touch sensor
  const sensors = useSensors(mouseSensor, touchSensor)

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    var g = new Chess(fenPosition);
    setGame(g);
  }, [])

  useEffect(() => {
    var wasmSuppported = typeof WebAssembly === 'object' && WebAssembly.validate(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));

    var sf = new Worker(wasmSuppported ? 'stockfish.wasm.js' : 'stockfish.js');

    sf.postMessage('uci');
    setStockfish(sf);
    console.log(fenPosition);
  }, [])

  useEffect(() => {
    if (stockfish !== null && game !== null) {
      stockfish.addEventListener('message', (e) => {
        const response = e?.data;
        if (response.includes('bestmove')) {
          const move = response.split(' ')[1];
          game.move(move);
          if (game.isGameOver()) {
            if (game.isDraw()) {
              toast.info("Game ended in draw", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: theme,
              })
            } else {
              toast.error("Sorry you lost the game", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: theme,
              })

            }
          }
          setFenPosition(game.fen());
        }
      })
    }
  }, [stockfish, game])

  const handleDragEnd = (e) => {
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
      toast.error("Invalid Move", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme
      })
      return;
    }

    let sqChildrenCopy = fenToChessboard(fenPosition);
    sqChildrenCopy[row][col] = e.active.data.current?.type;

    sqChildrenCopy[e.active.data.current?.position[0]][e.active.data.current?.position[1]] = null;

    if (game.isGameOver()) {
      console.log(game.turn())
      if (game.isDraw()) {
        toast.info("Game ended in draw", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
        })
      }
      else {
        toast.success("Congrats, you won the game", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
        })
      }

    }

    setFenPosition(game.fen())
    setGame(game);
    stockfish.postMessage("position fen " + game.fen());
    stockfish.postMessage(`go depth ${depth}`);
  }

  return (
    <div className="background_control">
      <div className="play_bot">
        <Nav />
        <div className="difficulty_selector_wrapper">
          <div>
            <p>Select Difficulty</p>

            <input type="range" min="0" max="20" className="difficulty_selector" onChange={(e) => setDepth(e.value)} />
          </div>
        </div>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <ChessBoard fenPosition={fenPosition} height="60px" width="60px" perspective={"w"} />
        </DndContext>
      </div>
    </div>
  )
}

export default PlayBot
