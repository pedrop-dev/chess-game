/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useState } from "react"
import ChessBoard from "../../components/ChessBoard"
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Chess } from "chess.js"
import { fenToChessboard, chessBoardToFEN } from "../../helpers/fen";
import Nav from '../../components/Nav'
import './PlayBot.scss'

const PlayBot = () => {
  const [stockfish, setStockfish] = useState(null);
  const [fenPosition, setFenPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const [invalidMove, setInvalidMove] = useState(false);
  const [game, setGame] = useState(null);

  const mouseSensor = useSensor(MouseSensor); // Initialize mouse sensor
  const touchSensor = useSensor(TouchSensor); // Initialize touch sensor
  const sensors = useSensors(mouseSensor, touchSensor)

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
      stockfish.addEventListener('message',  (e) => {
        const response = e?.data;
        if (response.includes('bestmove')) {
          const move = response.split(' ')[1];
          game.move(move);
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
        setResult(game.turn == "w" ? "Black Wins" : "White Wins");
      }

      else if (game.isDraw()) {
        setResult("Game ended in draw");
      }
    }

    setFenPosition(game.fen())
    setGame(game);
    stockfish.postMessage("position fen " + game.fen());
    stockfish.postMessage("go depth 15");

  }
  return (
    <>
      <Nav />
      <div className="background_control">
        <div className="chess_board_container">
          {invalidMove && "Invalid Move"}
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <ChessBoard fenPosition={fenPosition} height="60px" width="60px" perspective={"w"}/>
          </DndContext>
        </div>
      </div>
    </>
  )
}

export default PlayBot
