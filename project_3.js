//setup() function to create the canvas to load once on initial run
function setup() { "use strict";
    var canvas = document.getElementById('theCanvas');
    var carX = 112;
    var angle = 0;
    var alpha = -25*0.005*Math.PI;

    //draw() function  draws all of the elements seen on the canvas
    function draw() {
        var context = canvas.getContext('2d');
        canvas.width = canvas.width;
        
        //background color for canvas
        context.fillStyle = "#F9E2B4";
        context.fillRect(0,0, canvas.width, canvas.height);
        //angle at which the hands of the clock rotates by
        alpha = alpha + 0.02;

        var stack = [ mat3.create() ]; //Initializing the stack with an identity matrix on top

        //the following 4 functions are the canvas functions rewritten to correspond to matrix transformations
        function moveToTx(x, y)
        {
            var res = vec2.create();
            vec2.transformMat3(res, [x,y], stack[0]);
            context.moveTo(res[0], res[1]);
        }

        function lineToTx(x, y)
        {
            var res = vec2.create();
            vec2.transformMat3(res, [x,y], stack[0]);
            context.lineTo(res[0], res[1]);
        }

        function arcTx(x, y, r, sAngle, eAngle)
        {
            var res = vec2.create();
            vec2.transformMat3(res, [x,y], stack[0]);
            context.arc(res[0], res[1], r, sAngle, eAngle);
        }

        function fillRectTx(x, y, width, height)
        {
            var res = vec2.create();
            vec2.transformMat3(res, [x,y], stack[0]);
            context.fillRect(res[0], res[1], width, height);
        }

        //series of if statements to change the background color when the car is at a certain position
        if(carX > 80)
        {
            context.fillStyle = "#C4EAF0";
            context.fillRect(0,0, canvas.width, canvas.height);
        }
        if(carX > 160)
        {
            context.fillStyle = "#BEEDFC";
            context.fillRect(0,0, canvas.width, canvas.height);
        }
        if(carX > 240)
        {
            context.fillStyle = "#5D97D1";
            context.fillRect(0,0, canvas.width, canvas.height);
        }
        if(carX > 320)
        {
            context.fillStyle = "#172141";
            context.fillRect(0,0, canvas.width, canvas.height);
        }

        //if the car moves off the screen, start back over in the beginning so it loops
        if(carX > 450)
        {
            carX = -100;
        }
        carX = carX + 1.5;
        angle = angle + 0.1;
    
        //Draws the road at the bottom of the screen
        function DrawRoad()
        {
            context.fillStyle = "#606060";
            context.fillRect(0,340, canvas.width, 60);
        }

        //Draws the yellow dashes seen on the road
        function DrawRoadDashes(x, y, color)
        {
            context.fillStyle = color;
            context.fillRect(x, y, 50, 10);
        }

        //Draws the red trapezoidal shaped car
        function DrawCar(color)
        {
            context.beginPath();
            context.fillStyle = color;
            moveToTx(-62, 15);
            lineToTx(-32, -15);
            lineToTx(33, -15);
            lineToTx(63, 15);
            context.closePath();
            context.fill();
    
        }
        
        //Draws the wheels of the car with little white car spokes
        function DrawWheels(x, y, r, color)
        {
            context.beginPath();
            context.fillStyle = color;
            arcTx(x, y, r, 0, 2 * Math.PI);
            context.closePath();
            context.fill();

            context.beginPath();
            context.fillStyle = "white";
            arcTx(x + 2, y + 2, r/6, 0, 2 * Math.PI);
            context.closePath();
            context.fill();

            context.beginPath();
            context.fillStyle = "white";
            arcTx(x -2, y - 2, r/6, 0, 2 * Math.PI);
            context.closePath();
            context.fill();

            context.beginPath();
            context.fillStyle = "white";
            arcTx(x + 2, y - 2, r/6, 0, 2 * Math.PI);
            context.closePath();
            context.fill();

            context.beginPath();
            context.fillStyle = "white";
            arcTx(x - 2, y + 2, r/6, 0, 2 * Math.PI);
            context.closePath();
            context.fill();

        }

        //Draws the white draft behind the car to indicate it's "fast" paced motion relative to the time of day
        function DrawDraft(color)
        {
            context.fillStyle = color;
            fillRectTx(-72, -10, 40, 3);
            fillRectTx(-72, 0, 40, 3);
            fillRectTx(-72, 10, 40, 3);
            
        }

        //A versatile function that draws a building of any position, size, and color
        function DrawBuilding(x, y, w, h, color)
        {
            context.fillStyle = color;
            context.fillRect(x,y, w, h);
            
        }

        //Draws the white background of the clock
        function DrawClock()
        {
            context.beginPath();
            context.fillStyle = "white";
            context.arc(170, 195, 35, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
        }

        //Draws the clock hands rotating around the clock as the "time" flies by
        function DrawClockHands(color)
        {
            context.beginPath();
            context.fillStyle = color;
            moveToTx(0,0);
            lineToTx(10,5);
            lineToTx(90,5);
            lineToTx(100,0);
            lineToTx(90,-5);
            lineToTx(10,-5);
            context.closePath();
            context.fill();
        }

        //Draws the clouds seen up at the top with some arcs
        function DrawCloud(x, y, color)
        {
            context.beginPath();
            context.fillStyle = color;
            context.arc(x, y, 20, 0, Math.PI, false);
            context.closePath();
            context.fill();
            context.moveTo(x+20, y);
            context.beginPath();
            context.arc(x+40, y, 20, 0, Math.PI, false);
            context.closePath();
            context.fill();
            context.moveTo(x+60, y);
            context.beginPath();
            context.arc(x+80, y, 20, 0, Math.PI, false);
            context.closePath();
            context.fill();
            context.moveTo(x, y);
            context.beginPath();
            context.arc(x+40, y, 60, 0, Math.PI, true);
            context.closePath();
            context.fill();

        }
        
        //Drawing all of the elements onto the canvas
        //Draws the clouds
        DrawCloud(15, 40, "#FFFFFF");
        DrawCloud(80, 60, "#FFFFFF");
        DrawCloud(150, 40, "#FFFFFF");
        DrawCloud(220, 60, "#FFFFFF");
        DrawCloud(300, 40, "#FFFFFF");

        //Draws the road and dashes on it
        DrawRoad();
        DrawRoadDashes(10, 370, "#FADA08");
        DrawRoadDashes(75, 370, "#FADA08");
        DrawRoadDashes(140, 370, "#FADA08");
        DrawRoadDashes(205, 370, "#FADA08");
        DrawRoadDashes(270, 370, "#FADA08");
        DrawRoadDashes(335, 370, "#FADA08");

        //Draws the buildings
        DrawBuilding(0,240, 70, 100, "#6FCA75");
        DrawBuilding(70,200, 50, 140, "#30499B");
        DrawBuilding(120, 140, 100, 200, "#AB84E5");
        DrawBuilding(220, 280, 120, 60, "#F6A555");
        DrawBuilding(340, 230, 60, 110, "#FFCBE9");

        //Draws the background to the clock
        DrawClock();

        //initial save to get back to the original
        stack.unshift(mat3.clone(stack[0])); // save
        //Matrix transformation for the car
        var car_grid = mat3.create();
        mat3.fromTranslation(car_grid, [carX, 335]);
        mat3.multiply(stack[0], stack[0], car_grid);
        DrawDraft("white");
        DrawCar("#FF3333");
    
        //Matrix transformation for wheel 1
        stack.unshift(mat3.clone(stack[0])); // save
        var wheel1_grid = mat3.create();
        mat3.fromTranslation(wheel1_grid, [-30,15]);
        mat3.rotate(wheel1_grid, wheel1_grid, angle);
        mat3.multiply(stack[0], stack[0], wheel1_grid);
        DrawWheels(0, 0, 10, "black");
        stack.shift(); //restore


        //Matrix transformation for wheel 2
        stack.unshift(mat3.clone(stack[0])); //save
        var wheel2_grid = mat3.create();
        mat3.fromTranslation(wheel2_grid, [30,15]);
        mat3.rotate(wheel2_grid, wheel2_grid, angle);
        mat3.multiply(stack[0], stack[0], wheel2_grid);
        DrawWheels(0, 0, 10, "black");
        stack.shift(); //restore

        //should be back to original coordinates at this point
        stack.shift(); //restore

        stack.unshift(mat3.clone(stack[0])); //save

        //Matrix transformation for the clock
        var clock_hand1 = mat3.create();
        mat3.fromTranslation(clock_hand1, [140,195]);
        mat3.scale(clock_hand1, clock_hand1, [0.3, 0.3]);
        mat3.multiply(stack[0], stack[0], clock_hand1);
        DrawClockHands("black");
        var clock_hand2 = mat3.create();
        mat3.fromTranslation(clock_hand2, [100, 0]);
        mat3.rotate(clock_hand2, clock_hand2, alpha);
        mat3.multiply(stack[0], stack[0], clock_hand2);
        DrawClockHands("black");

        //animating the program
        window.requestAnimationFrame(draw);

    }
    draw();
    
}
window.onload = setup;
