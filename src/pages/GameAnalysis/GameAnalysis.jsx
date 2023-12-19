/* eslint-disable react/prop-types */
import ChessBoard from "../../components/ChessBoard"
import Piece from "../../components/Piece";
import Nav from '../../components/Nav'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useState, useEffect, useCallback } from "react"
import { Chess } from 'chess.js'
import { chessBoardToFEN, fenToChessboard } from '../../helpers/fen.js'
import { toast } from 'react-toastify'
import './GameAnalysis.scss'


export default function GameAnalysis(props) {
  const [engineEval, setEngineEval] = useState(false);
  const [stockfish, setStockfish] = useState(null);
  const [chess, setChess] = useState(null);
  const [isGame, setIsGame] = useState(false);
  const [invalidMove, setInvalidMove] = useState(false);
  const [result, setResult] = useState(null);
  const [chessboardFen, setChessboardFen] = useState('8/8/8/8/8/8/8/8 w - - 0 1')

  const mouseSensor = useSensor(MouseSensor); // Initialize mouse sensor
  const touchSensor = useSensor(TouchSensor); // Initialize touch sensor
  const sensors = useSensors(mouseSensor, touchSensor)


  useEffect(() => {
    if (props.fen !== null && props.fen !== undefined) {
      setChess(new Chess(props.fen))
    }

    else {
      setChess(new Chess())
    }
  }, [])

  useEffect(() => {
    var wasmSupported = typeof WebAssembly === 'object' && WebAssembly.validate(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));

    var sf = new Worker(wasmSupported ? 'stockfish.wasm.js' : 'stockfish.js');

    sf.addEventListener('message', function(e) {
      console.log(e.data);
      const cpEval = e.data.match(/score cp (-?\d+)/);
      const mate = e.data.match(/score mate (-?\d+)/);

      console.log(cpEval);
      console.log(mate);
      if (cpEval) {
        setEngineEval(parseInt(cpEval[1]) / 1000);
      }

      else if (mate) {
        setEngineEval("Mate in " + parseInt(mate[1]));
      }
    });

    sf.postMessage('uci');

    setStockfish(sf);
  }, [])

  const handleDragEnd = (e) => { // main loop
    const parent = e.over ? e.over.id : null;
    const sq = parseInt(parent.replace("droppable-", ""))

    let row = Math.floor(sq / 8);
    let col = sq % 8;


    if (isGame) {
      try {
        chess.move({
          from: String.fromCharCode(e.active.data.current?.position[1] + 97) + String(8 - e.active.data.current?.position[0]),
          to: String.fromCharCode(col + 97) + String(8 - row)
        })
      }
      catch {
        setInvalidMove(true);
        return;
      }
    }

    let sqChildrenCopy = fenToChessboard(chessboardFen);

    sqChildrenCopy[row][col] = e.active.data.current?.type;

    if (isGame) {
      sqChildrenCopy[e.active.data.current?.position[0]][e.active.data.current?.position[1]] = null;

      if (chess.isGameOver()) {
        if (chess.isCheckmate()) {
          setResult(chess.turn == "w" ? "Black Wins" : "White Wins");
        }
        else if (chess.isDraw()) {
          setResult("Game ended in draw");
        }
      }

      handleEngineEval();
    }

    setChessboardFen(chessBoardToFEN((sqChildrenCopy)))
  }

  const handleEngineEval = () => {
    stockfish.postMessage("position fen " + chessboardFen);
    stockfish.postMessage("go depth 15");
  }

  const handleAnalyzeGame = () => {
    try {
      chess.load(chessboardFen);
    }

    catch (e) {
      console.log("Error while trying to load fen " + chessboardFen);
      alert("INVALID FEN");
      return;
    }

    const chessLibBoard = chess.board();
    console.log(chess.board())
    let squareChildrenCopy = fenToChessboard(chessboardFen);

    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
        let piece = chessLibBoard[i][j]?.type;
        if (piece && chessLibBoard[i][j].color === "w") {
          piece = piece.toUpperCase()
        }

        squareChildrenCopy[i][j] = piece;
        console.log(chessLibBoard[i][j]);

      }
    }
    setChessboardFen(chessBoardToFEN(squareChildrenCopy));
    setIsGame(true);
  }

  const handleGameFromHere = () => {
    chess.load(chessboardFen);
    setIsGame(true);
  }

  useEffect(() => {
    console.log("chessboard fen -> " + chessboardFen);
    console.log("sqChildren -> ")
    console.log(fenToChessboard(chessboardFen));
  })

  useEffect(() => {
    if (invalidMove) {
      toast.error("Invalid Move!");
    }
  }, [invalidMove])


  useEffect(() => {
    if (result) {
      toast.info(result);
    }
  }, [result])

  return (
    <div className="background_control testing">
      <Nav />
      <div className="container_content">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>

          <ChessBoard height='60px' width='60px' fenPosition={chessboardFen} perspective={"b"} />

          <div className="pieces_analysis">
            <div className="pieces_analysis_container">
              <Piece type="p" id={65} />
              <Piece type="n" id={66} />
              <Piece type="k" id={67} />
              <Piece type="q" id={68} />
              <Piece type="b" id={69} />

              <Piece type="P" id={70} />
              <Piece type="N" id={71} />
              <Piece type="K" id={72} />
              <Piece type="Q" id={73} />
              <Piece type="B" id={74} />

            </div>
          </div>

          <div className="container_analysis_bt">
            <button onClick={handleEngineEval} className="analysis-bt">
              Evaluate Position
            </button>
            <p className="p_engine_eval">{engineEval && engineEval}</p>
            <button onClick={handleAnalyzeGame} className="analysis-bt">
              Analyze Game
            </button>
            <button onClick={handleGameFromHere} className="analysis-bt">
              Game From Here
            </button>
            <button onClick={() => {
              setChessboardFen('8/8/8/8/8/8/8/8 w KQkq - 0 1');
              setIsGame(false);
            }} className="analysis-bt">
              Empty Board
            </button>
          </div>
        </DndContext>

      </div>
    </div>
  )
}
