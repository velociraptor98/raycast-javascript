const TILE_SIZE=32;
const MAP_ROWS=12;
const MAP_COLUMNS=15;
const WIDTH= MAP_COLUMNS*TILE_SIZE;
const HEIGHT= MAP_ROWS*TILE_SIZE;

class Map{
    constructor(){
        this.map_grid=[
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,1,0,0,0,0,0,1,0,0,0,0,1],
            [1,0,0,1,0,0,0,0,0,1,0,0,0,0,1],
            [1,0,0,1,0,0,0,0,0,1,0,0,0,0,1],
            [1,0,0,1,0,0,1,1,1,1,0,0,0,0,1],
            [1,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1,1,1,0,0,1],
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
    WallPresent(UpdatedX,UpdatedY)
    {
        var MapX=Math.floor(UpdatedX/TILE_SIZE);
        var MapY=Math.floor(UpdatedY/TILE_SIZE);
        if(this.map_grid[MapY][MapX])
        {
            return true;
        }
        else
        {
            return false;
        }
    }

}

class Player
{
    constructor()
    {
    this.x=WIDTH/2;
    this.y=HEIGHT/2;
    this.radius=3;
    this.turnDir=0;
    this.walkDir=0;
    this.rotAngle=Math.PI/2;
    this.moveSpeed=3.0;
    this.rotSpeed=3*(Math.PI/100);
    }
    render()
    {   
        fill("red");
        circle(this.x,this.y,this.radius);
        stroke("red");
        line(this.x,this.y,this.x+Math.cos(this.rotAngle)*40,this.y+Math.sin(this.rotAngle)*40);
    }
    update()
    {
        //manage player inputs
        this.rotAngle+=this.turnDir*this.rotSpeed;
        var step=this.walkDir*this.moveSpeed;
        var UpdatedX=this.x+Math.cos(this.rotAngle)*step;
        var UpdatedY=this.y+Math.sin(this.rotAngle)*step;
        //check for walls 
        if(grid.WallPresent(UpdatedX,UpdatedY)==false)
        {
            this.x=UpdatedX;
            this.y=UpdatedY;
        }
    }
}


var grid=new Map();
var player=new Player();

function keyPressed()
{
    if(keyCode==UP_ARROW)
    {
        player.walkDir=1;
    }
    else if(keyCode==DOWN_ARROW)
    {
        player.walkDir=-1;
    }
    else if(keyCode==RIGHT_ARROW)
    {
        player.turnDir=1;
    }
    else if(keyCode==LEFT_ARROW)
    {
        player.turnDir=-1;
    }
}

function keyReleased()
{
    if(keyCode==UP_ARROW)
    {
        player.walkDir=0;
    }
    else if(keyCode==DOWN_ARROW)
    {
        player.walkDir=0;
    }
    else if(keyCode==RIGHT_ARROW)
    {
        player.turnDir=0;
    }
    else if(keyCode==LEFT_ARROW)
    {
        player.turnDir=0;
    }
}
function setup()
{
    createCanvas(WIDTH,HEIGHT);
}

function update()
{
    player.update();
}

function draw()
{
    update();
    grid.render();
    player.render();
}