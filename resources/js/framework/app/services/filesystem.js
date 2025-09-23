const fs = require('fs');
const path = require('path'); // For path manipulation

const appDirectory = path.resolve(__dirname, 'resources/framework/app'); // Replace with your folder path

export const folders = (parent) => {
  try {
    const items = fs.readdirSync(`${appDirectory}/${parent}`, { withFileTypes: true }); // Read directory contents

    const folders = items
      .filter(item => item.isDirectory()) // Filter for directories
      .map(item => item.name); // Extract folder names

    console.log('Folders in the directory:', folders);
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}