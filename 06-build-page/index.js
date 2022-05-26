const fs = require('fs');
const path = require('path');
let style;


fs.access(path.join(__dirname, 'project-dist'), function(err) {
  if (err && err.code === 'ENOENT') {
    fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
      if (err) throw err;
      fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'), (err) => {
        if (err) throw err;
        fs.readFile(path.join(__dirname, 'project-dist', 'index.html'), (err,data) => {
          if (err) throw err;
          let index = data.toString();
          let replacement;
          fs.readdir(path.join(__dirname, 'components'), (err, files) => {
            if (err) throw err;
            files.forEach(file => {
            fs.readFile(path.join(__dirname, 'components', file), (err,rep) =>{
                replacement = rep.toString();
                index = index.replace(`{{${file.split('.')[0]}}}`, replacement);
                fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), index, 'utf8', function (err) {
                  if (err) return console.log(err);
                });
              })
            })
          })
        });
      });
      fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
        if (err) throw err;
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
                              path.join(__dirname, 'project-dist', 'style.css'),
                              style,
                              err => {
                                  if (err) throw err;
                              }
                          ); 
                      }
                  } 
              });
            })
          }
        })
      });
      fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), (err) => {
        if (err) throw err;
        fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (err, assets) => {
          if (err) throw err;
          assets.forEach((asset) => {
            if ( asset.isDirectory() ) {
              fs.mkdir(path.join(__dirname, 'project-dist', 'assets', asset.name), (err) => {
                fs.readdir(path.join(__dirname, 'assets', asset.name), (err, docs) => {
                  if (err) throw err;
                  docs.forEach((doc) => {
                    fs.copyFile(path.join(__dirname, 'assets', asset.name, doc), path.join(__dirname, 'project-dist', 'assets', asset.name, doc), (err) => {
                      if (err) throw err;
                    })
                  })
                })
              })
              
            } else {
              fs.copyFile(path.join(__dirname, 'assets', asset.name), path.join(__dirname, 'project-dist', 'assets', asset.name), (err) => {
                if (err) throw err;
              })
            }
          })
        })
      })
    })
  } else {
    fs.unlink(path.join(__dirname, 'project-dist', 'style.css'), (err) => {
      if (err) throw err;
      fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
        if (err) throw err;
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
                              path.join(__dirname, 'project-dist', 'style.css'),
                              style,
                              err => {
                                  if (err) throw err;
                              }
                          ); 
                      }
                  } 
              });
            })
          }
        })
      });
    })
    fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'), (err) => {
      if (err) throw err;
      fs.readFile(path.join(__dirname, 'project-dist', 'index.html'), (err,data) => {
        if (err) throw err;
        let index = data.toString();
        let replacement;
        fs.readdir(path.join(__dirname, 'components'), (err, files) => {
          if (err) throw err;
          files.forEach(file => {
          fs.readFile(path.join(__dirname, 'components', file), (err,rep) =>{
              replacement = rep.toString();
              index = index.replace(`{{${file.split('.')[0]}}}`, replacement);
              fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), index, 'utf8', function (err) {
                if (err) return console.log(err);
              });
            })
          })
        })
      });
    });
    changeAssets(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'))
    
    async function changeAssets(fromPath, toPath) {
      await fs.promises.rm(toPath, { force: true, recursive: true }, (err) => {
        if (err) throw err;
      });
    
      copyAssets(fromPath, toPath);
    }
    
    async function copyAssets(origin, copy) {
      await fs.promises.mkdir(copy, { recursive: true }, (err) => {
        if (err) throw err;
      });
    
      const allAssets = await fs.promises.readdir(origin, (err) => {
        if (err) throw err;
      });
    
      for (let asset of allAssets) {
        let folder = await fs.promises.stat(path.join(origin, asset.toString()));
    
        if (folder.isDirectory()) {
          await copyAssets(path.join(origin, asset.toString()), path.join(copy, asset.toString()));
        } else {
          await fs.promises.copyFile(path.join(origin, asset.toString()), path.join(copy, asset.toString()));
        }
      }
    }
    
  }
})