/* eslint-disable react/prop-types */
import { useDroppable } from "@dnd-kit/core";
import Piece from "./Piece";

export default function Square(props) {
  const color = props.color === 1 ? "#808080" : '#d9d9d9';
  const { setNodeRef } = useDroppable({
    id: "droppable-" + String(props.id)
  })

  return (
    <div className="square" ref={setNodeRef} style={{ height: props.height, width: props.width, backgroundColor: color }}>
      {props.child == null ? "" : <Piece type={props.child} id={props.id} position={[props.rank, props.file]} />}
    </div>
  )
}
