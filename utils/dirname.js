// utils/dirname.js

import fs from 'fs';
import path from 'path';

let __filename, __dirname;

if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'test') {
  __filename = path.resolve(path.dirname(''), 'index.js'); // Ajuste conforme necessário
  __dirname = path.dirname(__filename);
} else {
  // fallback para Jest ou testes: use __filename e __dirname comuns
  __filename = path.resolve('index.js');
  __dirname = process.cwd(); // raiz do projeto
}

export { __filename, __dirname };
