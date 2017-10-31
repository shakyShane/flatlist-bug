## Flatlist Bug with ListHeaderComponent

`Flatlist` exposes `onViewableItemsChanged` - which can be used to determine which elements are currently
visible within a list. This works correctly.

If a `ListHeaderComponent` is also given, the calculations used for determining which items are in view
will be incorrect - by exactly the height of the header.


in `Libraries/Lists/VirtualizedList.js`, `this._headerLength` is initialised as `0` and then updated on render
to store the length of the header dynamically, but then this value is not used anywhere else.


## Calculations need to account for the 'length' of the Header component

We found the easiest way was to subtract the `this._headerLength` from the offset calculation, such as 

```diff
_selectOffset(metrics: {x: number, y: number}): number {
-   return !this.props.horizontal ? metrics.y : metrics.x;
+   return (!this.props.horizontal ? metrics.y : metrics.x) - this._headerLength;
}
```
