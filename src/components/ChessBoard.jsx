import { useEffect, useState } from 'react';
import Square from './Square'

export default function ChessBoard(props) {
  const [chessboardMatrix, setChessboardMatrix] = useState([]);

  useEffect(() => {
    let chessboard_matrix = Array(8);
    for (let i = 0; i < 8; ++i) {

      chessboard_matrix[i] = Array(8);
      for (let j = 0; j < 8; ++j) {
        chessboard_matrix[i][j] = (i+j) % 2 == 0 ? 0 : 1;
      }
    }

    console.log(chessboard_matrix);
    setChessboardMatrix(chessboard_matrix);
  }, [])

  return (
    <div className="chessboard">
      {chessboardMatrix.map((row) => {
        return <div style={{display: "flex", flexDirection: "row"}}>
           {row.map((sqColor) => <Square height={props.height} width={props.width} color={sqColor}/>)}
        </div>
      })}
    </div>
  )
}
