/* 
* To change this license header, choose License Headers in Project Properties.
* To change this template file, choose Tools | Templates
* and open the template in the editor.
*/
var brickArray = [];
var brickXcoordinate;
var brickYcoordinate;
var colorlist = ['#F80000', '#0000CC', '#FFFF00', '#33FF00', '#660066', '#FF0099', '#330000'];


$(document).ready(function(){
    app.init();
    $(document).mousemove(mouse.moveMouse);
});

var app = {
    interval:0,
    init:function () {
        canvas.dimentions(); 
        bricks.setupArray();
        //calls the drawAllObjects funtction every 10 milliseconds 
        this.interval = setInterval(this.drawAllObjects, 10);
    },
    drawAllObjects:function(){
        app.clearCanvas();
        ball.drawBall(ball.xaxis,ball.yaxis,ball.radius);
        verticalBar.drawRectangle(verticalBar.xaxis,verticalBar.yaxis,verticalBar.width,verticalBar.height);
        bricks.draw();
        ball.moveBall();
        player.display();
    },
    clearCanvas: function(){
        canvas.context.clearRect(0,0,canvas.width,canvas.height);
    }
};

var canvas = {
    dimentions:function(){
        // Assigning our canavas element to a variable
        this.canvas = document.getElementById("canvas");
        // Create the HTML5 context object to enable draw methods
        this.context = this.canvas.getContext("2d");
        this.width = $('#canvas').width();
        this.height= $('#canvas').height();
        this.minXaxis = $('#canvas').offset().left;
        this.maxXaxis = this.minXaxis + this.widthOfCanavas;
    }
};

var ball = {
    //attributes
    xaxis: 0,
    yaxis:550,
    radius:10,
    changeInXaxis:5,
    changeInYaxis:-5,
    drawBall: function(xaxis,yaxis,radius){
        canvas.context.fillStyle = "#00A308";
        canvas.context.beginPath();
        canvas.context.arc(xaxis, yaxis, radius, 0, Math.PI*2, true); 
        canvas.context.closePath();
        canvas.context.fill();
    },
    moveBall: function(){
        ball.collision();
        this.xaxis += this.changeInXaxis;//changing the horizontal velocity of the ball
        this.yaxis += this.changeInYaxis;// changing the vertical velocity of the ball
    },
    collision:function(){
        /* Once the BALL hits the WALL it will bounce by reversing its vertical velocity */
        if(this.xaxis+this.changeInXaxis > canvas.width || this.xaxis+this.changeInXaxis < 0) {
            this.changeInXaxis =-this.changeInXaxis;
        }
        //changing the vertical velocity of the ball.
        if (this.yaxis+this.changeInYaxis<0) {
            this.changeInYaxis=-this.changeInYaxis;
        }
        /* Ball hitting the BAR */
        else if (this.yaxis +this.changeInYaxis + this.radius> canvas.height - verticalBar.height) {
            if (this.xaxis>verticalBar.xaxis && this.xaxis<verticalBar.xaxis+verticalBar.width) {
                this.changeInYaxis=-this.changeInYaxis;
            }
            //if the ball misses the vertical bar
            else {
                player.life -=1;
                ball.reset();
                if (player.life ===0) {
                    clearInterval(app.interval);
                    canvas.context.fillText("GAME OVER :(",400,300);
                }
            }
        }
    },
    reset:function(){
        this.xaxis=0;
        this.yaxis=550;
        this.radius=10;
        this.changeInXaxis=5;
        this.changeInYaxis=-5;
    }
};

var verticalBar = {
    //the xaxis of the bar is (canvas.width)/2;
    //the yaxis of the bar is (canvas.height)-verticalBar.height;
    //Attributes  
    width:120,
    height:15,
    xaxis:400,
    yaxis:585,
    drawRectangle:function(Xaxis,Yaxis,width,height){
        canvas.context.fillStyle = "blue";
        canvas.context.beginPath();
        canvas.context.rect(Xaxis, Yaxis, width, height);
        canvas.context.closePath();
        canvas.context.fill();
        },

    drawBrick:function(Xaxis,Yaxis,width,height,color){
        canvas.context.fillStyle = color;
        canvas.context.beginPath();
        canvas.context.rect(Xaxis, Yaxis, width, height);
        canvas.context.closePath();
        canvas.context.fill();
        } 
    };

var mouse ={
    moveMouse:function(event){
        /* Getting the left coordinate of the canvas and this will be the minimum coordinate point in the xaxis that the mouse can move the bar
        The max the mouse can move the bar will be this minXaxis plus the width of the canvas itself by implementing this the vertical bar will stay within the canvas frame once its been draged. */       
        minXaxis = $('#canvas').offset().left;
        maxXaxis = minXaxis + canvas.width;
        /* event.pageX returns the mouse X coordinate position*/
        /* if statement makes sure the mouse is inside the canvas fram*/
        if (event.pageX > minXaxis && event.pageY<maxXaxis) {
          //to keep the mouse cursor on the middle of the bar
          verticalBar.xaxis= Math.max(event.pageX - minXaxis - (verticalBar.width/2),0);  
          //to keep the bar inside the box
          verticalBar.xaxis=Math.min(canvas.width-verticalBar.width,verticalBar.xaxis);   
        }
    }
};

var player = {
    life:4,
    score:0,
    level:1,
    display:function (){
        canvas.context.fillText("LEVEL: ",30,20);
        canvas.context.fillText(this.level,80,20);
        canvas.context.fillText("LIFE: ",30,40);
        canvas.context.fillText(this.life,80,40);
        canvas.context.fillText("SCORE: ",30,80);
        canvas.context.fillText(this.score,80,80);  
    },
    reset:function(){
        this.life=4;
        this.score=0;
        this.level=1;
    }
};

var bricks = {
    row:7,
    column:10,
    width:50,
    height:20,
    padding:1,
    offset_top:50,
    offset_left:140,
    setupArray:function(){
        for (r=0;r<this.column;r++){
            brickArray[r] = [];
            for (c=0;c<this.row;c++){
              /* we set the x and y cordinate to 0 and the availablity attribute to 1 for each brick initially */
              brickArray[r][c]={xcoordinate:0,ycoordinate:0,availability:1};    
            }
        }   
    },
    draw: function(){
        for (r=0;r<this.column;r++){
            for (c=0;c<this.row;c++){
                brickXcoordinate=(r*(this.width+this.padding))+this.offset_left;
                brickYcoordinate=(c*(this.height+this.padding))+this.offset_top;
                /* we only draw a brick if its availablity is equal to 1 */
                if (brickArray[r][c].availability===1){
                    brickArray[r][c].xcoordinate=brickXcoordinate;//setting the x cordinate for each individual brick in the array
                    brickArray[r][c].ycoordinate=brickYcoordinate;//setting the y cordinate for each individual brick in the array
                    verticalBar.drawBrick(brickXcoordinate,brickYcoordinate,this.width,this.height,colorlist[c]);
                }  
                bricks.collision();
            }
        }
    },
    collision:function(){
    /*
     * If the ball hits a brick, that is when its xaxis and yaxis is in the boundary 
     * of the bricks then we reverse its vertical velocity giving it a bouncing effect
     * and set the bricks availablity attribtue to 0 which will not satisfiy the if statement above 
     * thus, will not draw the brick again i.e removing it.
     */
        if (ball.xaxis >brickArray[r][c].xcoordinate && ball.xaxis <= brickArray[r][c].xcoordinate+this.width+this.padding && 
        ball.yaxis >brickArray[r][c].ycoordinate && ball.yaxis <=brickArray[r][c].ycoordinate+this.height) {
            ball.changeInYaxis=-ball.changeInYaxis;
            brickArray[r][c].availability=0; 
            brickArray[r][c].ycoordinate =0;
            brickArray[r][c].xcoordinate =0;
        }
    } 
};