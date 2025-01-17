# ShieldJS

ShieldJS is a library to sanitize HTML and JavaScript to prevent XSS attacks.

## Usage

To start using the library install it in your project:

```bash
npm instal shieldjs
```

Import and use the `sanitizeHTML` and `sanitizeJS` functions to sanitize your HTML and JavaScript content.

```js
import { sanitizeHTML, sanitizeJS } from "shieldjs";

// Sanitize HTML content
const unsafeHTML = `<div><script>alert("XSS")</script><b>Bold</b></div>`;
const safeHTML = sanitizeHTML(unsafeHTML);

console.log(safeHTML); // Output> <div><b>Bold</b></div>

// Sanitize JavaScript content
const unsafeJS = `<script>alert("XSS")</script>`;
const safeJS = sanitizeJS(unsafeJS);
console.log(safeJS); // Output: (empty string)
```

## Allowed tags and attributes

### Tags

ShieldJS allows the following HTML and SVG tags:

`a, abbr, b, blockquote, body, br, center, code, dd, div, dl, dt, em, font,
h1, h2, h3, h4, h5, h6, hr, i, img, label, li, ol, p, pre,
small, source, span, strong, sub, sup, table, tbody, tr, td, th, thead, ul, u, video,
svg, circle, ellipse, line, path, polygon, polyline, rect, text, g`

### Attributes

The following attributes area allowed for each tag:

`* (all tags): align, color, controls, height, href, id, src, style, target, title, type, width
a: href, target
img: src, alt, title, width, height
video: src, controls, width, height
svg: width, height, viewBox
circle: cx, cy, r, fill
rect: x, y, width, height, fill
line: x1, y1, x2, y2, stroke
path: d, fill
polygon: points, fill
polyline: points, fill
text: x, y, fill
g: (no specific attributes)`

### CSS properties

Only the following CSS properties are allowed in the `style` attribute:

`color, background-color, font-size, font-weight, text-align, text-decoration, width, height, margin, padding, border, border-radius`

## Features

- Remove dangerous tags like `<script>`.
- Retains valid HTML tags and attributes.
- Sanitize CSS properties to allow only safe styles.
- Supports sanitization of SVG elements.

## Contributions and feedback

We :purple_heart: contributions and feedback.

If you have any questions or suggestions, [create an issue](https://github.com/bw3sley/shieldjs/issues/new).

Bug reports should always be done with a [new issue](https://github.com/bw3sley/shieldjs/issues/new).

## License

ShieldJS is shared under the [MIT license](https://github.com/bw3sley/shieldjs/blob/master/LICENSE.md). This means you can modify and use it however you want, even for commercial use. But please give this GitHub repo a :star:.