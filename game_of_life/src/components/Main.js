import React, {useState} from 'react'

import Cell from './Cell';
import {make_grid_of, update_cell_states} from './helpers';

function Main(props) {
	const [grid, set_grid] = useState(make_grid_of(Cell, 2, 2));
	let a = grid[0][0];

	console.log(a)
	a.set_next_state(true)
	update_cell_states(grid)
	console.log(a)
	a.set_next_state(true)
	update_cell_states(grid)
	console.log(a)
	a.set_next_state(false)
	update_cell_states(grid)
	console.log(a)
	a.set_next_state(false)
	

	return(
		<div>
			<h1>SHOW GRID HERE</h1>
		</div>
	)
}

export default Main