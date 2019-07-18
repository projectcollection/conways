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


## "Cell" [implementation](https://github.com/projectcollection/conways/blob/master/game_of_life/src/components/Cell.js)
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
