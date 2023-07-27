import { useEffect, useState } from "react"
import ChessBoard from "../../components/ChessBoard"
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Chess } from "chess.js"

const PlayBot = () => {
  const [stockfish, setStockfish] = useState(null);
  const [fenPosition, setFenPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')

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


    sf.addEventListener('message',  (e) => {
      const response = e?.data;
      if (response.includes('bestmove')) {
        const move = response.split(' ')[1];
        game.move(move);
        setGame(game);
        setFenPosition(game.fen());
      }
    })

    sf.postMessage('uci');
    setStockfish(sf);
  })

  const handleDragEnd = (e) => {
    const parent = e.over ? e.over.id : null;
    const sq = parseInt(parent.replace('droppable-', ''));

    let row = Math.floor(sq / 8);
    let col = sq % 8;

    try {
      chess.move({from: String.fromCharCode(e.active.data.current?.position[1] + 97) + String(8 - e.active.data.current?.position[0]), 
                    to: String.fromCharCode(col + 97) + String(8 - row) })
    }
    
    catch {
      setInvalidMove(true);
      return;
    }
    
  }
  return (
    <div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <ChessBoard fenPosition={fenPosition} onMovePiece={handleMovePiece}/>
      </DndContext>
    </div>
  )
}

export default PlayBot
