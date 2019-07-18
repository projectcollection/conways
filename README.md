# conways
Conway's game of life

# Introduction

The **The Game of Life** is a cellular automaton made by John Conway in 1970.
It is derived from John von Neumann's definition of life: a being which can
reproduce itself and simulate a Turing Machine. It was created by
experimentations with the rules by which the state of a "Cell" will change.
Conway's goal was to define an interesting and unpredictable automaton. He
figured out these rules:

- If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
- If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.

by following his own criteria:

- There should be no explosive growth.
- There should exist small initial patterns with chaotic, unpredictable outcomes.
- There should be potential for von Neumann universal constructors.
- The rules should be as simple as possible, whilst adhering to the above constraints.
Source: [Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

# Implementation

The game is represented in a grid and each square will represent a cell. For
every generation or iteration, each cell should be checked whether it should be
`active` or not. 

One thing that should be avoided is changing the state of the cells as the
they are being checked. This is so that the state will not be corrupted. Say a cell
at `(0,0)` which is currently `active` is being checked and according to the
rules, determined that it should be `inactive`. It should still stay `active` so
that when the next cell at `(0,1)` is checked, it still sees `(0,0)` as `active`.
Update it only when all the cells are checked.

So there are a couple of things needed:
- a way to render
- a data structure to represent the grid
- a way to represent each cell
- a way to store the *current state* and the *next state* for each cell
- keep track of which iteration/generation of the grid is being rendered

**React.js** is being used for this project. Mainly because it is within the developer's
skillset, and state management in **React** is easy. To render the grid itself, `<div>`
elements could be used. However, it can be time-consuming to style then with *CSS*. A `<canvas>` is used instead of multiple `<div>` elements. A 2D array is used to represent
the grid stored with cells.

Heres how a 2x2 grid would look like:
```
[[Cell, Cell],
 [Cell, Cell]]
```
An array of length two where each element is an array of two Cells.

## "Cell" [implementation](https://github.com/projectcollection/conways/blob/master/game_of_life/src/components/Cell.js)

The `Cell` class have these properties and a couple of methods to modify or get their values.
```
{
  _active: boolean,
  _gen: non-negative integer,
  _next_state: boolean
}
```

_active indicates the current state of a Cell. Instead of having a second
2d array to store the next states of every Cell, the next state is stored
within the Cell itself _next_state. The _gen (generation count) will
increment if _active and _next_sate are both `true` and reset to `0` when
Cell._active changes from `true` to `false`.

A variable that is set to `0` and increments by one each iteration is used to track the generation count.

## Animation [implementation](https://github.com/projectcollection/conways/blob/master/game_of_life/src/components/Main.js)

### States
**Note**: React Hooks is used here.

These are the all the states that are tracked. The ones initialized with `useState()` are set to `undefined`;
```
const [grid, set_grid] = useState();
const [world_gen, set_world_gen] = useState(0);

const [main_canvas, set_main_canvas] = useState(); //The canvas element
const [rows, set_rows] = useState();
const [cols, set_cols] = useState();
const [resolution] = useState(5);

const [anim_loop, set_anim_loop] = useState();
const [is_animating, set_is_animating] = useState(false);
```

### Setup

`useEffect()` runs the callback once the first time the page loads
and every time the variables in the array of the second argument
changes

This code block gets a reference to the main canvas to
render the grid on, calculate the number of `rows` and `columns`
the grid should be based on the height, width of the canvas and the
resolution.

It creates a new grid with the `make_grid_of(Object_definition, rows, cols)` helper function.
Randomly configure it (go through each cell and randomly set it to `active` or `inactive` with a 50/50 chance).
Then draws the grid to the canvas.

```
useEffect(() => {
		const canvas = document.getElementById('canvas');
		let rows = canvas.height/resolution; 
		let cols = canvas.width/resolution;
		let new_grid = make_grid_of(Cell, rows, cols);
		random_config(new_grid);

		set_main_canvas(canvas);
		set_rows(rows);
		set_cols(cols);
		set_grid(new_grid);
		draw(grid, canvas.getContext('2d'), rows, cols, resolution);
	},[resolution]);
```
### Iteration

This code block will handle the iterations beyond iteration `0`.
It runs the `game_of_life()` on the grid which would set the *next state*
for each cell in the grid. `update_cell_states()` will change the *current state*
of each cell based on their *next state*.

After that, `buffer()` will create a new canvas, draw the grid on it and returns the
canvas. Note that the user will not see this render happening. The user will only see
what is rendered on the `main_canvas`. The last line will draw what is in `buffr` on
the `main_canvas`.

```
useEffect(() => {
		if (!main_canvas){
			return
		}
		game_of_life(grid);
		update_cell_states(grid);
		let buffr = buffer(grid, main_canvas, rows, cols, resolution);
		main_canvas.getContext('2d').drawImage(buffr, 0, 0);
	},[grid,world_gen]);
```

How is the code block above in a loop? The loop is actually initiated when a button
is clicked by the user. The button below will toggle from starting the animation and
stopping it.

`loop` is a reference to a `setInterval()` that increment `world_gen` by 1 every 100ms.
The changing of the value of `world_gen` is what triggers the code block above.


```
//this is in the return statement of the React component
<button onClick = {() => {
      if (!is_animating){
        const loop = setInterval(() => {
          set_world_gen(prev_gen => prev_gen + 1)
        }, 100);
        set_anim_loop(loop);
        set_is_animating(true);
      }
      else {
        clearInterval(anim_loop);
        set_is_animating(false);
      }
    }}>{is_animating ? 'Stop': 'Animate'}</button>
```

# Conclusions/Observations

Looking back at what the implementation, I don't know of way to make it more efficient. Currently it could handle a 100x100 grid fairly well. When I increased it to 150x150, it
started to struggle, and at 500x500 it runs really slowy. However, when ran on a phone, an
iphone 6, it runs smoothly and I don't know why that is.

