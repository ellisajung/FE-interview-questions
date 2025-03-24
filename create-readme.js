const fs = require('fs');
const path = require('path');

// 마크다운 파일에서 '질문' 텍스트 추출하는 함수
function extractProblemText(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // '질문' 제목 찾고, 해당 제목 아래의 텍스트를 추출
    const problemRegex = /# 질문\n([\s\S]*?)(?=\n#|\n$)/;
    const match = fileContent.match(problemRegex);
  
    if (match) {
      return match[1].trim(); // 질문 텍스트 반환
    } else {
      return '';
    }
  }

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
    grouped[folder].push(filePath); // 파일 경로를 저장
    }
});
return grouped;
}

const groupedMdFiles = getMarkdownFilesGroupedByFolder('./');
const lines = [];

lines.push('# 📚 FE 면접 질문 List');
lines.push(`- 질문들은 **'하루에 하나씩 FE 개발자 면접 문제'** 카톡 오픈채팅방에 업로드 되는 질문들로 구성되었습니다.`);
lines.push(`- 질문들은 크게 **FE, HTML&CSS, JS, React, Next.js, TS, Web, Git&Github** 으로 나누었습니다.`);
lines.push(`- 총 질문 개수: **${Object.values(groupedMdFiles).flat().length}개**`);

// 폴더 이름 기준 정렬
Object.keys(groupedMdFiles).sort().forEach(folder => {
// lines.push('<details>');
lines.push('');
// lines.push(`<summary><h2>📁 ${folder === '.' ? '루트' : folder}</h2></summary>`);
lines.push(`## 📁 ${folder === '.' ? '루트' : folder}`);
lines.push('');
lines.push('| No | 질문 |');
lines.push('| --- | --- |');

groupedMdFiles[folder].forEach((filePath, index) => {
    const problemText = extractProblemText(filePath); // 문제 텍스트 추출
    lines.push(`| ${index + 1} | ${problemText} |`);
});
// lines.push('</details>');
lines.push('');
lines.push('');
});

lines.push('---');
lines.push('> 이 README는 GitHub Actions로 자동 업데이트됩니다.');

const readmeContent = lines.join('\n');
fs.writeFileSync('README.md', readmeContent.trim());
console.log('README.md 업데이트 완료!');
