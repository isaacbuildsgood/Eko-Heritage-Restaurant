const fs = require('fs');
const path = require('path');

const dir = './';
const imgDir = path.join(dir, 'images');

// Ensure images directory exists
if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir);
}

const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const requiredImages = new Set();
requiredImages.add('map-placeholder.jpg (Rename your map screenshot to this)');
requiredImages.add('hero-background.jpg (The main hero background image)');
requiredImages.add('premium-dining.jpg (The Call-To-Action background image)');
requiredImages.add('glass-pattern.jpg (The blurred background pattern for reservations)');

htmlFiles.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Replace <img src="..." alt="The Name"> with <img src="./images/the-name.jpg" alt="The Name">
    content = content.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/g, (match, srcParam, altParam) => {
        let slug = altParam.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if(!slug) slug = 'default-image';
        
        const newFilename = `${slug}.jpg`;
        requiredImages.add(newFilename);
        
        return match.replace(`src="${srcParam}"`, `src="./images/${newFilename}"`);
    });
    
    // Replace inline bg styles (the map in contact.html)
    content = content.replace(/background:\s*url\('https:\/\/placehold.co\/[^']*'\)/g, "background: url('./images/map-placeholder.jpg')");

    fs.writeFileSync(path.join(dir, file), content);
});

// Fix styles.css specifically for its backgrounds
let cssPath = path.join(dir, 'styles.css');
if (fs.existsSync(cssPath)) {
    let css = fs.readFileSync(cssPath, 'utf8');
    
    // Hero bg
    css = css.replace(/url\('https:\/\/placehold.co\/[^\)]*HERO[^']*'\)/i, "url('./images/hero-background.jpg')");
    // Reservations bg
    css = css.replace(/url\('https:\/\/placehold.co\/[^\)]*PATTERN[^']*'\)/i, "url('./images/glass-pattern.jpg')");
    // Any remaining placeholders
    css = css.replace(/url\('https:\/\/placehold.co\/[^']*'\)/g, "url('./images/premium-dining.jpg')");

    fs.writeFileSync(cssPath, css);
}

// Write the cheat sheet
const readmeStr = `=== EKO HERITAGE IMAGE UPLOAD GUIDE ===\n\nTo make your website images appear, simply drag your real photos into this 'images' folder and rename them to EXACTLY match the filenames listed below. The website will automatically detect them!\n\nREQUIRED FILENAMES:\n\n` + 
Array.from(requiredImages).sort().map(img => `- ${img}`).join('\n');

fs.writeFileSync(path.join(imgDir, 'README_IMAGES.txt'), readmeStr);

console.log('Update successfully completed!');
