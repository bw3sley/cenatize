import { describe, it, expect } from 'vitest';

import { cenatizer } from "./index";

describe('cenatizer.html', () => {
  it('should remove script tags', () => {
    const unsafeHTML = `<div><script>alert("XSS")</script><a href='javascript:alert()'></a><b>Bold</b></div>`;
    const safeHTML = cenatizer.html(unsafeHTML);

    expect(safeHTML).toBe("<div><a></a><b>Bold</b></div>");
  })

  it('should remove non-allowed tags', () => {
    const unsafeHTML = `<div><marquee>Text</marquee><b>Bold</b></div>`;
    const safeHTML = cenatizer.html(unsafeHTML);
    
    expect(safeHTML).toBe("<div>Text<b>Bold</b></div>");
  })

  it('should allow valid attributes', () => {
    const unsafeHTML = `<div><a href='http://example.com' target='_blank'>Link</a></div>`;
    const safeHTML = cenatizer.html(unsafeHTML);
    
    expect(safeHTML).toBe("<div><a href=\"http://example.com\" target=\"_blank\">Link</a></div>");
  })

  it('should remove invalid attributes', () => {
    const unsafeHTML = `<div><a onclick='alert("XSS")' href='http://example.com'>Link</a></div>`;
    const safeHTML = cenatizer.html(unsafeHTML);
    
    expect(safeHTML).toBe("<div><a href=\"http://example.com\">Link</a></div>");
  })

  it('should remove attributes with invalid schemas', () => {
    const unsafeHTML = `<div><a href='javascript:alert()'>Link</a></div>`;
    const safeHTML = cenatizer.html(unsafeHTML);
    
    expect(safeHTML).toBe("<div><a>Link</a></div>");
  })

  it('should retain allowed tags and attributes', () => {
    const unsafeHTML = `<div><b style="color:red">Bold</b><img src="http://example.com/image.jpg" width="100" height="100"></div>`;
    const safeHTML = cenatizer.html(unsafeHTML);
    
    expect(safeHTML).toBe("<div><b style=\"color:red\">Bold</b><img src=\"http://example.com/image.jpg\" width=\"100\" height=\"100\"></div>");
  })

  it('should handle nested elements correctly', () => {
    const unsafeHTML = `<div><p><b>Bold <i>Italic</i></b></p></div>`;
    const safeHTML = cenatizer.html(unsafeHTML);
    
    expect(safeHTML).toBe("<div><p><b>Bold <i>Italic</i></b></p></div>");
  })

  it('should handle SVG elements correctly', () => {
    const unsafeHTML = `<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="red" /></svg>`;
    const safeHTML = cenatizer.html(unsafeHTML);
    
    expect(safeHTML).toBe("<svg width=\"100\" height=\"100\"><circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"red\"></circle></svg>");
  })
})

describe('cenatizer.js', () => {
  it('should remove script tags from JS', () => {
    const unsafeJS = `<script>alert("XSS")</script>`;
    const safeJS = cenatizer.js(unsafeJS);
    
    expect(safeJS).toBe("");
  })

  it('should retain content outside script tags', () => {
    const unsafeJS = `Some text <script>alert("XSS")</script> more text`;
    const safeJS = cenatizer.js(unsafeJS);
    
    expect(safeJS).toBe("Some text  more text");
  })

  it('should handle multiple script tags', () => {
    const unsafeJS = `<script>alert("XSS")</script><script>alert("XSS2")</script>`;
    const safeJS = cenatizer.js(unsafeJS);
    
    expect(safeJS).toBe("");
  })

  it('should handle script tags with attributes', () => {
    const unsafeJS = `<script type="text/javascript">alert("XSS")</script>`;
    const safeJS = cenatizer.js(unsafeJS);
    
    expect(safeJS).toBe("");
  })
})
