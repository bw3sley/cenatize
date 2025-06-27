import {  } from 'cenatizer';

const complexHTML = `
  <a href="ftp://fileserver/archive.zip">Download</a>
  <a href="javascript:steal()">Nope</a>
  <img src="data:image/png;base64,iVBORw0KGgo..." onclick="bad()" />
  <svg viewBox="0 0 10 10"><rect x="1" y="1" width="8" height="8" fill="green" onload="hack()"/></svg>
`;

console.log('CLEAN HTML:\n', sanitizeHTML(complexHTML));

const complexJS = `
  const msg = \`Date: \${new Date().toLocaleDateString("en-US")}\`;
  console.log(msg);
  </script><script>sideEffect()</script>
`;

console.log('CLEAN JS:\n', sanitizeJS(complexJS));
