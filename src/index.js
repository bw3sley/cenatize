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

export function sanitizeHTML(input) {
    const hasBody = input.includes("<body>");

    const param = hasBody ? input : `<div>${input}</div>`; 

    const dom = new JSDOM(param);

    const doc = dom.window.document;

    const root = hasBody ? doc.body : doc.body.firstChild;

    const tags = root.getElementsByTagName("*");

    for (let counter = 0; counter < tags.length; counter++) {
        const tag = tags[counter];

        if (tag.nodeName.toLowerCase() === "script") {
            tag.parentNode.removeChild(tag);

            counter--;
        }

        else if (!allowedTags.includes(tag.nodeName.toLowerCase())) {
            while (tag.firstChild) {
                tag.parentNode.insertBefore(tag.firstChild, tag);
            }

            tag.parentNode.removeChild(tag);

            counter--;
        }

        else {
            const attributes = tag.attributes;

            for (let _counter = attributes.length - 1; _counter >= 0; _counter--) {
                const attr = attributes[_counter];

                const tagName = tag.nodeName.toLowerCase();
                const attrName = attr.name.toLowerCase();
                const attrValue = attr.value.toLowerCase();

                if (!allowedAttributes["*"].includes(attrName) && !(allowedAttributes[tagName] && allowedAttributes[tagName].includes(attrName))) {
                    tag.removeAttribute(attrName);
                }

                else if (["href", "src", "action"].includes(attrName)) {
                    const url = new URL(attrValue, "http://example.com");

                    if (!allowedSchemas.includes(url.protocol)) {
                        tag.removeAttribute(attrName);
                    }
                }
            }
        }
    }

    return hasBody ? root.outerHTML : root.innerHTML;
}

export function sanitizeJS(input) {
    return input.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "");
}