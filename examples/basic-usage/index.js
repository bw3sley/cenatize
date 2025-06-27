import { sanitizeHTML, sanitizeJS } from 'sanitize-it';

const rawHTML = '<script>alert("XSS")</script><p>Hello World!</p>';

console.log(sanitizeHTML(rawHTML));

const rawJS = 'console.log("Hi there");<script>evil()</script>';

console.log(sanitizeJS(rawJS));