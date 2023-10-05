function movingTarget(input) {
    let targets = input.shift().split(' ');
    const commandParser = {
        'Shoot': shootTarget,
        'Add': addTarget,
        'Strike': strikeTarget,
    }

    for (const inputLine of input) {
        if (inputLine === 'End') {
            break;
        }

        commandInfo = inputLine.split(' ');
        command = commandInfo[0];
        index = Number(commandInfo[1]);
        value = Number(commandInfo[2]);
        commandParser[command](index, value);
    }

    function shootTarget(index, value) {
        if (index < 0 || index >= targets.length) {
            return;
        }

        targets[index] = Number(targets[index]) - value;
        if (Number(targets[index]) <= 0) {
            targets.splice(index, 1);
        }
    }


    function addTarget(index, value) {
        if (index < 0 || index >= targets.length) {
            console.log(`Invalid placement!`)
        } else {
            targets.splice(index, 0, value);
        }
    }


    function strikeTarget(index, value) {
        if (index < 0 || index >= targets.length 
            || index - value < 0 || index + value >= targets.length) {
                console.log(`Strike missed!`)
            } else {
                targets.splice(index - value, value + value + 1)
            }
    }

    console.log(targets.join('|'))
}

movingTarget((["52 74 23 44 96 110",
"Shoot 5 10",
"Shoot 1 80",
"Strike 2 1",
"Add 22 3",
"End"])
)