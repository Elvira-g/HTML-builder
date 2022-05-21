const fs = require('fs');
const path = require('path');

fs.access(path.join(__dirname, 'files-copy'), function(err) {
  if (err && err.code === 'ENOENT') {
    fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
      if (err) {
        return console.error(err);
      }
    });
    fs.readdir(path.join(__dirname, 'files'), (err, files) => {
      if (err)
        console.log(err);
      else {
        files.forEach(file => {
          fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (err) => {
            if (err) throw err;
          });
        })
      }
    })
  } else {
    fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
      if (err) {
        console.log(err);
      } else {
        files.forEach(file => {
          fs.unlink(path.join(__dirname, 'files-copy', file), (err) => {
            if (err) throw err;
          });
        })
      }
    })
    fs.readdir(path.join(__dirname, 'files'), (err, files) => {
      if (err) {
        console.log(err);
      } else {
        files.forEach(file => {
          fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (err) => {
          if (err) throw err;
          });
        })
      }
    })
  }
})

   