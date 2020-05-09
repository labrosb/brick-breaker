/* 
* To change this license header, choose License Headers in Project Properties.
* To change this template file, choose Tools | Templates
* and open the template in the editor.
*/
var reflects = 0;   //number of the times that the ball has been reflected from the bar
var Default = true;  //automated stage (the first part of help)

$(document).ready(function(){
	$(document).unbind("mousemove");
	clearInterval(app.interval);
});

/* Start-up message */
$.msgBox({ 
	type: "info",
	title: "About the game",
	content: "<p>A ball is thrown that breaks the bricks. </br></br> The ball reflects and returns back and can be sent back with the vertical bar. </br></br> If you fail to sent the ball back you lose a life. </br></br> If you lose all your lives the game is over <br><br> <b>Your goal is to break all the bricks with the ball.</b> <br><br> Do you want to watch an example??</p><br><br>",
	buttons: [{ value: "Yes" },{ value: "No" }],
	success: function (result) {	
		if (result == "Yes"){
			app.interval = setInterval(app.drawAllObjects, 15); //resumes game
		}
		else{
			window.location.replace("index.html");
		}
	}
});

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
				reflects++; 
				/* Checks if we are in the automated part or the practice(default = true is automated) */
				if (Default === true){		
					clearInterval(app.interval);				
					$.msgBox({ 
						type: "info",
						title: "Notice",
						content: "<p>Ball reflected successfully</p>",
						buttons: [{ value: "Next>>" }],
						success: function (result) {							
							app.interval = setInterval(app.drawAllObjects, 15); //resumes game
						}
					});
				}
            }
            //if the ball misses the vertical bar
            else {
				reflects = 0;
                ball.reset();
				if (Default == true){
						clearInterval(app.interval); //freezes game
						reflects = 0;
						$.msgBox({ 
							title: "Attention!!!",
							content: "<p>If balls falls, you lose a life.</p> </br> <p>If you lose all your lives, the game is over!!</p> </br></br>",
							buttons: [{ value: "Next>>" }],
							success: function (result) {
								$.msgBox({ 
									type: "info",
									title: "Practice!!!",
									content: "<p>Now try it yourself!! :)</p> </br> <p>Reflect the ball 3 times without loosing!</p> </br>",
									buttons: [{ value: "OK" }],
									success: function (result) {
										app.init();
										ball.reset();
										Default = false;
										$(document).mousemove(mouse.moveMouse);
									}
								});								
							}
						});
				}
				else{
					clearInterval(app.interval); //freezes game
					reflects = 0;
						$.msgBox({ 
							type: "error",
							title: "Ball fallen!!!",
							content: "<p>Try again??</p>",
							buttons: [{ value: "Yes" },{ value: "No" }],
							success: function (result) {
								if(result == "Yes"){
									app.init();
									ball.reset();									
								}
								else{
									window.location.replace("index.html");
								}
							}
						});					
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
     * and set the bricks availability attribute to 0 which will not satisfy the if statement above 
     * thus, will not draw the brick again i.e removing it.
     */
        if (ball.xaxis >brickArray[r][c].xcoordinate && ball.xaxis <= brickArray[r][c].xcoordinate+this.width+this.padding && 
        ball.yaxis >brickArray[r][c].ycoordinate && ball.yaxis <=brickArray[r][c].ycoordinate+this.height) {
            ball.changeInYaxis=-ball.changeInYaxis;
            brickArray[r][c].availability=0; 
            brickArray[r][c].ycoordinate =0;
            brickArray[r][c].xcoordinate =0;
			///// Checks if the default (automated)
				if (Default === true){	     
					clearInterval(app.interval); //freezes game
					if(reflects == 0){
						reflectMessage = "A brick is broken";
					}
					else{
						reflectMessage = "A second brick is broken";						
					}
					$.msgBox({ 
						type: "info",
						title: "Notice",
						content: "<p>"+reflectMessage+"</p>",
						buttons: [{ value: "Next>>" }],
						success: function (result) {
							app.interval = setInterval(app.drawAllObjects, 15); //resumes game	
							verticalBar.xaxis = 700;									
						}
					});
				}		
				else{
					if (reflects >= 3){
						clearInterval(app.interval);
						$.msgBox({ 
							type: "info",
							title: "Congratulations",
							content: "<p>You passed the training succesfully!</p> </br> <p>Now you can procceed to the main game!!</p> </br>",
							buttons: [{ value: "Ok" }],
							success: function (result) {
								window.location.replace("game.html");									
							}
						});	
					}
				}
        }
    } 
};