import ChessBoard from "../../components/ChessBoard"
import Piece from "../../components/Piece";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useState, useEffect } from "react"
import { Chess } from 'chess.js'

function chessBoardToFEN(chessBoard) {
  const activeColor = 'white';
  const enPassantSquare = null;
  // if (!isValidChessBoard(chessBoard)) {
  //   throw new Error('Invalid chess board');
  // }

  let fen = '';

  // Convert the board positions
  for (let rank = 7; rank >= 0; rank--) {
    let emptySquares = 0;
    for (let file = 0; file < 8; file++) {
      const piece = chessBoard[rank][file];
      if (piece === null) {
        emptySquares++;
      } else {
        if (emptySquares > 0) {
          fen += emptySquares;
          emptySquares = 0;
        }
        fen += piece;
      }
    }

    if (emptySquares > 0) {
      fen += emptySquares;
    }

    if (rank !== 0) {
      fen += '/';
    }
  }

  // Add the active color
  fen += ' ' + (activeColor === 'white' ? 'w' : 'b');

  // Add castling rights
  const castlingRights = ['K', 'Q', 'k', 'q'];
  let castlingString = '';
  for (const castlingRight of castlingRights) {
    // if (chessBoard[castlingRight] === true) {
    castlingString += castlingRight;
    // }
  }

  fen += ' ' + (castlingString === '' ? '-' : castlingString);

  // Add en-passant target square
  fen += ' ' + (enPassantSquare === null ? '-' : enPassantSquare);

  // Add half-move and full-move counters
  // fen += ' ' + halfMoveClock + ' ' + fullMoveNumber;
  fen += ' 0 1 ';

  return fen;
}

export default function GameAnalysis(props) {
  const [squareChildren, setSquareChildren] = useState(null);
  const [engineEval, setEngineEval] = useState(false);
  const [stockfish, setStockfish] = useState(null);
  const [chess, setChess] = useState(null);
  const [isGame, setIsGame] = useState(false);

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

    sf.addEventListener('message', function (e) {
      console.log(e.data);
      const cpEval = e.data.match(/score cp (-?\d+)/);
      const mate = e.data.match(/score mate (-?\d+)/);

      console.log(cpEval);
      console.log(mate);
      if (cpEval) {
        setEngineEval(parseInt(cpEval[1])/1000);
      }

      else if (mate) {
        setEngineEval("Mate in " + parseInt(mate[1]));
      }
    });

    sf.postMessage('uci');

    setStockfish(sf);
  }, [])

  const handleDragEnd = (e) => {
    const parent = e.over ? e.over.id : null;
    const sq = parseInt(parent.replace("droppable-", ""))

    let row = Math.floor(sq / 8);
    let col = sq % 8;

    let sqChildrenCopy = JSON.parse(JSON.stringify(squareChildren));

    sqChildrenCopy[row][col] = e.active.data.current?.type;

    if (isGame) {
      sqChildrenCopy[e.active.data.current?.position[0]][e.active.data.current?.position[1]] = null;
      chess.move({from: String.fromCharCode(e.active.data.current?.position[1] + 97) + String(8 - e.active.data.current?.position[0]), 
                  to: String.fromCharCode(col + 97) + String(8 - row) })
    }

    setSquareChildren(sqChildrenCopy);
  }

  const handleEngineEval = () => {
    const fen = chessBoardToFEN(squareChildren);
    stockfish.postMessage("position fen " + fen);
    stockfish.postMessage("go depth 15");
  }

  const handleAnalyzeGame = () => {
    chess.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    const chessLibBoard = chess.board();
    console.log(chess.board())
    let squareChildrenCopy = JSON.parse(JSON.stringify(squareChildren));

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
    setSquareChildren(squareChildrenCopy);
    setIsGame(true);
  }

  const handleGameFromHere = () => {
    chess.load(chessBoardToFEN(squareChildren));
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <ChessBoard height='60px' width='60px' squareChildren={squareChildren} setSquareChildren={setSquareChildren}/>

      <Piece type="p" id={1}/>
      <Piece type="n" id={2}/>
      <Piece type="k" id={3}/>
      <Piece type="q" id={4}/>
      <Piece type="b" id={5}/>

      <Piece type="P" id={6}/>
      <Piece type="N" id={7}/>
      <Piece type="K" id={8}/>
      <Piece type="Q" id={9}/>
      <Piece type="B" id={10}/>

      <button onClick={handleEngineEval}>
        Evaluate Position
      </button>

      {engineEval && engineEval}

      <button onClick={handleAnalyzeGame}>
        Analyze Game
      </button>

      <button onClick={handleGameFromHere}>
        Game From Here
      </button>

    </DndContext>
  )
}
