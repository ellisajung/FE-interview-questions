const fs = require('fs');
const path = require('path');

function getMarkdownFilesGroupedByFolder(dir, grouped = {}) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getMarkdownFilesGroupedByFolder(filePath, grouped);
    } else if (file.endsWith('.md') && file !== 'README.md') {
      const relativePath = path.relative('.', filePath);
      const folder = path.dirname(relativePath);
      if (!grouped[folder]) grouped[folder] = [];
      grouped[folder].push(path.basename(filePath));
    }
  });
  return grouped;
}

const groupedMdFiles = getMarkdownFilesGroupedByFolder('./');
const lines = [];

lines.push('# 📚 FE 면접 질문 List');
// lines.push('');
// lines.push(`- 총 Markdown 파일 개수: **${Object.values(groupedMdFiles).flat().length}개**`);
// lines.push('');
// lines.push('## 📂 폴더별 목록');
// lines.push('');

// 폴더 이름 기준 정렬
Object.keys(groupedMdFiles).sort().forEach(folder => {
  lines.push(`### 📁 ${folder === '.' ? '루트' : folder}`);
  lines.push('');
  lines.push('| No | 파일명 |');
  lines.push('| --- | --- |');

  groupedMdFiles[folder].forEach((file, index) => {
    lines.push(`| ${index + 1} | ${file} |`);
  });
  lines.push('');
});

lines.push('---');
lines.push('> 이 README는 GitHub Actions로 자동 업데이트됩니다.');

const readmeContent = lines.join('\n');
fs.writeFileSync('README.md', readmeContent.trim());
console.log('README.md 업데이트 완료!');
