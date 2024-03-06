const names = require('./04-names');
const song = require('./05-utils');
const alternativeFlavor = require('./06-alternative-flavor');
require('./07-mind-grenade')

console.log(names);
song(names.farmerName);
console.log(alternativeFlavor.singAnimalVerse(names.farmAnimals, names.farmerName));
