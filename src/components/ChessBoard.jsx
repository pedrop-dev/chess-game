/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useEffect, useState, createContext } from 'react';
import Square from './Square'


export default function ChessBoard(props) {
  const [chessboardMatrix, setChessboardMatrix] = useState([]);

  const {squareChildren, setSquareChildren} = props;

  useEffect(() => {
    let chessboard_matrix = Array(8);
    let sqC = Array(8);
    for (let i = 0; i < 8; ++i) {

      chessboard_matrix[i] = Array(8);
      sqC[i] = Array(8);
      for (let j = 0; j < 8; ++j) {
        chessboard_matrix[i][j] = (i+j) % 2 == 0 ? 0 : 1;
        sqC[i][j] = null;
      }
    }

    console.log(chessboard_matrix);
    setChessboardMatrix(chessboard_matrix);
    setSquareChildren(sqC);
  }, [])

  let i = -1;


  return (
    <div className="chessboard">
      {chessboardMatrix.map((row) => {
        i++;
        let j = 0;
        return <div style={{display: "flex", flexDirection: "row"}}>
           {row.map((sqColor) => 
            <Square 
              height={props.height}
              width={props.width}
              color={sqColor}
              id={8*i + (j)}
              rank={i}
              file={j}
              child={squareChildren[i][j++]}/>)} 

        </div>
      })}
    </div>
  )
}
