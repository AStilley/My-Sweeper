/**
 * Minesweeper 
 */

/**To do List
 * Mine Logic
 * First Guess losing prevention
 */

/**Guess Improvement
 * -If the player would click a mine on the first guess, move the mine.
 *  The mine should be moved to the first cell that is not flipped on the top left.
 * -Change switch statement to check the image cell's id 
 *  and check the matrix's corresponding cell's isMine and minesAdjacent
 * 
 */


//Creates the array that works in the backend
var rowCol = 8;
const a = [];
var b =[];
function makeArray(rowCol)
{console.log("TEST");
    // var Cell = 
    // {
    //     isFlipped: false,//If the cell has been clicked already
    //     isMine: false,//If the cell contains a mine
    //     minesAdjacent: 0,//Counts the amount of mines adjacent
    //     id: 0//The unique id of the cell
    // }

    var rows = 0;
    var cols = 0;
    while (rows < rowCol)
    {//(a.length < rowCol)
        //(rows < rowCol)
        while (cols < rowCol)
        {//(b.length < rowCol)
            //(cols < rowCol)
            //randomNumber = Math.floor(Math.random()*10)//Random number between 0-9
            //b.push(randomNumber);//adds a random number to array b
            console.log("Test");
            var cell = {};
            cell.isFlipped = false;
            cell.isMine = false;
            cell.minesAdjacent = 0;
            cell.id = "r" + rows + "c" + cols;
            //console.log(cell.id);
            b.push({cell});
            cols++;
        }
        cols = 0;
        a.push(b)//Makes array a an array of arrays
        b = [];//Empties array b so that it can get more random numbers
        rows++;
    }    
    console.log(a);
console.log(a[0][0]);
}

//Create the cells in the html document
boardMade = false;
function makeBoard()
{
    if(!boardMade)
    {
        for(i =0;i < rowCol; i++)
        {
            for(j= 0; j< rowCol; j++)
            {
                var x = document.createElement('img');
                x.src = './Images/Cell.png';
                x.id = "r" + i + "c" + j;
                document.getElementById('location').appendChild(x);
        
                var y = document.createElement('img');
                y.src = './Images/Empty.png';
                y.id = "emptyCell";
                document.getElementById('location').appendChild(y);
            }
            var br = document.createElement("br");
            var foo = document.getElementById("location");
            foo.appendChild(br);  
        }
        boardMade = true;
    }

}


//Calls the makeBoard function when Begin is clicked
var board = document.getElementById("Begin");
board.addEventListener('click', (event)=>
{
    event.preventDefault();
    makeBoard();
    makeArray(rowCol);
    //a[0][0].isMine = true;
    placeMines();
    checkCells();
}
)

//The player clicks a cell as a guess
function Guess(event)
{
    console.log(event);
    //alert(event.target.tagName);
    //console.log(event.target.tagName);
    
    //alert(event.target.id);
    //console.log(event.target.id);
    if(event.target.id != "source" && event.target.id != "Begin" && event.target.id != "emptyCell" && event.target.id != "Clear")
    {        
        var audio = document.getElementById("audio");
        audio.play();


        var number = event.target.id;
        var row1 = number.substring(1,2);
        var col1 = number.substring(3,4);
        var bomb = false;

        console.log(a[row1][col1]);

        if(a[row1][col1].cell.isMine == true)
        {//If the cell is a bomb, then set the image to the bomb
            //This is a gameover, unless this is the first click
            console.log("Good to go!");
            event.target.src = './Images/Bomb.png';//This can change the image
            bomb = true;
        }

        if(bomb == false)
        {
        //var Ran = Math.floor(Math.random()*10);
        switch (a[row1][col1].cell.minesAdjacent)
            {
                case 0:
                    event.target.src = './Images/0.png';//This can change the image
                    break;
                case 1:
                    event.target.src = './Images/1.png';//This can change the image
                    break;
                case 2:
                    event.target.src = './Images/2.png';//This can change the image
                    break;
                case 3:
                    event.target.src = './Images/3.png';//This can change the image
                    break;
                case 4:
                    event.target.src = './Images/4.png';//This can change the image
                    break;
                case 5:
                    event.target.src = './Images/5.png';//This can change the image
                    break;
                case 6:
                    event.target.src = './Images/6.png';//This can change the image
                    break;
                case 7:
                    event.target.src = './Images/7.png';//This can change the image
                    break;
                case 8:
                    event.target.src = './Images/8.png';//This can change the image
                break;
            }
        }
        event.target.id = "Clear";
        //targetId = event.target.id;
        //console.log(targetId);
    }

}

//Allows the user to input how big they want the board to be
var numButt = document.getElementById('numButt');
numButt.addEventListener('click', (event)=>
{        
        event.preventDefault();
        if(!boardMade)
        {//This checks that the board has not been made. 
        //If the user has not clicked the Begin button in order to change the board size.
            var number = document.getElementById('num').value;
            rowCol = number;
            console.log(rowCol);

            sizeOut = document.getElementById("SizeOut");

            //sizeOut.classList.add("fadeBack");
            //sizeOut.classList.remove("fadeBack");

            sizeOut.innerHTML = "Size of board set to: " + number;
            disappear();
                function disappear()
                    {


                        setTimeout(()=>
                        {
                            sizeOut.classList.add("fadeOut");
                        //
                        },500)

                        setTimeout(()=>
                        {
                            sizeOut.innerHTML= "";    
                            sizeOut.classList.remove("fadeOut");
                        },1500)


                    }
        }
})

function placeMines()
{
    console.log("The boardsize is: " +rowCol + " x " + rowCol);//Successfully can use rowCol
    var totalMines = Math.floor(rowCol*rowCol/5);

    var diff = document.getElementById("difficulty");
    diff.innerHTML = "Difficulty: " + totalMines + " Bombs";
    //console.log(totalMines);
    //console.log(a[2][1]);//Can access the matrix
    for(let i = 0; i< totalMines; i++)
    {

        var row = Math.floor(Math.random()*rowCol);
        var col = Math.floor(Math.random()*rowCol);

        while (a[row][col].cell.isMine == true)
        {
            row = Math.floor(Math.random()*rowCol);
            col = Math.floor(Math.random()*rowCol); 
            console.log("Reroll");
        }


        if(a[row][col].cell.isMine == true)
            console.log("Duplicate bomb");
        
        a[row][col].cell.isMine = true;
        //console.log(a[row][col]);//Can access the matrix


//placeMines can currently place bombs on unique cells, rerolling the targetted cell
//whenever it rolls a duplicate cell

    }
}
function checkCells()
{
    //console.log("ENTERING CHECK CELLS");
    for(let i = 0; i < rowCol; i++)
    {//Rows
        //console.log("Row: "+ i);
        for(let j = 0; j< rowCol; j++)
        {//Columns
            //Check this cell, check those surrounding the cell
            if(i != 0 && i != rowCol-1 &&j != 0 && j != rowCol-1)
            {//Only the inside cells
                if(a[i-1][j-1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i-1][j].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i-1][j+1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i][j-1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i][j+1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i+1][j-1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i+1][j].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i+1][j+1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
            }

            if(i == 0 && j == 0)//Top left corner
            {
                if(a[i][j+1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i+1][j].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i+1][j+1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
            }

            if(i == 0 && j == rowCol-1)//Top right corner
            {
                //console.log("Top right");
                if(a[i][j-1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i+1][j-1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i+1][j].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
            }

            if(i == rowCol-1 && j == 0)//Bottom left corner RIGHT HERE
            {
                // console.log("Bottom Left");
                // console.log(a[i][j]);
                // console.log(a[i][j+1]);
                if(a[i-1][j].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i-1][j+1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i][j+1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
            }

            if(i == rowCol-1 && j == rowCol-1)//Bottom Right corner
            {
                if(a[i-1][j-1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i-1][j].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i][j-1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
            }

            if(i == 0 && j > 0 && j!= rowCol-1)//Top middle
            {//GOOD TO GO
                //console.log("Testing");
                //console.log(rowCol);
                //console.log(a[i][j]);
                if(a[i][j-1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i][j+1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i+1][j-1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i+1][j].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i+1][j+1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
            }

            if(i == rowCol-1 && j != 0 && j!= rowCol-1)//Bottom middle
            {
                if(a[i-1][j-1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i-1][j].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i-1][j+1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i][j-1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i][j+1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
            }

            if(j == 0 && i != 0 && i != rowCol-1)//Left middle
            {
                if(a[i-1][j].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i-1][j+1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i][j+1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i+1][j].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i+1][j+1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
            }

            if(j == rowCol-1 && i != 0 && i != rowCol-1)//Right middle
            {
                if(a[i-1][j].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i-1][j-1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i][j-1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i+1][j-1].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
                if(a[i+1][j].cell.isMine == true)
                {
                    a[i][j].cell.minesAdjacent++;
                }
            }

            
            //For border cells




        }
    }
}

function plagueZero()
{//This function causes all zeroes to be shown when you click a zero



}