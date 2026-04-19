import os
import glob

# Map of old class to new class
replacements = {
    "bg-[#F0F4F8]": "bg-background",
    "bg-[#F7F7F7]": "bg-surface-hover",
    "bg-white": "bg-surface",
    "text-[#3C3C3C]": "text-foreground",
    "text-[#777777]": "text-muted",
    "text-[#AFAFBC]": "text-bold",
    "border-neutral-200": "border-border-color",
    "border-neutral-100": "border-border-color",
    "border-neutral-300": "border-border-color",
    "border-neutral-400": "text-muted",
    "border-b-neutral-200": "border-b-border-b-color",
    "bg-neutral-50": "bg-surface-hover",
    "hover:bg-neutral-50": "hover:bg-surface-hover",
    "hover:bg-[#F7F7F7]": "hover:bg-surface-hover",
    "bg-neutral-100": "bg-border-color",
    "bg-neutral-200": "bg-border-b-color",
    "hover:text-neutral-500": "hover:text-foreground",
}

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

if __name__ == "__main__":
    search_path = os.path.join("c:\\Users\\Administrator\\Documents\\LINGO FLOW APP", "src", "**", "*.tsx")
    for file in glob.glob(search_path, recursive=True):
        if "ThemeToggle" in file or "theme-provider" in file:
            continue
        replace_in_file(file)
