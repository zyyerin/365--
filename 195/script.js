// https://codepen.io/aecend/pen/WbONyK

/*
This script creates a grid of cells and a separate layer of particles that
float on top of the grid.
Each cell holds X and Y velocity values and a pressure value.

mouseDragged
1. the velocity of the mouse is calculated
2. applied to the velocity and pressure in each cell within the defined range of the mouse coordinates
3. pressure change applied to the neighboring cells
4. adjust velocity and pressure of the neighbor cells
5. test if the change propogates to all of the cells in the path of the direction of movement
5. repeat the change until true

Particles
1. randomly placed on the canvas
2. move according to the velocity of the grid cells below
  (grass seed floating on the surface of water as it's moving)
3. when the particles move off the edge of the canvas,
  a) they are "dropped" back on to the canvas in a random position
  b) velocity is "wrapped" around to the opposite edge of the canvas
     The slowing down of the movement is simulated viscosity,
     which is basically frictional drag in the liquid

--------

This is a self-invoking function.
The reason for wrapping the script in this is to isolate the
majority of the variables that I define inside from the global scope and
only reveal specific functions and values. It looks like this:

(function(argument) {

    alert(argument);

})("Yo.");

and it does the same thing as this:

function thing(argument) {

    alert(argument);

}

thing("Yo.");
*/

// setup
// These are the variable definitions for the values that will be used
// throughout the rest of the script.



(function(w) {

    let canvas, ctx;
    /*
    an associative array holds the status of the mouse
    value updated when the mouse is moved or pressed
    */
    let mouse = {
        x: 0,
        y: 0,
        px: 0,
        py: 0,
        down: false
    };

    const canvas_width = 400;
    const canvas_height = 400;
    const resolution = 50; //Width and height of each cell in the grid.
    const pen_size = 100; //Radius around the mouse cursor coordinates to reach when stirring

    let num_cols = canvas_width / resolution; //This value is the number of columns in the grid.
    let num_rows = canvas_height / resolution; //This is number of rows.
    const speck_count = 5000; //This determines how many particles will be made.

    let vec_cells = []; //The array that will contain the grid cells
    let particles = []; //The array that will contain the particles

    // main function
    // constructing the grid and creating the particles
    // attaching event handlers, and starting the animation loop

    function init() {

        // get the canvas DOM element and canvas context
        // set the width and height of the canvas to the defined values
        canvas = document.getElementById("c");
        ctx = canvas.getContext("2d");
        canvas.width = canvas_width;
        canvas.height = canvas_height;

        // particles
        for (i = 0; i < speck_count; i++) {
            // 1. call the function particle() with random X and Y values
            // 2. take the returned object and pushes it into the particles array
            particles.push(new particle(Math.random() * canvas_width, Math.random() * canvas_height));
        }

        // loops through the count of columns
        for (col = 0; col < num_cols; col++) {
            // defines the array element as another array
            vec_cells[col] = [];

            // loops through the count of rows
            for (row = 0; row < num_rows; row++) {

                // 1. calls the cell() function
                //   creates an individual grid cell
                //   returns it as an object
                // 2. X and Y values are multiplied by the resolution
                let cell_data = new cell(col * resolution, row * resolution, resolution)

                // populate the grid array
                vec_cells[col][row] = cell_data;

                // set the object's column and row values so the object knows
                // where in the grid it is positioned
                vec_cells[col][row].col = col;
                vec_cells[col][row].row = row;

            }
        }


        /*
        move through the rows and columns of the grid array again and set variables
        in each cell object that will hold the directional references to neighboring cells.
        For example, let's say the loop is currently on this cell:

        OOOOO
        OOOXO
        OOOOO

        These variables will hold the references to neighboring cells so you only need to
        use "up" to refer to the cell above the one you're currently on.
        */
        for (col = 0; col < num_cols; col++) {

            for (row = 0; row < num_rows; row++) {

                /*
                This variable holds the reference to the current cell in the grid. When you
                refer to an element in an array, it doesn't copy that value into the new
                variable; the variable stores a "link" or reference to that spot in the array.
                If the value in the array is changed, the value of this variable would change
                also, and vice-versa.
                */
                let cell_data = vec_cells[col][row];

                /*
                Each of these lines has a ternary expression. A ternary expression is similar
                to an if/then clause and is represented as an expression (e.g. row - 1 >= 0)
                which is evaluated to either true or false. If it's true, the first value after
                the question mark is used, and if it's false, the second value is used instead.

                If you're on the first row and you move to the row above, this wraps the row
                around to the last row. This is done so that momentum that is pushed to the edge
                of the canvas is "wrapped" to the opposite side.
                */
                let row_up = (row - 1 >= 0) ? row - 1 : num_rows - 1;
                let col_left = (col - 1 >= 0) ? col - 1 : num_cols - 1;
                let col_right = (col + 1 < num_cols) ? col + 1 : 0;

                //Get the reference to the cell on the row above.
                let up = vec_cells[col][row_up];
                let left = vec_cells[col_left][row];
                let up_left = vec_cells[col_left][row_up];
                let up_right = vec_cells[col_right][row_up];

                /*
                Set the current cell's "up", "left", "up_left" and "up_right" attributes to the
                respective neighboring cells.
                */
                cell_data.up = up;
                cell_data.left = left;
                cell_data.up_left = up_left;
                cell_data.up_right = up_right;

                /*
                Set the neighboring cell's opposite attributes to point to the current cell.
                */
                up.down = vec_cells[col][row];
                left.right = vec_cells[col][row];
                up_left.down_right = vec_cells[col][row];
                up_right.down_left = vec_cells[col][row];

            }
        }


        /*
        These lines create triggers that fire when certain events happen. For
        instance, when you move your mouse, the mouse_move_handler() function
        will run and will be passed the event object reference into it's "e"
        variable. Something to note, the mousemove event doesn't necessarily
        fire for *every* mouse coordinate position; the mouse movement is
        sampled at a certain rate, meaning that it's checked periodically, and
        if the mouse has moved, the event is fired and the current coordinates
        are sent. That's why you'll see large jumps from one pair of coordinates
        to the next if you move your mouse very fast across the screen. That's
        also how I measure the mouse's velocity.
        */
        w.addEventListener("mousedown", mouse_down_handler);
        w.addEventListener("touchstart", mouse_down_handler);

        w.addEventListener("mouseup", mouse_up_handler);
        w.addEventListener("touchend", touch_end_handler);

        canvas.addEventListener("mousemove", mouse_move_handler);
        canvas.addEventListener("touchmove", touch_move_handler);

        //When the page is finished loading, run the draw() function.
        w.onload = draw;

    }

    /*
    This function updates the position of the particles according to the velocity
    of the cells underneath, and also draws them to the canvas.
    */
    function update_particle() {

        //Loops through all of the particles in the array
        for (i = 0; i < particles.length; i++) {

            //Sets this variable to the current particle so we can refer to the particle easier.
            let p = particles[i];

            //If the particle's X and Y coordinates are within the bounds of the canvas...
            if (p.x >= 0 && p.x < canvas_width && p.y >= 0 && p.y < canvas_height) {

                /*
                These lines divide the X and Y values by the size of each cell. This number is
                then parsed to a whole number to determine which grid cell the particle is above.
                */
                let col = parseInt(p.x / resolution);
                let row = parseInt(p.y / resolution);

                //Same as above, store reference to cell
                let cell_data = vec_cells[col][row];

                /*
                These values are percentages. They represent the percentage of the distance across
                the cell (for each axis) that the particle is positioned. To give an example, if
                the particle is directly in the center of the cell, these values would both be "0.5"

                The modulus operator (%) is used to get the remainder from dividing the particle's
                coordinates by the resolution value. This number can only be smaller than the
                resolution, so we divide it by the resolution to get the percentage.
                */
                let ax = (p.x % resolution) / resolution;
                let ay = (p.y % resolution) / resolution;

                /*
                These lines subtract the decimal from 1 to reverse it (e.g. 100% - 75% = 25%), multiply
                that value by the cell's velocity, and then by 0.05 to greatly reduce the overall change in velocity
                per frame (this slows down the movement). Then they add that value to the particle's velocity
                in each axis. This is done so that the change in velocity is incrementally made as the
                particle reaches the end of it's path across the cell.
                */
                p.xv += (1 - ax) * cell_data.xv * 0.05;
                p.yv += (1 - ay) * cell_data.yv * 0.05;

                /*
                These next four lines are are pretty much the same, except the neighboring cell's
                velocities are being used to affect the particle's movement. If you were to comment
                them out, the particles would begin grouping at the boundary between cells because
                the neighboring cells wouldn't be able to pull the particle into their boundaries.
                */
                p.xv += ax * cell_data.right.xv * 0.05;
                p.yv += ax * cell_data.right.yv * 0.05;

                p.xv += ay * cell_data.down.xv * 0.05;
                p.yv += ay * cell_data.down.yv * 0.05;

                //This adds the calculated velocity to the position coordinates of the particle.
                p.x += p.xv;
                p.y += p.yv;

                //For each axis, this gets the distance between the old position of the particle and it's new position.
                let dx = p.px - p.x;
                let dy = p.py - p.y;

                //Using the Pythagorean theorum (A^2 + B^2 = C^2), this determines the distance the particle travelled.
                let dist = Math.sqrt(dx * dx + dy * dy);

                //This line generates a random value between 0 and 0.5
                let limit = Math.random() * 0.5;

                //If the distance the particle has travelled this frame is greater than the random value...
                if (dist > limit) {
                    ctx.beginPath(); //Begin a new path on the canvas
                    ctx.moveTo(p.x, p.y); //Move the drawing cursor to the starting point
                    ctx.lineTo(p.px, p.py); //Describe a line from the particle's old coordinates to the new ones
                    ctx.stroke(); //Draw the path to the canvas
                }else{
                    //If the particle hasn't moved further than the random limit...

                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);

                    /*
                    Describe a line from the particle's current coordinates to those same coordinates
                    plus the random value. This is what creates the shimmering effect while the particles
                    aren't moving.
                    */
                    ctx.lineTo(p.x + limit, p.y + limit);

                    ctx.stroke();
                }

                //This updates the previous X and Y coordinates of the particle to the new ones for the next loop.
                p.px = p.x;
                p.py = p.y;
            }
            else {
                //If the particle's X and Y coordinates are outside the bounds of the canvas...

                //Place the particle at a random location on the canvas
                p.x = p.px = Math.random() * canvas_width;
                p.y = p.py = Math.random() * canvas_height;

                //Set the particles velocity to zero.
                p.xv = 0;
                p.yv = 0;
            }

            //These lines divide the particle's velocity in half everytime it loops, slowing them over time.
            p.xv *= 0.5;
            p.yv *= 0.5;
        }
    }

    function draw() {
        /*
        This calculates the velocity of the mouse by getting the distance between the last coordinates and
        the new ones. The coordinates will be further apart depending on how fast the mouse is moving.
        */
        let mouse_xv = mouse.x - mouse.px;
        let mouse_yv = mouse.y - mouse.py;

        //Loops through all of the columns
        for (i = 0; i < vec_cells.length; i++) {
            let cell_datas = vec_cells[i];

            //Loops through all of the rows
            for (j = 0; j < cell_datas.length; j++) {

                //References the current cell
                let cell_data = cell_datas[j];

                //If the mouse button is down, updates the cell velocity using the mouse velocity
                if (mouse.down) {
                    change_cell_velocity(cell_data, mouse_xv, mouse_yv, pen_size);
                }

                //This updates the pressure values for the cell.
                update_pressure(cell_data);
            }
        }

        /*
        This line clears the canvas. It needs to be cleared every time a new frame is drawn
        so the particles move. Otherwise, the particles would just look like long curvy lines.
        */
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //This sets the color to draw with.
        ctx.strokeStyle = "#fff";

        //This calls the function to update the particle positions.
        update_particle();

        /*
        This calls the function to update the cell velocity for every cell by looping through
        all of the rows and columns.
        */
        for (i = 0; i < vec_cells.length; i++) {
            let cell_datas = vec_cells[i];

            for (j = 0; j < cell_datas.length; j++) {
                let cell_data = cell_datas[j];

                update_velocity(cell_data);

            }
        }

        //This replaces the previous mouse coordinates values with the current ones for the next frame.
        mouse.px = mouse.x;
        mouse.py = mouse.y;

        //This requests the next animation frame which runs the draw() function again.
        requestAnimationFrame(draw);

    }


    /*
    This function changes the cell velocity of an individual cell by first determining whether the cell is
    close enough to the mouse cursor to be affected, and then if it is, by calculating the effect that mouse velocity
    has on the cell's velocity.
    */
    function change_cell_velocity(cell_data, mvelX, mvelY, pen_size) {
        //This gets the distance between the cell and the mouse cursor.
        let dx = cell_data.x - mouse.x;
        let dy = cell_data.y - mouse.y;
        let dist = Math.sqrt(dy * dy + dx * dx);

        //If the distance is less than the radius...
        if (dist < pen_size) {

            //If the distance is very small, set it to the pen_size.
            if (dist < 4) {
                dist = pen_size;
            }

            //Calculate the magnitude of the mouse's effect (closer is stronger)
            let power = pen_size / (dist*15);
            // console.log(power);
            /*
            Apply the velocity to the cell by multiplying the power by the mouse velocity and adding it to the cell velocity
            */
            cell_data.xv += mvelX * power;
            cell_data.yv += mvelY * power;
        }
    }


    /*
    This function updates the pressure value for an individual cell using the
    pressures of neighboring cells.
    */
    function update_pressure(cell_data) {

        //This calculates the collective pressure on the X axis by summing the surrounding velocities
        let pressure_x = (
            cell_data.up_left.xv * 0.5 //Divided in half because it's diagonal
            + cell_data.left.xv
            + cell_data.down_left.xv * 0.5 //Same
            - cell_data.up_right.xv * 0.5 //Same
            - cell_data.right.xv
            - cell_data.down_right.xv * 0.5 //Same
        );

        //This does the same for the Y axis.
        let pressure_y = (
            cell_data.up_left.yv * 0.5
            + cell_data.up.yv
            + cell_data.up_right.yv * 0.5
            - cell_data.down_left.yv * 0.5
            - cell_data.down.yv
            - cell_data.down_right.yv * 0.5
        );

        //This sets the cell pressure to one-fourth the sum of both axis pressure.
        cell_data.pressure = (pressure_x + pressure_y) * 0.5;
    }


    /*
    This function updates the velocity value for an individual cell using the
    velocities of neighboring cells.
    */
    function update_velocity(cell_data) {

        /*
        This adds one-fourth of the collective pressure from surrounding cells to the
        cell's X axis velocity.
        */
        cell_data.xv += (
            cell_data.up_left.pressure * 0.5
            + cell_data.left.pressure
            + cell_data.down_left.pressure * 0.5
            - cell_data.up_right.pressure * 0.5
            - cell_data.right.pressure
            - cell_data.down_right.pressure * 0.5
        ) * 0.25;

        //This does the same for the Y axis.
        cell_data.yv += (
            cell_data.up_left.pressure * 0.5
            + cell_data.up.pressure
            + cell_data.up_right.pressure * 0.5
            - cell_data.down_left.pressure * 0.5
            - cell_data.down.pressure
            - cell_data.down_right.pressure * 0.5
        ) * 0.25;

        /*
        This slowly decreases the cell's velocity over time so that the fluid stops
        if it's left alone.
        */
        cell_data.xv *= 0.99;
        cell_data.yv *= 0.99;
    }


    //This function is used to create a cell object.
    function cell(x, y, res) {

        //This stores the position to place the cell on the canvas
        this.x = x;
        this.y = y;

        //This is the width and height of the cell
        this.r = res;

        //These are the attributes that will hold the row and column values
        this.col = 0;
        this.row = 0;

        //This stores the cell's velocity
        this.xv = 0;
        this.yv = 0;

        //This is the pressure attribute
        this.pressure = 0;

    }


    //This function is used to create a particle object.
    function particle(x, y) {
        this.x = this.px = x;
        this.y = this.py = y;
        this.xv = this.yv = 0;
    }


    /*
    This function is called whenever the mouse button is pressed. The event object is passed to
    this function when it's called.
    */
    function mouse_down_handler(e) {
        e.preventDefault(); //Prevents the default action from happening (e.g. navigation)
        mouse.down = true; //Sets the mouse object's "down" value to true
    }


    //This function is called whenever the mouse button is released.
    function mouse_up_handler() {
        mouse.down = false;
    }


    //This function is called whenever a touch point is removed from the screen.
    function touch_end_handler(e) {
        if (!e.touches) mouse.down = false; //If there are no more touches on the screen, sets "down" to false.
    }


    /*
    This function is called whenever the mouse coordinates have changed. The coordinates are checked by the
    browser at intervals.
    */
    function mouse_move_handler(e) {
        //Saves the previous coordinates
        mouse.px = mouse.x;
        mouse.py = mouse.y;

        //Sets the new coordinates
        mouse.x = e.offsetX || e.layerX;
        mouse.y = e.offsetY || e.layerY;
    }


    /*
    This function is called whenever one of the coordinates have changed. The coordinates are checked by the
    browser at intervals.
    */
    function touch_move_handler(e) {
        mouse.px = mouse.x;
        mouse.py = mouse.y;

        //This line gets the coordinates for where the canvas is positioned on the screen.
        let rect = canvas.getBoundingClientRect();

        /*
        And this sets the mouse coordinates to where the first touch is. Since we're using pageX
        and pageY, we need to subtract the top and left offset of the canvas so the values are correct.
        */
        mouse.x = e.touches[0].pageX - rect.left;
        mouse.y = e.touches[0].pageY - rect.top;
    }


    /*
    And this line attaches an object called "Fluid" to the global scope. "window" was passed into
    the self-invoking function as "w", so setting "w.Fluid" adds it to "window".
    */
    w.Fluid = {
        initialize: init
    }

}(window)); //Passes "window" into the self-invoking function.


/*
Request animation frame polyfill. This enables you to use "requestAnimationFrame"
regardless of the browser the script is running in.
*/
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;


//And this line calls the init() function defined above to start the script.
Fluid.initialize();
