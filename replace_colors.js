const fs = require('fs');
const path = require('path');

const replacements = {
    "#75FC64": "#58CC02", // New Neon -> Old Classic
    "#5FE64F": "#46A302", // New Hover -> Old Hover
    "#49D13B": "#357B00", // New Border -> Old Border
};

function walkSync(dir, filelist = []) {
    fs.readdirSync(dir).forEach(file => {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            filelist = walkSync(filepath, filelist);
        } else {
            filelist.push(filepath);
        }
    });
    return filelist;
}

const targetFiles = walkSync(path.join(__dirname, 'src')).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

for (const file of targetFiles) {
    if (file.includes('ThemeToggle') || file.includes('theme-provider')) continue;
    
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    for (const [oldValue, newValue] of Object.entries(replacements)) {
        content = content.split(oldValue).join(newValue);
    }
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
