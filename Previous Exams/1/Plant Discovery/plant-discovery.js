function plantDiscovery(input) {
    let n = Number(input.shift());
    let plantsCollection = {};
    let commandParser = {
        'Rate': ratePlant,
        'Update': updatePlant,
        "Reset": resetPlant,
    }
    let totalRating = 0;
    let averageRating = 0;
    let error = false;

    for (let index = 0; index < n; index++) {
        const [ name, rarity ] = input.shift().split('<->');
        plantsCollection[name] = {'rarity': rarity, 'rating': []}
    }

    for (const inputLine of input) {
        if (inputLine === 'Exhibition') {
            break;
        }

        commandInfo = inputLine.split(': ');
        command = commandInfo[0];
        plantInfo = commandInfo[1].split(' - ');
        plantName = plantInfo[0]
        plantAction = plantInfo[1]
        if (!plantsCollection.hasOwnProperty(plantName)) {
            error = true;
            console.log('error');
            break;
        }
        if (command === 'Reset') {
            commandParser[command](plantName)
        } else {
            commandParser[command](plantName, plantAction);
        }
    }

    function ratePlant(name, plantAction) {
        plantsCollection[name].rating.unshift(Number(plantAction))
    }
    
    function updatePlant(name, plantAction) {
        plantsCollection[name].rarity = plantAction;
    }

    function resetPlant(name) {
        plantsCollection[name].rating = [];
    }

    for (const key in plantsCollection) {
        if (plantsCollection[key].rating.length > 0) {
            for (const rate of plantsCollection[key].rating) {
                totalRating += rate
            }
            if (totalRating !== 0) {
                averageRating = Number(totalRating / plantsCollection[key].rating.length);
                plantsCollection[key].rating = averageRating;
            } else {
                plantsCollection[key].rating = 0;
            }
            totalRating = 0;
        } else {
            plantsCollection[key].rating = 0;
        }
        
    }

    console.log(`Plants for the exhibition:`)
    for (const key in plantsCollection) {
        console.log(`- ${key}; Rarity: ${plantsCollection[key].rarity}; Rating: ${plantsCollection[key].rating.toFixed(2)}`)
    }
}

plantDiscovery((["3",
"Arnoldii<->4",
"Woodii<->7",
"Welwitschia<->2",
"Rate: Woodii - 10",
"Rate: Welwitschia - 7",
"Rate: Arnoldii - 3",
"Rate: Woodii - 5",
"Update: Woodii - 5",
"Reset: Arnoldii",
"Exhibition"]))