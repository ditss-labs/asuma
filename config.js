import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
    prefa: ['', '!', '.', ',', '🐤', '🗿'],
    owner: ['6281513607731', '447920601019'],
    thumbnail: "https://cdn.asuma.my.id/iudi983.jpg",
    name: "Asuma Bot",
    version: "2.0"
};

const init = {
    session: join(__dirname, "session"),
    customPair: "ASUMAMD"
};

export { config, init };