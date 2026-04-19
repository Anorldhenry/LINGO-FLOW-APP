const fs = require('fs');
const path = require('path');

const replacements = {
    "#CE82FF": "#58CC02", // Primary Purple -> Lingo Green
    "#9F56D2": "#46A302", // Darker Purple -> Darker Green
    "#7B3FAF": "#357B00", // Darkest Purple -> Darkest Green
    "from-[#1a1a2e] via-[#16213e] to-[#0f3460]": "bg-background",
    "text-white mb-2": "text-foreground mb-2",
    "text-white/50": "text-muted",
    "bg-white/10": "bg-surface",
    "text-white/40": "text-bold",
    "text-white/30": "text-bold",
    "text-white border-2 border-white/10": "text-foreground border-2 border-border-color",
    "focus:bg-white/10": "focus:bg-surface",
    "placeholder:text-white/20": "placeholder:text-muted",
    "bg-[#EA2B2B]/20 text-[#FF6B6B] border-[#EA2B2B]/30": "bg-error-bg text-[#EA2B2B] border-error-bg"
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

const targetFiles = walkSync(path.join(__dirname, 'src/app/admin')).filter(f => f.endsWith('.tsx'));

for (const file of targetFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    for (const [oldValue, newValue] of Object.entries(replacements)) {
        content = content.split(oldValue).join(newValue);
    }
    
    // special fixes for admin login page bg-classes
    if (file.includes('login') && file.includes('page.tsx')) {
       content = content.replace("bg-gradient-to-br bg-background flex", "bg-background flex flex-col");
       content = content.replace("bg-white/5", "bg-surface-hover");
       content = content.replace("shadow-lg shadow-[#58CC02]/20", "shadow-sm");
       
       // Add ThemeToggle import if not exists
       if (!content.includes('ThemeToggle')) {
           content = content.replace("import { createClient }", "import { createClient }\nimport { ThemeToggle } from '@/components/ThemeToggle'\nimport Link from 'next/link'");
           content = content.replace("import { ShieldAlert, Loader2, Lock, User }", "import { ShieldAlert, Loader2, Lock, User, ArrowLeft }");
       }
       
       // Add theme toggle header
       if (!content.includes('<header')) {
           content = content.replace(
              `<div className="fixed inset-0`, 
              `{/* Top Header */}\n      <header className="h-16 flex items-center justify-between px-6 absolute top-0 w-full z-50">\n        <Link href="/" className="text-bold hover:text-foreground transition-colors">\n          <ArrowLeft className="h-6 w-6" />\n        </Link>\n        <ThemeToggle />\n      </header>\n\n      <div className="fixed inset-0`
           );
       }

       // remove the text-white from the login button
       content = content.replace("text-white rounded-2xl", "text-white rounded-2xl");
    }
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
