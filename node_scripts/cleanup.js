let fs = require('fs');

function cleanupFiles({ path }) {
  path.forEach(path => {
    //check if file exist or is a directory
    if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
      console.log(`Deleting file ${path}`);
      fs.unlinkSync(path); //delet files
    } else {
      console.log(`File ${path} does not exist or is a directory`);
    }
  });
  return;
}

console.log('Cleaning auto generated files...');

cleanupFiles({ path: ['nexus-typegen.ts', 'shema.graphql'] });

console.log('Files sucessfully cleaned');
