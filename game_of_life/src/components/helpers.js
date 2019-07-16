import Cell from "./Cell";

export {
	make_grid_of,
	update_cell_states
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