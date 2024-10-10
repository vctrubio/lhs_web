// lib/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRulerCombined, faBed, faMapMarkerAlt, faBath } from '@fortawesome/free-solid-svg-icons'; // Import icons

// Disable auto-adding CSS since we'll add it manually in Next.js
config.autoAddCss = false;

library.add(faCheckSquare, faCoffee);


export const iconCheckSquare = faCheckSquare;
export const iconCoffee = faCoffee;
export const iconRulerCombined = faRulerCombined;
export const iconBed = faBed;
export const iconMapMarkerAlt = faMapMarkerAlt;
export const iconBath = faBath;