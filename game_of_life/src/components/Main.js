import React, {useState, useEffect} from 'react'

import Cell from './Cell';
import {make_grid_of, update_cell_states, buffer, draw, game_of_life, random_config} from './helpers';

function Main(props) {
	const [grid, set_grid] = useState();
	const [world_gen, set_world_gen] = useState(0);

	const [rows, set_rows] = useState()
	const [cols, set_cols] = useState()
	const [resolution, set_resolution] = useState(10)
	
	useEffect(() => {
		const canvas = document.getElementById('canvas')
		let rows = canvas.height/resolution; 
		let cols = canvas.width/resolution;
		let new_grid = make_grid_of(Cell, rows, cols)
		random_config(new_grid)
		set_rows(rows)
		set_cols(cols)
		set_grid(new_grid)
		update_cell_states(grid)
		draw(grid, canvas.getContext('2d'), rows, cols, resolution)
	},[resolution])

	useEffect(() => {
		const canvas = document.getElementById('canvas')
		game_of_life(grid)
		update_cell_states(grid)
		draw(grid, canvas.getContext('2d'), rows, cols, resolution)
		let buffr = buffer(grid, canvas, rows, cols, resolution)
		canvas.getContext('2d').drawImage(buffr, 0, 0)
	},[grid,world_gen])

	return(
		<div>
			<button onClick = {() => {
				// test toggle
				setInterval(() => {
					set_world_gen(prev_gen => prev_gen + 1)
				}, 100)
			}}> click</button>
			<h1>generation: {world_gen}</h1>	
			<canvas id = 'canvas' width = '500px' height = '500px'/>
		</div>
	)
}

export default Main