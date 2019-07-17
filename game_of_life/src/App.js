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
				<div id = "rules">
					<p>For each cell, it counts that cell's eight neighbors (up, down, left, right, and diagonals), and then act on that result.</p>
					<ul>
						<li>
							If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
						</li>
						<li>
							If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default App;
