import fs from 'fs';
import path from 'path';
import __dirname from './dirnam.js';

export default function writeToJson (db, data) {
  fs.writeFile(path.join(__dirname, `../database/${db}.json`), JSON.stringify(data), (err) => {
    if (err) {
      console.err(err);
      return null;
    }

    console.log(`Successfully wrote to ${db}.json!`);
    return true;
  });
}
