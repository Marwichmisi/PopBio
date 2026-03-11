sed -i 's/2 bios en francais puis 2 bios en anglais/1 bio en francais et 1 bio en anglais/g' src/lib/gemini.ts
sed -i 's/4 bios - moins de/2 bios - moins de/g' src/lib/gemini.ts
sed -i 's/(4 bios)/(2 bios)/g' src/lib/gemini.ts
sed -i 's/"twitter": \[.*\]/"twitter": ["bio1_fr", "bio2_en"]/g' src/lib/gemini.ts
sed -i 's/"linkedin": \[.*\]/"linkedin": ["bio1_fr", "bio2_en"]/g' src/lib/gemini.ts
sed -i 's/twitter.length !== 4 || linkedin.length !== 4/twitter.length !== 2 || linkedin.length !== 2/g' src/lib/gemini.ts
