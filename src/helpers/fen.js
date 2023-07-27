
export function fenToChessboard(fen) {
  const fenParts = fen.split(' ');
  const ranks = fenParts[0].split('/');

  // Helper function to convert a FEN rank to an array representation
  function fenRankToArray(rank) {
    const rankArray = [];
    let count = 0;

    for (const char of rank) {
      if (/\d/.test(char)) {
        count += parseInt(char, 10);
        for (let i = 0; i < count; i++) {
          rankArray.push(null); 
        }
      } else {
        rankArray.push(char);
        count = 0;
      }


    }

    return rankArray;
  }

  const chessboard = ranks.map(fenRankToArray);

  return chessboard;
}

export function chessBoardToFEN(chessBoard) {
  const activeColor = 'white';
  const enPassantSquare = null;
  // if (!isValidChessBoard(chessBoard)) {
  //   throw new Error('Invalid chess board');
  // }

  let fen = '';

  // Convert the board positions
  for (let rank = 0; rank < 8; rank++) {
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

    if (rank !== 7) {
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
  fen += ' 0 1';

  return fen;
}

