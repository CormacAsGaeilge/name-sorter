const fs = require('fs');
const path = require('path');

// Path to your names file
const filePath = path.join(__dirname, 'src', 'names.ts');

try {
    console.log(`Reading ${filePath}...`);
    const data = fs.readFileSync(filePath, 'utf8');

    // 1. Extract the array content using Regex
    // Looks for: export const names: string[] = [ ... ];
    const match = data.match(/export const names: string\[\] = \[([\s\S]*)\]/);

    if (!match) {
        console.error("❌ Error: Could not find 'export const names' array in src/names.ts");
        process.exit(1);
    }

    // 2. Parse the names
    // This Regex finds all strings inside double quotes
    const rawNames = match[1].match(/"([^"]+)"/g);

    if (!rawNames) {
        console.error("❌ Error: No names found inside the array.");
        process.exit(1);
    }

    // Clean quotes off the strings
    const cleanNames = rawNames.map(s => s.replace(/"/g, ''));

    // 3. Filter the names
    // Keep only names where length is >= 3 AND <= 10
    const filteredNames = cleanNames.filter(name => {
        return name.length >= 3 && name.length <= 10;
    }).map(name => name.toUpperCase());

    console.log(`\n--- Results ---`);
    console.log(`Original Count: ${cleanNames.length}`);
    console.log(`Filtered Count: ${filteredNames.length}`);
    console.log(`Removed: ${cleanNames.length - filteredNames.length} names`);

    // 4. Reconstruct the file content
    // We rebuild the TypeScript file structure
    const newContent = `export const names: string[] = [\n  "${filteredNames.join('",\n  "')}"\n];\n`;

    // 5. Write back to file
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`\n✅ Success! src/names.ts has been updated.`);

} catch (err) {
    console.error("❌ An error occurred:", err.message);
}