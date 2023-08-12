/* eslint-disable react/prop-types */
import {useDraggable} from "@dnd-kit/core"
import {CSS} from "@dnd-kit/utilities"

export default function Piece(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: "draggable-" + props.id,
    data: { 
      index: props.id,
      type: props.type,
      position: props.position
    }
  });

  return (
    <img 
      {...attributes} 
      {...listeners} 
      ref={setNodeRef} 
      style={{transform: CSS.Translate.toString(transform)}} 
      src={props.type + ".png"} 
      alt=""
    />
  )
}
