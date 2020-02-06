const TILE_SIZE = 64;
const MAP_NUM_ROWS = 11;
const MAP_NUM_COLS = 15;
const WINDOW_WIDTH = MAP_NUM_COLS * TILE_SIZE;
const WINDOW_HEIGHT = MAP_NUM_ROWS * TILE_SIZE;
const FOV_ANGLE = 60 * (Math.PI / 180);
const WALL_STRIP_WIDTH = 1; 
const NUM_RAYS = WINDOW_WIDTH / WALL_STRIP_WIDTH;
const SCALE_FACTOR = 0.2;

class Map {
    constructor() {
        this.grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
    }
    hasWallAt(x, y) {
        if (x < 0 || x > WINDOW_WIDTH || y < 0 || y > WINDOW_HEIGHT) {
            return true;
        }
        var mapGridIndexX = Math.floor(x / TILE_SIZE);
        var mapGridIndexY = Math.floor(y / TILE_SIZE);
        return this.grid[mapGridIndexY][mapGridIndexX] != 0;
    }
    render() {
        for (var i = 0; i < MAP_NUM_ROWS; i++) {
            for (var j = 0; j < MAP_NUM_COLS; j++) {
                var tileX = j * TILE_SIZE;
                var tileY = i * TILE_SIZE;
                var tileColor = this.grid[i][j] == 1 ? "#222" : "#fff";
                stroke("#222");
                fill(tileColor);
                rect(SCALE_FACTOR*tileX, SCALE_FACTOR*tileY, SCALE_FACTOR*TILE_SIZE, SCALE_FACTOR*TILE_SIZE);
            }
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

class Ray
{
    constructor(angle)
    {
        this.angle=angle;
    }
    render()
    {
        stroke("red");
        line(player.x,player.y,player.x+Math.cos(this.angle)*40,player.y+Math.sin(this.angle)*40);
    }
}


var grid=new Map();
var player=new Player();
var rays=[];


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

function castAllRays()
{
    var col=0;
    var start=player.rotAngle-(FOV/2);
    rays=[];
    for(var i=0;i<RAY_NUM;i++)
    {
        var ray=new Ray(start);
        rays.push(ray);
        start+=FOV/RAY_NUM;
        ++col;
    }
}
function update()
{
    player.update();
    castAllRays();
}

function draw()
{
    update();
    grid.render();
    player.render();
    for(ray of rays)
    {
        ray.render();
    }
}