import { sanitizeHTML } from 'sanitize-it';

const snippets = [
  '<img src="x" onerror="alert(1)"><span>Safe</span>',
  '<a href="javascript:alert(2)">Click me</a>',
  '<svg width="50" height="50"><circle cx="25" cy="25" r="20" fill="blue" onload="hack()"/></svg>'
]

for (const html of snippets) {
  console.log('RAW:', html);
  console.log('CLEAN:', sanitizeHTML(html));
  console.log('---');
}