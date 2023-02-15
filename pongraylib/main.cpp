#include "./include/raylib.h"
#include <iostream>

#include <string>
#include <sstream>
struct ball
{
    float x, y;
    float speedx, speedy;
    float radius;
    int gravity = 0;
    void draw()
    {
        DrawCircle((int)x, (int)y, radius, WHITE);
    }

};
struct paddle
{
    float x, y;
    float speed;
    float width, height;
    
    void draw(){
         DrawRectangle(x, y, width, height, WHITE);
    }
    void move()
    {

        if (IsKeyDown(KEY_UP)) y -= 2.0f;
        if (IsKeyDown(KEY_DOWN)) y += 2.0f;
    }
        void move1()
    {
        if (IsKeyDown(KEY_W)) y -= 2.0f;
        if (IsKeyDown(KEY_S)) y += 2.0f;
        
    }
};
int main(void)
{
    InitWindow(1280, 720, "KEK");
    SetWindowState(FLAG_VSYNC_HINT);

    ball ball1;
    // ball variables
    ball1.x = GetScreenWidth()/2.0f;
    ball1.y = GetScreenHeight()/2.0f;
    ball1.radius = 10.2;
    ball1.speedx = 300;
    ball1.speedy = 400;




    // rectangle variables
    paddle leftpaddle;
    leftpaddle.x = 30;
    leftpaddle.y = GetScreenHeight()/2 - 40;
    leftpaddle.height = 80;
    leftpaddle.width = 10;
    leftpaddle.speed = 10;
     
    paddle rightpaddle;
    rightpaddle.x = GetScreenWidth()-40;
    rightpaddle.y = GetScreenHeight()/2 - 40;
    rightpaddle.height = 80;
    rightpaddle.width = 10;
    rightpaddle.speed = 10;

   

    
    while (!WindowShouldClose())
    {
        ball1.x += ball1.speedx * GetFrameTime();
        ball1.y += ball1.speedy * GetFrameTime();
     
        if(ball1.x + ball1.radius >= GetScreenWidth()){
            ball1.x = GetScreenWidth()/2.0f;
            ball1.y = GetScreenHeight()/2.0f;
            ball1.speedx *= -1;
         

        }
         if(ball1.y > GetScreenHeight()){
            ball1.y = GetScreenHeight();
            ball1.speedy = -ball1.speedy * 0.9;
        }
          if(ball1.x - ball1.radius < 0){
            ball1.x = GetScreenWidth()/2.0f;
            ball1.y = GetScreenHeight()/2.0f;
            ball1.speedx *= -1;
            


            
        }
         if(ball1.y < 0){
            ball1.y = 0;
            ball1.speedy *= -1;
        }
        if(ball1.y + ball1.radius >= leftpaddle.y && ball1.y - ball1.radius <= leftpaddle.y + leftpaddle.height){
            if(ball1.x - ball1.radius <= leftpaddle.x + leftpaddle.width){
            ball1.speedx *= -1;
        }
        }
        if(ball1.y + ball1.radius >= rightpaddle.y && ball1.y - ball1.radius <= rightpaddle.y + rightpaddle.height){
            if(ball1.x + ball1.radius >= rightpaddle.x){
                ball1.speedx *= -1;
            }
        }

        BeginDrawing();
            ClearBackground(RED);
     
            ball1.draw();
            leftpaddle.draw();
            leftpaddle.move();
            rightpaddle.draw();
            rightpaddle.move1();
            
            DrawFPS(0, 0);
        EndDrawing();
    }
    


    CloseWindow();
    return 0;
}
