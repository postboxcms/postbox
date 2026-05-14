const fs = require('fs');

fs.readdir('./', (err, folders) => {
    console.log("theme assignment started");
    folders.forEach(folder => {
        console.log("Theme name:", folder);
    })
});
