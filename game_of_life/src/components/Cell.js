export default class Cell {
	constructor(active = false){
		this._active = active;
		this._gen = 0;
		this._next_state = active;
	}

	toggle_active(){
		if (this._active){
			this._gen = 0;
		}
		this._active = !this._active;
	}

	get is_active(){
		return this._active;
	}

	set_next_state(active){
		this._next_state = active;
	}

	get next_state(){
		return this._next_state;
	}

	inc_gen(inc = 1){
		this._gen += inc;
	}

	reset_gen(){
		this._gen = 0;
	}

	get gen(){
		return this._gen;
	}
}