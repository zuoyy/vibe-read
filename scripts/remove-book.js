const fs = require('fs');
const path = require('path');

const bookId = process.argv[2];

if (!bookId) {
    console.error('Please provide a book ID. Usage: node scripts/remove-book.js <book-id>');
    process.exit(1);
}

const rootDir = path.resolve(__dirname, '..');

// Paths to remove
const pathsToRemove = [
    path.join(rootDir, 'app/[locale]', bookId),
    path.join(rootDir, 'app/components', bookId),
    path.join(rootDir, 'messages/en', `${bookId}.json`),
    path.join(rootDir, 'messages/zh', `${bookId}.json`),
    path.join(rootDir, 'messages/en', `${bookId}.ts`), // Just in case
    path.join(rootDir, 'messages/zh', `${bookId}.ts`)  // Just in case
];

// 1. Remove Files/Directories
console.log(`\nRemoving files for: ${bookId}...`);
pathsToRemove.forEach(p => {
    // Handle specific [locale] path pattern manually or just standard path
    // Since 'app/[locale]' is a literal directory name in Next.js app router if using dynamic routes,
    // but here it seems the directory IS literally named '[locale]'.
    // Let's check if it exists.

    // Actually, in the project structure, it is app/[locale] literal.

    if (fs.existsSync(p)) {
        const stats = fs.statSync(p);
        if (stats.isDirectory()) {
            fs.rmSync(p, { recursive: true, force: true });
            console.log(`✅ Deleted directory: ${path.relative(rootDir, p)}`);
        } else {
            fs.unlinkSync(p);
            console.log(`✅ Deleted file: ${path.relative(rootDir, p)}`);
        }
    } else {
        // console.log(`⚪ Not found: ${path.relative(rootDir, p)}`);
    }
});

// 2. Update code references
console.log(`\nUpdating code references...`);

// Helper to update file content
function updateFile(filePath, updateFn) {
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf8');
    const newContent = updateFn(content);
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✅ Updated: ${path.relative(rootDir, filePath)}`);
    } else {
        console.log(`⚪ No changes needed in: ${path.relative(rootDir, filePath)}`);
    }
}

// Update app/[locale]/page.tsx
const pageTsxPath = path.join(rootDir, 'app/[locale]/page.tsx');
updateFile(pageTsxPath, (content) => {
    let newContent = content;

    // Regex to find the import variable name
    // import { newBook as aiEraGuide } from '@/app/components/ai-era-guide'
    const importRegex = new RegExp(`import\\s+\\{\\s*newBook\\s+as\\s+(\\w+)\\s+\\}\\s+from\\s+['"]@/app/components/${bookId}['"]`, 'g');

    let varName;
    newContent = newContent.replace(importRegex, (match, capturedVar) => {
        varName = capturedVar;
        return ''; // Remove import line
    });

    if (varName) {
        console.log(`   Found variable name: ${varName}`);
        // Remove from library array
        // const library: BookProject[] = [ ..., varName, ... ]
        // Multiline support is tricky. We'll try to find the variaable inside the array.
        // Simple approach: remove the line containing the variable if it looks like an array element
        const arrayElementRegex = new RegExp(`\\s*${varName},?`, 'g');
        newContent = newContent.replace(arrayElementRegex, '');
    }

    // Also remove any mock book definition if it was defined inline like:
    // const varName: BookProject = { ... id: 'bookId' ... }
    // This is harder to regex safely for inline objects. 
    // But based on current structure, imports are used.

    // Clean up empty lines created
    newContent = newContent.replace(/^\s*[\r\n]/gm, '');

    return newContent;
});

// Update i18n/request.ts
const i18nPath = path.join(rootDir, 'i18n/request.ts');
updateFile(i18nPath, (content) => {
    let newContent = content;

    // Remove lines containing the bookId string key or json path
    // 'ai-era-guide': aiEraGuideMessages,
    // or
    // 'design-zen': (await import(...)).default,

    const lines = newContent.split('\n');
    const filteredLines = lines.filter(line => {
        if (line.includes(`'${bookId}':`) || line.includes(`"${bookId}":`) || line.includes(`/${bookId}.json`)) {
            return false;
        }
        return true;
    });

    return filteredLines.join('\n');
});

console.log(`\nDone.`);
