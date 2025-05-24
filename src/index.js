import { JSDOM } from "jsdom";

const allowedTags = [
  "a", "abbr", "b", "blockquote", "body", "br", "center", "code", "dd", "div", "dl", "dt", "em", "font",
  "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "label", "li", "ol", "p", "pre",
  "small", "source", "span", "strong", "sub", "sup", "table", "tbody", "tr", "td", "th", "thead", "ul", "u", "video",
  "svg", "circle", "ellipse", "line", "path", "polygon", "polyline", "rect", "text", "g"
]

const allowedAttributes = {
  "*": ["align", "color", "controls", "height", "href", "id", "src", "style", "target", "title", "type", "width"],
  "a": ["href", "target"],
  "img": ["src", "alt", "title", "width", "height"],
  "video": ["src", "controls", "width", "height"],
  "svg": ["width", "height", "viewBox"],
  "circle": ["cx", "cy", "r", "fill"],
  "rect": ["x", "y", "width", "height", "fill"],
  "line": ["x1", "y1", "x2", "y2", "stroke"],
  "path": ["d", "fill"],
  "polygon": ["points", "fill"],
  "polyline": ["points", "fill"],
  "text": ["x", "y", "fill"],
  "g": []
}

const allowedSchemas = ["http:", "https:", "data:", "m-files:", "file:", "ftp:", "mailto:", "pw:"];

const voidElements = [
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"
]

function sanitizeHTML(input) {
  const dom = new JSDOM(`<div id="__sanitize_root__">${input}</div>`);
  
  const doc = dom.window.document;
  
  const root = doc.getElementById("__sanitize_root__");
  
  let html = "";
  
  for (const child of root.childNodes) {
    html += nodeToString(child, dom);
  }
  
  return html;
}

function nodeToString(node, dom) {
  const { Node } = dom.window;

  if (node.nodeType === Node.TEXT_NODE) {
    return node.nodeValue;
  }
  
  if (node.nodeType === Node.ELEMENT_NODE) {
    const tag = node.tagName.toLowerCase();
  
    if (tag === "script") return "";
  
    if (!allowedTags.includes(tag)) {
      let out = "";
  
      for (const child of node.childNodes) {
        out += nodeToString(child, dom);
      }
  
      return out;
    }
  
    let out = `<${tag}`;
  
    for (const { name, value } of node.attributes) {
      const attr = name.toLowerCase();
  
      const okGlobal = allowedAttributes["*"].includes(attr);
      const okTag = (allowedAttributes[tag] || []).includes(attr);
  
      if (!okGlobal && !okTag) continue;
  
      if (["href", "src", "action"].includes(attr)) {
        try {
          const url = new URL(value, "http://example.com");
          
          if (!allowedSchemas.includes(url.protocol)) continue;
        } 
        
        catch {
          continue;
        }
      }
      
      const escaped = value.replace(/"/g, "&quot;");
      
      out += ` ${name}="${escaped}"`;
    }
    
    out += ">";
    
    if (voidElements.includes(tag)) {
      return out;
    }
    
    for (const child of node.childNodes) {
      out += nodeToString(child, dom);
    }

    out += `</${tag}>`;

    return out;
  }

  return "";
}

function sanitizeJS(input) {
  return input.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
}

export const cenatizer = { html: sanitizeHTML, js: sanitizeJS }