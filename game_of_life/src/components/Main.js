import React, {useState, useEffect} from 'react'

import Cell from './Cell';
import {make_grid_of, update_cell_states, buffer, draw, game_of_life, random_config} from './helpers';

function Main(props) {
	const [grid, set_grid] = useState();
	const [world_gen, set_world_gen] = useState(0);

	const [main_canvas, set_main_canvas] = useState()
	const [rows, set_rows] = useState()
	const [cols, set_cols] = useState()
	const [resolution, set_resolution] = useState(10)

	const [anim_loop, set_anim_loop] = useState()
	const [is_animating, set_is_animating] = useState(false)
	
	useEffect(() => {
		const canvas = document.getElementById('canvas')
		let rows = canvas.height/resolution; 
		let cols = canvas.width/resolution;
		let new_grid = make_grid_of(Cell, rows, cols)
		random_config(new_grid)

		set_main_canvas(canvas)
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
			<div>			
				<h1>generation: {world_gen}</h1>	
				<canvas id = 'canvas' width = '500px' height = '500px'/>
			</div>

			<button onClick = {() => {
				if (!is_animating){
					const loop = setInterval(() => {
						set_world_gen(prev_gen => prev_gen + 1)
					}, 100)
					set_anim_loop(loop)
					set_is_animating(true)
				}
				else {
					clearInterval(anim_loop)
					set_is_animating(false)
				}
			}}>{is_animating ? 'Stop': 'Animate'}</button>
			
			<button disabled = {is_animating ? true : false} onClick = {() => {
				set_world_gen(prev_gen => prev_gen + 1)
			}}>Next</button>

			<button disabled = {is_animating ? true : false} onClick = {() => {
				set_world_gen(0)
				random_config(grid)
				update_cell_states(grid)
				draw(grid, main_canvas.getContext('2d'), rows, cols, resolution)
			}}>Reset</button>
		</div>
	)
}

export default Main