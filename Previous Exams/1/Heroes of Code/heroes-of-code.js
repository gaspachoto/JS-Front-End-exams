function heroes(input) {
    let numberOfHeroes = Number(input.shift());
    let heroesCollection = {};
    let commandParser = {
        'CastSpell': castSpell,
        'TakeDamage': takeDamage,
        'Recharge': recharge,
        'Heal': heal,
    }

    for (let index = 0; index < numberOfHeroes; index++) {
        const [ heroName, hp, mp ] = input.shift().split(' ')
        heroesCollection[heroName] = { 'hp': Number(hp), 'mp': Number(mp) }
    }

    for (const commandLine of input) {
        if (commandLine === 'End') {
            break;
        }

        let commandInfo = commandLine.split(' - ');
        command = commandInfo[0];
        commandParser[command](...commandInfo.slice(1));
    }

    function castSpell (heroName, mpNeeded, spellName) {
        if (heroesCollection[heroName].mp >= mpNeeded) {
            heroesCollection[heroName].mp -= mpNeeded;
            console.log(`${heroName} has successfully cast ${spellName} and now has ${heroesCollection[heroName].mp} MP!`)
        } else {
            console.log(`${heroName} does not have enough MP to cast ${spellName}!`)
        }
    }

    function takeDamage (heroName, damage, attacker) {
        heroesCollection[heroName].hp -= damage;
        if (heroesCollection[heroName].hp > 0) {
            console.log(`${heroName} was hit for ${damage} HP by ${attacker} and now has ${heroesCollection[heroName].hp} HP left!`)
        } else {
            delete heroesCollection[heroName];
            console.log(`${heroName} has been killed by ${attacker}!`)
        }
    }

    function recharge (heroName, amount) {
        if (heroesCollection[heroName].mp + Number(amount) > 200) {
            rechargeAmount = 200 - heroesCollection[heroName].mp
            heroesCollection[heroName].mp = 200;
            console.log(`${heroName} recharged for ${rechargeAmount} MP!`)
        } else {
            heroesCollection[heroName].mp += Number(amount);
            console.log(`${heroName} recharged for ${amount} MP!`)
        }
        
    }

    function heal (heroName, amount) {
        if (heroesCollection[heroName].hp + Number(amount) > 100) {
            rechargeAmount = 100 - heroesCollection[heroName].hp
            heroesCollection[heroName].hp = 100;
            console.log(`${heroName} healed for ${rechargeAmount} HP!`)
        } else {
            heroesCollection[heroName].hp += Number(amount);
            console.log(`${heroName} healed for ${amount} HP!`)
        }
        
    }

    for (const key in heroesCollection) {
        console.log(`${key}`)
        console.log(`  HP: ${heroesCollection[key].hp}`)
        console.log(`  MP: ${heroesCollection[key].mp}`)
    }
}

heroes(["2",
    "Solmyr 85 120",
    "Kyrre 99 50",
    "Heal - Solmyr - 10",
    "Recharge - Solmyr - 50",
    "TakeDamage - Kyrre - 66 - Orc",
    "CastSpell - Kyrre - 15 - ViewEarth",
    "End",])