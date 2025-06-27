import { sanitizeJS } from 'sanitize-it';

const snippets = [
  'console.log("Legit");<script>alert(1)</script>',
  `const msg = "Hello";\n</script><script>stealCookies()</script>`
]

for (const code of snippets) {
  console.log('RAW JS:', code);
  console.log('CLEAN JS:', sanitizeJS(code));
  
  console.log('---');
}