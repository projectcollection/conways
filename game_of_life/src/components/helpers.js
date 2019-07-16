export {
	make_grid_of,
	update_cell_states,
	buffer,
	draw,
	game_of_life,
	random_config
}

/**
 * 
 * @param {ObjectConstructor} object
 * @param {BigInteger} rows 
 * @param {BigInteger} cols 
 * 
 * @return {grid} 2d array of objects
 * 
 * Will create a 2 dimensional array populated with `new object()`
 * 
 * note that no parameters will be passed in when the `object` class is instanciated
 */
function make_grid_of(object, rows, cols){
	let grid = new Array(rows)
	if (rows > 0 && cols > 0){
		for(let i = 0; i < rows; i++){
			grid[i] = new Array(cols)
		}

		for(let i = 0; i < rows; i++){
			for(let j = 0; j < cols; j++){
				grid[i][j] = new object()
			}
		}
		return grid
	}
	else {
		throw 'Invalid rows or cols';
	}

}

/**
 * 
 * @param {[[Cell]]} grid 
 * Set Cell._active = Cell._next_state
 * 
 * if `_active` and `_next_state` are `true`, will increment Cell._gen (generation count)
 */
function update_cell_states(grid){
	if (!grid){
		return
	}
	grid.forEach(row => {
		row.forEach(cell => {
			if(cell.is_active && cell.next_state ){
				cell.inc_gen()
			}
			else if (cell.is_active !== cell.next_state){
				cell.toggle_active()
			}
		})
	})
}

/**
 * 
 * @param {[[Cell]]} grid 
 * @param {HTMLCanvasElement} canvas 
 * @param {BigInteger} rows 
 * @param {BigInteger} cols 
 * @param {BigInteger} resolution 
 * 
 * @return {HTMLCanvasElement}
 * Creates a new `HTMLCanvasElement`, draws the `grid` on it.
 * 
 */
function buffer(grid, canvas, rows, cols, resolution){
	const new_canvas = document.createElement('canvas');
	new_canvas.width = canvas.width;
	new_canvas.height = canvas.height;
	var new_context = new_canvas.getContext('2d');

	draw(grid, new_context, rows, cols, resolution);
	return new_canvas
}

/**
 * 
 * @param {[[Cell]]} grid 
 * @param {Object} canvas_ctx - canvas.getContext('2d)
 * @param {BigInteger} rows 
 * @param {BigInteger} cols 
 * @param {BigInteger} resolution 
 * 
 * Draws the `grid` on a given canvas context
 */
function draw(grid, canvas_ctx, rows, cols, resolution){
	if (!grid){
		return
	}
	for (let i = 0; i < rows; i++){
		for(let j = 0; j < cols; j++){
			let x = i * resolution;
			let y = j * resolution;
			
			let cell = grid[i][j] 
			if (cell.is_active) {
				canvas_ctx.fillStyle = `rgb(10,0,${cell.gen * 5})`
			}
			else {
				canvas_ctx.fillStyle = 'white'
			}
			canvas_ctx.fillRect(x, y, resolution, resolution)
		}
	}

}

/**
 * 
 * @param {[[Cell]]} grid 
 * 
 * Checks every `Cell` if it should be `active` in the next generation and sets its `next_state`
 */
function game_of_life(grid){
	if(!grid){
		return
	}
	let rows = grid.length;
	let cols = grid[0].length;

	for (let i = 0; i < rows; i ++){
		for (let j = 0; j < cols; j ++){
			let active_neighbors = count_neighbors(grid, i, j, rows, cols);

			let cell = grid[i][j] 
			if(!cell.is_active && active_neighbors === 3){
				cell.set_next_state(true)
			}
			else if (grid[i][j].is_active && (active_neighbors < 2 || active_neighbors > 3) ){
				cell.set_next_state(false)
			}
			
		}
	}
}

/**
 * 
 * @param {[[Cell]]} grid 
 * @param {BigInteger} x 
 * @param {BigInteger} y 
 * @param {BigInteger} rows 
 * @param {BigInteger} cols 
 * 
 * @returns {BigInteger} 
 * 
 * Counts active neighbors
 */
function count_neighbors(grid, x, y, rows, cols){
	if (!grid){
		return
	}
	let total_active = 0;
	let self = grid[x][y]
	for (let i = -1; i < 2; i ++){
		for (let j = -1; j < 2; j++){
			let row = (x + i + rows) % rows
			let col = (y + j + cols) % cols
			let cell = grid[row][col]
			if (cell.is_active && cell !== self){
				total_active += 1
			}
		}
	}
	return total_active
}

function random_config(grid){
	grid.forEach(row => {
		row.forEach(cell => {
			cell.set_next_state(Math.random() > .5)
			cell.reset_gen()
		})
	})
}