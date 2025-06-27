import { sanitizeHTML, sanitizeJS } from 'cenatize';

const html = `<ul><li>Item</li><script>attack()</script></ul>`;

console.log(sanitizeHTML(html));

const js = `console.log("OK");</script><script>oops()</script>`;

console.log(sanitizeJS(js));
