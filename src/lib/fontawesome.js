// lib/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';

// Disable auto-adding CSS since we'll add it manually in Next.js
config.autoAddCss = false;

library.add(faCheckSquare, faCoffee);
