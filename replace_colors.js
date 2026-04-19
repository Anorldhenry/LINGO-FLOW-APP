const fs = require('fs');
const path = require('path');

const replacements = {
    "#1CB0F6": "#58CC02", // Sky Blue -> Lingo Green
    "#1899D6": "#46A302", // Darker Blue -> Darker Green
    "#1483C2": "#357B00", // Darkest Blue -> Darkest Green
    "text-[#1CB0F6]": "text-primary",
    "bg-[#1CB0F6]": "bg-primary",
    "hover:bg-[#1899D6]": "hover:bg-primary-hover",
    "border-[#1CB0F6]": "border-primary",
    "border-[#1483C2]": "border-primary-border",
    "hover:border-[#1CB0F6]": "hover:border-primary",
    "focus:border-[#1CB0F6]": "focus:border-primary",
    "group-hover:text-[#1CB0F6]": "group-hover:text-primary"
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

const targetFiles = walkSync(path.join(__dirname, 'src')).filter(f => f.endsWith('.tsx'));

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
