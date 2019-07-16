export default class Cell {
	constructor(active = false){
		this._active = active;
		this._gen = 1;
	}

	toggle_active(){
		this._gen = this.active ? 0 : 1
		this._active = !this.active
	}

	get is_active(){
		return this._active
	}

	inc_gen(inc = 1){
		this._gen += inc
	}

	get gen(){
		return this._gen
	}
}