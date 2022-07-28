# Rectangle Project: 

The Project assumes that any input rectangle is orthogonal to the x-y coordinate plane

The interface to construct requires coordinates to be entered in the correct order.

### Constructor: 
    new Rectangle(left, right, bottom, top);
        left -> x coordinate of left edge
        right -> x coordinate of right edge
        bottom -> y coordinate of bottom edge
        top -> y coordinate of top edge

### Methods: 
    Rectangle.contains(r2: Rectangle);
    Rectangle.intersects(r2: Rectangle);
    Rectangle.isAdjacent(r2: Rectangle);

## Requirements:
- NodeJS v18.4.0

## Setup:
```npm install```

## Test:
```npm run test
```
## Compile:
```npm run build```