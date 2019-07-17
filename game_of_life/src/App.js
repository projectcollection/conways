import React from 'react';
import './App.css';

import Main from './components/Main';

function App() {
	return (
		<div className="App">
			<div className="App-header">
				<div id = 'main'>
					<Main/>
				</div>
				<div id = 'rules' class = 'text-block'>
					<p>For each cell, it counts that cell's eight neighbors (up, down, left, right, and diagonals), and then act on that result.</p>
					<ul>
						<li>
							If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
						</li>
						<li>
							If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.
						</li>
					</ul>
					<h2>See implementation details on <a class = 'App-link' href = 'https://github.com/projectcollection/conways' target = '_blank' rel = 'noopener noreferrer'>github</a></h2>
				</div>
			</div>

			<div id = 'details'>
				<h1>Introduction</h1>
				<p class = ''>
					The <b>The Game of Life</b> is a cellular automaton made by <a href = 'https://en.wikipedia.org/wiki/John_Horton_Conway'>John Conway</a> in 1970. It is derived from <a href = 'https://en.wikipedia.org/wiki/John_von_Neumann'>John von Neumann's</a> definition of life:
					a being which can reproduce itself and simulate a <a href = 'https://en.wikipedia.org/wiki/Turing_machine'>Turing Machine</a>. It was created by experimentations with the rules by which the state of a "Cell" will change. Conway's goal was to define an interesting and
					unpredictable automaton. He figured out the rules stated above by following his own criteria:
				</p>
				<ul>
					<li>
						There should be no explosive growth.
					</li>
					<li>
						There should exist small initial patterns with chaotic, unpredictable outcomes.
					</li>
					<li>
						There should be potential for <a href = 'https://en.wikipedia.org/wiki/Von_Neumann_universal_constructor'>von Neumann universal constructors</a>.
					</li>
					<li>
						The rules should be as simple as possible, whilst adhering to the above constraints.
					</li>
				</ul>
				<cite>Source: <a href = 'https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>Wikipedia</a></cite>
			</div>
		</div>
	);
}

export default App;
