import json
import re

with open(r'c:\Users\Administrator\Documents\LINGO FLOW APP\src\lib\lesson-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Try to extract the LESSON_BANKS object roughly using regex or just look for lines with answer: 'X' where X is in question
lines = content.split('\n')
errors = []

for i, line in enumerate(lines):
    if 'answer:' in line:
        # Extract the question content (inside Match/Translate/meaning)
        # e.g. question: 'Match the meaning: "Enjuba"'
        q_match = re.search(r'question:\s*[\'"](.*?Match the meaning: [\'"](.*??)[\'"]|.*?Match: [\'"](.*??)[\'"]|.*?Select the translation for: [\'"](.*??)[\'"])[\'"]', line)
        a_match = re.search(r'answer:\s*[\'"](.*?)[\'"]', line)
        
        if q_match and a_match:
            question_word = q_match.group(2) or q_match.group(3) or q_match.group(4)
            answer_word = a_match.group(1)
            
            if question_word == answer_word:
                errors.append((i + 1, line.strip()))

print("Potential 'Self-Answer' errors (Question word == Answer):")
for line_num, text in errors:
    print(f"Line {line_num}: {text}")
