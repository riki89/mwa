const fs = require('fs');
const PDFExportor = require('pdf-export').default;
const exporter = new PDFExportor({
  host: 'localhost',
  port: 9333,
  chromeBin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  timeout: 5000,
});

module.exports.export = function (req, res) {
  let url = req.query.url;
  if (!url){
    url = "http://localhost:3100/#!/games/5fbed15c07a5894b456a434b";
  }

  let name = req.query.name+".pdf";
  if (!name){
    name = "unamedFile.pdf";
  }
  console.log("url: " + url + " \nname: " + name);
  const options = {
    url: url
  };

  exporter.export(options).then(buffer => {
    fs.writeFileSync(name, buffer);
  }).then(exporter.dispose.bind(exporter), console.log, res.status(200).send("file exported succesfully"))
  .catch(err => res.status(500).send(err));
  // res.status(200).send("file exported succesfully");
}
// main();