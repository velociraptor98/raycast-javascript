const TILE_SIZE=32;
const MAP_ROWS=12;
const MAP_COLUMNS=15;
const WIDTH= MAP_COLUMNS*TILE_SIZE;
const HEIGHT= MAP_ROWS*TILE_SIZE;

class Map{
    constructor(){
        this.map_grid=[
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];
    }
    render()
    {
        for(var i=0;i<MAP_ROWS;i++)
        {
            for(var j=0;j<MAP_COLUMNS;j++)
            {
                var X=j*TILE_SIZE;
                var Y=i*TILE_SIZE;
                var tile_color=this.map_grid[i][j]==1?"#222":"#fff";
                stroke("#222");
                fill(tile_color);
                rect(X,Y,TILE_SIZE,TILE_SIZE);
            }
        }
    }
}


var grid=new Map();

function setup()
{
    createCanvas(WIDTH,HEIGHT);
}

function update()
{
    
}

function draw()
{
    update();
    grid.render();
}