function numbers(input) {
    let numbersList = input.split(' ');
    let totalSum = 0;
    let averageNum = null;
    let biggerNumbers = [];
    
    for (const num of numbersList) {
        totalSum += Number(num);
    }

    averageNum = totalSum / numbersList.length;

    for (const num of numbersList) {
        if (num > averageNum) {
            biggerNumbers.unshift(num);
        }
    }

    let sortedBiggerNumbers = biggerNumbers.sort((aNum, bNum) => bNum - aNum)
    
    if (biggerNumbers.length > 0) {
        console.log(biggerNumbers.slice(0, 5).join(' '))
    } else {
        console.log(`No`)
    }
    
}

numbers('1')