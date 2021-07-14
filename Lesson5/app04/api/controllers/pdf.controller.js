const fs = require('fs');
const PDFExportor = require('pdf-export').default;
const exporter = new PDFExportor({
  host: 'localhost',
  port: 9333,
  chromeBin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  timeout: 5000,
});
 
function main() {
    exporter.export(url => 'http://localhost:3100/#!/games/5fbed15c07a5894b456a434b').then(buffer => {
      fs.writeFileSync('test1.pdf', buffer);
    }).then(exporter.dispose.bind(exporter), console.log);
}
main();