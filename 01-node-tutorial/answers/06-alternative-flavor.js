
function singSounds(sound) {
    let soundsVerse = `With a ${sound}-${sound} here and a ${sound}-${sound} there,\n`;
    soundsVerse += `Here a ${sound}, there a ${sound}, everywhere a ${sound}-${sound},\n`;
    return soundsVerse;
}


module.exports.singAnimalVerse = function singAnimalVerse(animals, farmerName) {
    let verse = '';
    animals.forEach(animal => {
        verse += `And on that farm he had a ${animal.name}, E-I-E-I-O!\n`;
        verse += singSounds(animal.sound); 
    });
    verse += `${farmerName} had a farm, E-I-E-I-O!\n\n`; 
    return verse;
};

module.exports.singSounds = singSounds;





  

