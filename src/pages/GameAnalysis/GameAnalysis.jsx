import ChessBoard from "../../components/ChessBoard"
import Piece from "../../components/Piece";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useState } from "react"

export default function GameAnalysis() {
  const [squareChildren, setSquareChildren] = useState(null);

  const mouseSensor = useSensor(MouseSensor); // Initialize mouse sensor
  const touchSensor = useSensor(TouchSensor); // Initialize touch sensor
  const sensors = useSensors(mouseSensor, touchSensor)

  const handleDragEnd = (e) => {
    const parent = e.over ? e.over.id : null;
    const sq = parseInt(parent.replace("droppable-", ""))

    let row = Math.floor(sq / 8);
    let col = sq % 8;

    let sqChildrenCopy = JSON.parse(JSON.stringify(squareChildren));

    sqChildrenCopy[row][col] = e.active.data.current?.type;
    setSquareChildren(sqChildrenCopy);
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

    </DndContext>
  )
}
