function needForSpeed(input) {
    let n = Number(input.shift());
    let carsCollection = {};
    let commandParser = {
        'Drive': driveCar,
        'Refuel': refuelCar,
        'Revert': revertCar,
    }

    for (let index = 0; index < n; index++) {
        const [ car, mileage, fuel ] = input.shift().split('|')
        carsCollection[car] = { 'mileage': Number(mileage), 'fuel': Number(fuel) };
    }

    for (const inputLine of input) {
        if (inputLine === 'Stop') {
            break;
        }

        let commandInfo = inputLine.split(' : ');
        command = commandInfo[0];
        commandParser[command](...commandInfo.slice(1));
    }

    function driveCar(car, distance, fuel) {
        if (carsCollection[car].fuel < fuel) {
            console.log(`Not enough fuel to make that ride`)
        } else {
            carsCollection[car].mileage += Number(distance);
            carsCollection[car].fuel -= Number(fuel);
            console.log(`${car} driven for ${distance} kilometers. ${fuel} liters of fuel consumed.`)
        }
        if (carsCollection[car].mileage >= 100000) {
            delete carsCollection[car];
            console.log(`Time to sell the ${car}!`);
        }
    }

    function refuelCar(car, fuel) {
        if (carsCollection[car].fuel <= 75) {
            if (carsCollection[car].fuel + Number(fuel) > 75) {
                let difference = Number(75 - carsCollection[car].fuel);
                carsCollection[car].fuel += difference;
                console.log(`${car} refueled with ${difference} liters`);
            } else {
                carsCollection[car].fuel += Number(fuel);
                console.log(`${car} refueled with ${fuel} liters`)
            }
        }
    }

    function revertCar(car, kilometers) {
        if (carsCollection[car].mileage > 10000) {
            if (carsCollection[car].mileage - Number(kilometers) < 10000) {
                carsCollection[car].mileage = 10000;
            } else {
                carsCollection[car].mileage -= Number(kilometers);
                console.log(`${car} mileage decreased by ${kilometers} kilometers`)
            }
        }
    }

    for (const car in carsCollection) {
        console.log(`${car} -> Mileage: ${carsCollection[car].mileage} kms, Fuel in the tank: ${carsCollection[car].fuel} lt.`)
    }
}

needForSpeed([
    '3',
    'Audi A6|38000|62',
    'Mercedes CLS|11000|35',
    'Volkswagen Passat CC|45678|5',
    'Drive : Audi A6 : 543 : 47',
    'Drive : Mercedes CLS : 94 : 11',
    'Drive : Volkswagen Passat CC : 69 : 8',
    'Refuel : Audi A6 : 50',
    'Revert : Mercedes CLS : 500',
    'Revert : Audi A6 : 30000',
    'Stop'
  ])
  