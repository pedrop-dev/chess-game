/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useEffect, useState, createContext } from 'react';
import { chessBoardToFEN, fenToChessboard } from '../helpers/fen';
import Square from './Square'
import '../style/ChessBoard.scss'

export default function ChessBoard(props) {
  const [chessboardMatrix, setChessboardMatrix] = useState([]);
  const [squareChildren, setSquareChildren] = useState(null);
  const [invert, setInvert] = useState(false);
  const [persp, setPersp] = useState(null);

  const { fenPosition, perspective } = props;

  useEffect(() => {
    if (perspective === "w") {
      setPersp(0);
    }

    else {
      setPersp(1);
    }
  }, [perspective])

  useEffect(() => {
    console.log("perspective -> " + perspective);
    console.log(persp)

    let chessboard_matrix = Array(8);
    let sqC = Array(8);
    for (let i = 0; i < 8; ++i) {

      chessboard_matrix[i] = Array(8);
      sqC[i] = Array(8);
      for (let j = 0; j < 8; ++j) {
        chessboard_matrix[i][j] = (i + j + persp) % 2;
        sqC[i][j] = null;
      }
    }

    console.log(chessboard_matrix);
    setChessboardMatrix(chessboard_matrix);
    setSquareChildren(sqC);
  }, [])

  useEffect(() => {
    if (fenPosition !== null && fenPosition !== undefined) {
      setSquareChildren(fenToChessboard(fenPosition));
    }
  }, [fenPosition])


  let i = -1;

  if (persp == 0) {
    return (
      <div className="chessboard">
        {chessboardMatrix.map((row) => {
          i++;
          let j = 0;
          return <div style={{ display: "flex", flexDirection: "row" }}>
            {row.map((sqColor) => {
              return <Square
                height={props.height}
                width={props.width}
                color={sqColor}
                id={8 * i + (j)}
                rank={i}
                file={j}
                child={squareChildren[i][j++]} />
            })}
          </div>
        })}
      </div>
    )
  }

  else {
    return (
      <div className="chessboard">
        {chessboardMatrix.map((row) => {
          i++;
          let j = 0;
          return <div style={{ display: "flex", flexDirection: "row" }}>
            {row.map((sqColor) => {
              return <Square
                height={props.height}
                width={props.width}
                color={sqColor}
                id={8 * (7 - i) + (7 - j)}
                rank={7 - i}
                file={7 - j}
                child={squareChildren[7 - i][7 - j++]} />
            })}
          </div>
        })}
      </div>
    )
  }
}
