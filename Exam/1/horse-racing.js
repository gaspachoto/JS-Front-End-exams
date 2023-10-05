function horseRacing (input) {
    let horseCollection = input.shift().split('|');
    let commandParser = {
        'Retake': retake,
        'Trouble': trouble,
        'Rage': rage,
        'Miracle': miracle,
    }

    while (input) {
        inputLine = input.shift();
        if (inputLine === 'Finish') {
            break;
        }

        commandInfo = inputLine.split(' ');
        command = commandInfo[0];
        commandParser[command](...commandInfo.slice(1));
    }

    function retake(overtaking, overtaken) {
        let overtakingIndex = horseCollection.indexOf(overtaking);
        let overtakenIndex = horseCollection.indexOf(overtaken);
        if (overtakingIndex < overtakenIndex) {
            horseCollection.splice(overtakenIndex, 1, overtaking)
            horseCollection.splice(overtakingIndex, 1, overtaken)
            console.log(`${overtaking} retakes ${overtaken}.`)
        };
    }

    function trouble(horseName) {
        let troubleIndex = horseCollection.indexOf(horseName);
        if (troubleIndex > 0) {
            horseCollection.splice(troubleIndex, 1);
            horseCollection.splice(troubleIndex - 1, 0, horseName)
            console.log(`Trouble for ${horseName} - drops one position.`)
        }
    }

    function rage(horseName) {
        let rageIndex = horseCollection.indexOf(horseName);
        if (rageIndex > (horseCollection.length - 3)) {
            horseCollection.splice(rageIndex, 1);
            horseCollection.push(horseName);
        } else {
            horseCollection.splice(rageIndex, 1);
            horseCollection.splice(rageIndex + 2, 0, horseName)
        }
        console.log(`${horseName} rages 2 positions ahead.`)
    }

    function miracle() {
        let miracle = horseCollection.shift();
        horseCollection.push(miracle);
        console.log(`What a miracle - ${miracle} becomes first.`)
    }
    console.log(horseCollection.join('->'));
    let winner = horseCollection[horseCollection.length - 1]
    console.log(`The winner is: ${winner}`)

}

horseRacing(['Bella|Alexia|Sugar',
'Retake Alexia Sugar',
'Rage Bella',
'Trouble Bella',
'Finish'])


