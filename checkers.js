var sketchProc=function(processingInstance){ with (processingInstance){
size(801, 801); 
frameRate(60);

var squareSize = 100;

var board = [['-','b','-','b','-','b','-','b'],
            ['b','-','b','-','b','-','b', '-'],
            ['-','b','-','b','-','b','-','b'],
            ['-','-','-','-','-','-','-', '-'],
            ['-','-','-','-','-','-','-','-'],
            ['w','-','w','-','w','-','w', '-'],
            ['-','w','-','w','-','w','-','w'],
            ['w','-','w','-','w','-','w', '-']];

var selectedX = null;
var selectedY = null;

var drawBoard = function(){

    for(var i=0; i<8; i++){
        for(var j=0; j<8; j++){
            if ((i%2) !== (j%2))
                fill(120, 75, 23);
            else
                 fill(255, 240, 222);

             if(floor(mouseX/100) === i && floor(mouseY/100) === j && board[j][i] !== '-')
                fill(190,190,190);

            if(selectedX === i && selectedY === j)
                fill(190, 0, 0);

            rect(i * squareSize, j * squareSize, squareSize, squareSize);

            if ((selectedX === i && selectedY === j) === false)
                drawPiece(board[j][i], i, j);
        }
    }
};

var drawPiece = function(peice, i, j){
    if(peice === '-')
        return;

    switch(peice[0]){
        case 'w': fill(255,255,255);
        break;
        case 'b': fill(0,0,0);
        break;
    }

    ellipse(i*squareSize+(squareSize/2),j*squareSize+(squareSize/2),squareSize/2 + 10,squareSize/2 + 10);

    //King peices
    if(peice.length > 1 && peice[1] === '*'){
        if(peice[0] === 'b')
            fill(255,255,255);
        else
            fill(0,0,0);

        text('K', i*squareSize+(squareSize/2) - 10,j*squareSize+(squareSize/2) - 10,squareSize/2 + 10,squareSize/2 + 10);
    }

    // Draw selected peice hover on mouse 
    if (selectedX !== null && selectedY !== null) {
        switch (board[selectedY][selectedX][0]) {
            case 'w': fill(255, 255, 255);
                break;
            case 'b': fill(0, 0, 0);
                break;
        }
        ellipse(mouseX, mouseY, squareSize / 2 + 10, squareSize / 2 + 10);

        if (board[selectedY][selectedX].length > 1 && board[selectedY][selectedX][1] === '*') {
            if (board[selectedY][selectedX][0] === 'b')
                fill(255, 255, 255);
            else
                fill(0, 0, 0);

            text('K', mouseX - 10, mouseY - 10, squareSize / 2 + 10, squareSize / 2 + 10);
        }
    }
}

var mouseClicked = function(){
    var x = floor(mouseX/100);
    var y = floor(mouseY/100);


    if(selectedX === null){
        if(board[y][x] !== '-'){
           selectedX = x;
            selectedY = y;
        }
    }
    else{
        if(validate(x, selectedX, y, selectedY) === true){
            //King ??
            var king = '';
            if(y === 0 && board[selectedY][selectedX] === 'w')
                king = '*';
            if(y === 7 && board[selectedY][selectedX] === 'b')
                king = '*';

            board[y][x] = board[selectedY][selectedX] + king;
            board[selectedY][selectedX] = '-';
        }

        selectedX = null;
        selectedY = null;
    }
}

var validate = function(x, x2, y, y2){
    //dark square check
    if((x%2) === (y%2))
        return false;

    //same square, occupied square, out of range check
    if(x === x2 || y === y2 || board[y][x] !== '-' || abs(y2-y) > 2)
        return false;

    //move backwards check
    if(board[y2][x2] === 'w' && y2 <= y)
        return false;

    if(board[y2][x2] === 'b' && y2 >= y)
        return false;

    //check if valid capture (remove peice)
    if (abs(y2 - y) > 1) {
        var cy = (y2 > y) ? y2 - 1 : y2 + 1;
        var cx = (x2 > x) ? x2 - 1 : x2 + 1;
        if (board[cy][cx] === '-' || board[cy][cx][0] === board[y2][x2][0])
            return false;
        else
            board[cy][cx] = '-';
    }
        

    return true;
}

var draw = function(){
    background(255,255,255);

    fill(255, 0, 0);
    textSize(30);

    drawBoard();
};

}};