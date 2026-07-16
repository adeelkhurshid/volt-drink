const fs = require('fs');

['index.html', 'collections.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<video class="products-video-bg" autoplay loop muted playsinline src="Blue_ice_freezing_and_melting_202607162155\.mp4"><\/video>\n?\s*/g, '');
    fs.writeFileSync(file, content);
});

let css = fs.readFileSync('css/products.css', 'utf8');
css = css.replace(/\.products-section \{\s*position: relative;\s*padding: 120px 0;\s*background: transparent;\s*overflow: hidden;\s*\}/g, '.products-section {\n    padding: 120px 0;\n    background: var(--color-black);\n}');
css = css.replace(/\.products-video-bg \{[\s\S]*?\}\n?/g, '');
fs.writeFileSync('css/products.css', css);

console.log("Cleanup complete.");
