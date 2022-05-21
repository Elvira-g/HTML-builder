const fs = require('fs');
const path = require('path');
let style;

fs.writeFile(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    '',
    (err) => {
        if (err) throw err;
        console.log('Файл был создан');
    }
);

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach(file => {
        fs.readFile(path.join(__dirname, 'styles', file), (err, data) => {
            if (err) {
                console.log(err);
            } else {
                style = data.toString();
                const ext = path.extname(path.join(__dirname, 'styles', file));
                if ( ext == '.css' ) {
                    fs.appendFile(
                        path.join(__dirname, 'project-dist', 'bundle.css'),
                        style,
                        err => {
                            if (err) throw err;
                            console.log('Стили добавлены');
                        }
                    ); 
                }
            } 
        });
      })
    }
  })