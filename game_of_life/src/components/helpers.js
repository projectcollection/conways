import Cell from "./Cell";

export {
	make_grid_of,
	update_cell_states,
	buffer,
	draw
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

function buffer(grid, canvas, rows, cols, resolution){
	const new_canvas = document.createElement('canvas');
	new_canvas.width = canvas.width;
	new_canvas.height = canvas.height;
	var new_context = new_canvas.getContext('2d');

	draw(grid, new_context, rows, cols, resolution);
	return new_canvas
}

function draw(grid, canvas_ctx, rows, cols, resolution){
	if (!grid){
		return
	}
	for (let i = 0; i < rows; i++){
		for(let j = 0; j < cols; j++){
			let x = i * resolution;
			let y = j * resolution;

			if (grid[i][j].is_active) {
				canvas_ctx.fillStyle = 'black'
			}
			else {
				canvas_ctx.fillStyle = 'white'
			}
			canvas_ctx.fillRect(x, y, resolution, resolution)
		}
	}

}