# conways
Conway's game of life

# "Cell" [implementation](https://github.com/projectcollection/conways/blob/master/game_of_life/src/components/Cell.js)
```
{
  _active: boolean,
  _gen: non-negative integer,
  _next_state: boolean
}
```

_active indicates the current state of a Cell. Instead of having a second 2d array to store the next states of every Cell, the next state is stored within the Cell itself _next_state. The _gen (generation count) will increment if _active and _next_sate are both `true` and reset to `0` when Cell._active changes from `true` to `false`.
