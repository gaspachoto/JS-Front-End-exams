function heartDelivery(input) {
    let housesList = input.shift().split('@');
    let failedHouses = 0;
    let currentPosition = 0;

    while (input) {
        inputLine = input.shift();
        if (inputLine === 'Love!') {
            break;
        }

        command = inputLine.split(' ');
        length = Number(command[1]);
        houseToVisit = length + currentPosition;
        if (houseToVisit >= housesList.length) {
            houseToVisit = 0;
        }

        if (houseToVisit < housesList.length) {
            if (Number(housesList[houseToVisit]) > 0) {
                housesList[houseToVisit] -= 2;
                if (Number(housesList[houseToVisit]) === 0) {
                    console.log(`Place ${houseToVisit} has Valentine's day.`)
                }
            } else {
                console.log(`Place ${houseToVisit} already had Valentine's day.`)
            }
        }
        currentPosition = houseToVisit;
    }

    for (const house of housesList) {
        if (Number(house) > 0) {
            failedHouses += 1
        }
    }

    console.log(`Cupid's last position was ${currentPosition}.`)
    if (failedHouses > 0) {
        console.log(`Cupid has failed ${failedHouses} places.`)
    } else {
        console.log(`Mission was successful.`)
    }
}

heartDelivery(["2@4@2",
"Jump 2",
"Jump 2",
"Jump 8",
"Jump 3",
"Jump 1",
"Love!"])

