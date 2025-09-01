# Drag
Implemented a draggable feature using vanilla JavaScript.

## CDN
```html
<script src="https://cdn.jsdelivr.net/gh/Hogan-K/Drag@v2.0.0/dist/Drag.umd.js"></script>
```

## How to use

### description
This function only handles basic drag operations.

### Basic Usage
#### HTML(Body)
```html
<body>
  <div id="test" style="width: 200px; height: 200px; background-color: red;></div>
</body>
```

#### JavaScript (Script)
```html
<script src="https://cdn.jsdelivr.net/gh/Hogan-K/Drag@v2.0.0/dist/Drag.umd.js"></script>
<script>
    Drag({ main_el: document.getElementById('test') })
</script>
```


### Options
**parameter:**
- `main_el` The main element being dragged - *Element  // required*
- `trigger_el` Event-triggering element - *Element (default: `main_el`)*
- `top_boundary` Custom top boundary within the drag area - *Number (default: `0`)*
- `bottom_boundary` Custom bottom boundary within the drag area - *Number (default: `window.innerHeight`)*
- `right_boundary` Custom right boundary within the drag area - *Number (default: `window.innerWidth`)*
- `left_boundary` Custom left boundary within the drag area - *Number (default: `0`)*
