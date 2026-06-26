const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('c:/Users/John/Desktop/Rentflow/client/src');
let modifiedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Split content by lines to manually remove Authorization lines
  const lines = content.split('\n');
  const newLines = lines.filter(line => !line.includes('Authorization: `Bearer'));
  
  content = newLines.join('\n');
  
  // Clean up empty headers
  content = content.replace(/headers:\s*\{\s*\}\,?/g, '');
  content = content.replace(/,\s*\{\s*\}\s*\)/g, ')');
  content = content.replace(/\{\s*\}\s*,/g, '');

  if (content !== original) {
    fs.writeFileSync(file, content);
    modifiedFiles++;
    console.log('Modified:', file);
  }
});

console.log('Total files modified:', modifiedFiles);
