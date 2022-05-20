const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit, beforeExit } = process;

stdout.write('Введите текст\n');
fs.writeFile(
    path.join(__dirname, 'file.txt'),
    '',
    (err) => {
        if (err) throw err;
    });
stdin.on('data', data => {
    if ( data.toString().trim() === 'exit' ) {
        process.exit();
    }
        fs.appendFile(
            path.join(__dirname, 'file.txt'),
            data,
            err => {
                if (err) throw err;
                console.log('Текст записан. Продолжайте');
                
            }
        );
})

process.on('exit', () => stdout.write('Конец. Пока!\n'));
process.on('SIGINT', function() {
    process.exit();
});
