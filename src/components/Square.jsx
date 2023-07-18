
export default function Square(props) {
  const color = props.color === 1 ? "#808080" : '#d9d9d9';

  return (
    <div style={{height: props.height, width: props.width, backgroundColor: color}}>
    </div>
  )
}
