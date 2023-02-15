const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//array that stores all the circles

let LEFT, UP, RIGHT, DOWN, SPACE;
let W, A, S, D;


canvas.addEventListener('keydown', function(e){
            
  
    if(e.key === 'ArrowUp'){
        UP = true;
    }
  
    if(e.key === 'ArrowDown'){
        DOWN = true;
    }
    if(e.key === 'w'){
        W = true;
    }
 
    if(e.key === 's'){
        S = true;
    }
 
});



canvas.addEventListener('keyup', function(e){
    console.log(e)

    if(e.key === 'ArrowUp'){
        UP = false;
        this.vy = 0;
        
    }

    if(e.key === 'ArrowDown'){
        DOWN = false;
        this.vy = 0;
    }
    if(e.key === 'w'){
        W = false;
        this.vy = 0;
        
    }

    if(e.key === 's'){
        S = false;
        this.vy = 0;
    }
   
   
   
});

canvas.addEventListener('keyup', function(e){

   
   
});


class square{
	
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.player = false;
        this.vx = 2.5;
        this.vy = 2.5;
        this.maxVelocity = 4;
        this.score = 0;
        this.accelleration = 0;
        
    }

    drawBall(){
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#39FF14";;
        ctx.strokeStyle = "#39FF14";
        ctx.lineWidth = 0.5;
        ctx.stroke();
       
   
        ctx.fill();
        ctx.closePath();
    }
    Collsion(){
        if(this.y + this.height >= 400){ 
           
            this.y = 400 - this.height;
            
        }
        if(this.y <= 0){
       
            this.y = 0;

        }
        if(this.x <= 0){
          
            this.x = 0;
            
        }
        if(this.x + this.width >= 600){
          
            this.x = 600 - this.width;
            
        }
        
        /*gravity
        if(b.x + b.width < 600 && b.x > 0 && b.y > 0 && b.y + b.height < 400){
            b.y+=b.gravity;
        }
        */
    
    }
    keyControl(){
      

     
        if(UP){
           this.vy +=this.accelleration;
           this.y -= this.vy;
           if(this.vy <= -5){
            this.vy = -5;
        }

            
        }
   
        if(DOWN){
            this.vy+=this.accelleration
            this.y += this.vy;
          
            
        }
      
    
    }
    keyControlB(){

   
        if(W){
           
           this.y -= this.vy;

        }
     
        if(S){
            
            this.y += this.vy;
          
            
        }

    }

}
class circle{
	
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r
        this.collvar = this.r *1.2 ;
        
        this.velocity = [-1.2 , 1.2]
        this.vx = this.velocity[Math.floor(Math.random()*this.velocity.length)]
        this.vy = 2;
        this.ytop = 400 - this.r
        this.ybottom = this.y = 0 + this.r;;
        this.xright = this.x = 600 - this.r;
        this.xleft = this.x = 0 + this.r;
        
        
    }

    drawBall(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.strokeStyle = "#39FF14";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.fillStyle = "#39FF14";;
        ctx.fill();
        ctx.closePath();
    }
    ballmovement(){
        
        this.x +=this.vx
        this.y += this.vy;
    }
    Collsion(){
        if(this.y + this.r >= 400){ 
            this.vy = -2;
            this.y = this.ytop ;
    
            
        }
        if(this.y - this.r <= 0){
            this.vy = 2;
            this.y = this.ybottom;;
            /*
            this.y = 0 + this.r;
            */
           

        }
        if(this.x - this.r <= 0){
            
            this.x = 300;
            this.y = 30;
            ball2.score++;
            this.vx -= 0.2;
            
            /*
            this.x = 0 + this.r;
           */
            
        }
        if(this.x + this.r >= 600){
          
            this.x = 300;
            this.y = 30;
            Ball1.score++;
            this.vx += 0.2;
            
            /*
            this.x = 600 - this.r;
              */       
        }
                /*
            if(c.y + (r*.8) >= box.y && c.y - (c.r * 0.8) <= box.y + box.height){
	if(c.x-c.r <= box.x + box.width){
	c.vx *= -1;
	}
           */
        if(this.y + this.collvar >= Ball1.y && this.y - this.collvar <= Ball1.y + Ball1.height){
            if(this.x - this.r <= Ball1.x + Ball1.width){
                this.vx *= -1;
            }
        }
        if(this.y + this.collvar >= ball2.y && this.y - this.collvar <= ball2.y + ball2.height){
            if(this.x + this.r >= ball2.x){
                this.vx *= -1;
            }
        }
    }
    
 
}

function score(ball2, Ball1){
    ctx.beginPath();
    ctx.fillStyle ="#39FF14";
    ctx.fillText('Score:'+ Ball1.score, 50, 30)
    ctx.fillText('Score:'+ ball2.score, 530, 30)
    ctx.closePath()
   

}


function mainLoop() {
    
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    circle1.drawBall();
    circle1.ballmovement();
    circle1.Collsion();
    score(ball2, Ball1, circle1)
    Ball1.drawBall()
    
    Ball1.Collsion();

    ball2.drawBall();
    ball2.keyControl();
    ball2.Collsion();
   
    if(Ball1.player){
        Ball1.keyControlB();
    }
    
    requestAnimationFrame(mainLoop);
}

//create two Ball objects

let Ball1 = new square(5, 200, 5, 40);

let ball2 = new square(590, 200, 5, 40)

let circle1 = new circle(300, 300, 9);


Ball1.player = true;

mainLoop();
