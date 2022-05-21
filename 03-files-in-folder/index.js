const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'),{withFileTypes: true}, (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
          if(!file.isDirectory()) {
            const link = path.join(__dirname, 'secret-folder', file.name)
            fs.stat(link, (err, stats) => {
                if (err) {
                    console.log(err);
                } else {
                    const name = path.basename(path.join(__dirname, 'secret-folder', file.name), path.extname(link));
                    const ext= path.extname(link).split('.');
                    const extname = ext[1];
                    const size = stats.size*0.001;

                    console.log(`${name} - ${extname} - ${size}kb`)
                }
            })
          }
      })
    }
})