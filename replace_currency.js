const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('e:\\ffsd\\23_Xploreo\\front_end', function(filePath) {
    if (filePath.endsWith('.js') || filePath.endsWith('.html') || filePath.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content
            .replace(/\$(?=\d)/g, '₹')           // $ followed by a digit
            .replace(/\$\$\{/g, '₹${')         // $${
            .replace(/\(\$\)/g, '(₹)')           // ($)
            .replace(/\(\$\$\)/g, '(₹₹)')        // ($$)
            .replace(/\(\$\$\$\)/g, '(₹₹₹)')     // ($$$)
            .replace(/Budget \(\$\)/g, 'Budget (₹)')
            .replace(/Moderate \(\$\$\)/g, 'Moderate (₹₹)')
            .replace(/Luxury \(\$\$\$\)/g, 'Luxury (₹₹₹)')
            .replace(/Price per Night \(\$\)/g, 'Price per Night (₹)');

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    }
});
