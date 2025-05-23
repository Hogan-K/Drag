# Drag
Implemented a draggable feature using vanilla JavaScript.

## CDN
```html
<script src="https://cdn.jsdelivr.net/gh/Hogan-K/Drag@v1.0.0/dist/Drag.umd.js"></script>
```

## How to use

### description
The element must have its own position and initial position set beforehand. This feature only updates the position during dragging. It uses bottom and right for positioning instead of top and left. If you need to reverse this behavior, you can adjust the logic accordingly.

### Basic Usage
#### HTML(Body)
```html
<body>
  <div id="test" onpointerdown="dragStart()" style="width: 200px; height: 200px; background-color: red; position: absolute"></div>
</body>
```

#### JavaScript (Script)
```html
<script src="https://cdn.jsdelivr.net/gh/Hogan-K/Drag@v1.0.0/dist/Drag.umd.js"></script>
<script>
  const dragStart = () => {
    Drag({ main_el: document.getElementById('test') })
  }
</script>
```


### Options
**parameter:**
- `main_el` The main element being dragged - *Element  // required*
- `area_el` Drag boundary - *Element (default: `null`)*
- `top_boundary` Custom top boundary within the drag area - *Number (default: `0`)*
- `bottom_boundary` Custom bottom boundary within the drag area - *Number (default: `0`)*
- `right_boundary` Custom right boundary within the drag area - *Number (default: `0`)*
- `left_boundary` Custom left boundary within the drag area - *Number (default: `0`)*
