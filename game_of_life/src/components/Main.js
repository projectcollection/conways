import React, {useState, useEffect} from 'react'

import Cell from './Cell';
import {make_grid_of, update_cell_states, buffer, draw} from './helpers';

function Main(props) {
	const [grid, set_grid] = useState();
	const [world_gen, set_world_gen] = useState(0);

	const [rows, set_rows] = useState()
	const [cols, set_cols] = useState()
	const [resolution, set_resolution] = useState(50)
	
	useEffect(() => {
		const canvas = document.getElementById('canvas')
		let rows = canvas.height/resolution; 
		let cols = canvas.width/resolution;
		let new_grid = make_grid_of(Cell, rows, cols)
		set_rows(rows)
		set_cols(cols)
		set_grid(new_grid)
		update_cell_states(grid)
		draw(grid, canvas.getContext('2d'), rows, cols, resolution)
	},[resolution])

	useEffect(() => {
		const canvas = document.getElementById('canvas')
		update_cell_states(grid)
		draw(grid, canvas.getContext('2d'), rows, cols, resolution)
		let buffr = buffer(grid, canvas, rows, cols, resolution)
		canvas.getContext('2d').drawImage(buffr, 0, 0)
	},[grid,world_gen])

	return(
		<div>
			<button onClick = {() => {
				// test toggle
				grid[0][0].set_next_state(!grid[0][0].is_active)
				set_world_gen(world_gen+1)
			}}> click</button>
			<canvas id = 'canvas' width = '500px' height = '500px'/>
		</div>
	)
}

export default Main