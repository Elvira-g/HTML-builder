const fs = require('fs');
const path = require('path');
const rimraf = require("rimraf");
let style;

fs.access(path.join(__dirname, 'project-dist'), function(err) {
    if (err && err.code === 'ENOENT') {
      fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
        if (err) {
          return console.error(err);
        }
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), (err) => {
          if (err) {
            return console.error(err);
          }
          fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (err, files) => {
            if (err) {
              console.log(err);
            } else {
              files.forEach(file => {
                if ( file.isDirectory() ) {
                  fs.mkdir(path.join(__dirname, 'project-dist', 'assets', file.name), (err) => {
                    if (err) {
                      return console.error(err);
                    }
                  });
                  fs.readdir(path.join(__dirname, 'assets', file.name), (err, docs) => {
                    if (err) {
                      console.log(err);
                    } else {
                      docs.forEach(doc => {
                        fs.copyFile(path.join(__dirname, 'assets', file.name, doc), path.join(__dirname, 'project-dist', 'assets', file.name, doc), (err) => {
                          if (err) throw err;
                        });
                      })
                    }
                  })
                } else {
                  fs.copyFile(path.join(__dirname, 'assets', file.name), path.join(__dirname, 'project-dist', 'assets', file.name), (err) => {
                    if (err) throw err;
                  });
                }
              })
            }
          })
        });
        fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'), (err) => {
          if (err) throw err;
        })
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
        fs.writeFile(
          path.join(__dirname, 'project-dist', 'style.css'),
          '',
          (err) => {
              if (err) throw err;
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
    } else {
      rimraf(path.join(__dirname, 'project-dist'), (err) => {
        if (err) throw err;
        fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
          if (err) {
            return console.error(err);
          }
          fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), (err) => {
            if (err) {
              return console.error(err);
            }
            fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (err, files) => {
              if (err) {
                console.log(err);
              } else {
                files.forEach(file => {
                  if ( file.isDirectory() ) {
                    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', file.name), (err) => {
                      if (err) {
                        return console.error(err);
                      }
                    });
                    fs.readdir(path.join(__dirname, 'assets', file.name), (err, docs) => {
                      if (err) {
                        console.log(err);
                      } else {
                        docs.forEach(doc => {
                          fs.copyFile(path.join(__dirname, 'assets', file.name, doc), path.join(__dirname, 'project-dist', 'assets', file.name, doc), (err) => {
                            if (err) throw err;
                          });
                        })
                      }
                    })
                  } else {
                    fs.copyFile(path.join(__dirname, 'assets', file.name), path.join(__dirname, 'project-dist', 'assets', file.name), (err) => {
                      if (err) throw err;
                    });
                  }
                })
              }
            })
          });
          fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'), (err) => {
            if (err) throw err;
          })
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
          fs.writeFile(
            path.join(__dirname, 'project-dist', 'style.css'),
            '',
            (err) => {
                if (err) throw err;
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
  }
})