// wm: ditss
export function pangkat(rank) {
    var role = {
        rank: 'Bronze I',
        name: 'Bronze',
        id: 1
    }
    if (rank <= 300) {
        role = {
            rank: 'Bronze I',
            name: 'Bronze',
            id: 1
        }
    } else if (rank <= 500) {
        role = {
            rank: 'Bronze II',
            name: 'Bronze',
            id: 2
        }
    } else if (rank <= 700) {
        role = {
            rank: 'Bronze III',
            name: 'Bronze',
            id: 3
        }
    } else if (rank <= 900) {
        role = {
            rank: 'Silver I',
            name: 'Silver',
            id: 1
        }
    } else if (rank <= 1200) {
        role = {
            rank: 'Silver II',
            name: 'Silver',
            id: 2
        }
    } else if (rank <= 1500) {
        role = {
            rank: 'Silver III',
            name: 'Silver',
            id: 3
        }
    } else if (rank <= 1600) {
        role = {
            rank: 'Gold I',
            name: 'Gold',
            id: 1
        }
    } else if (rank <= 1725) {
        role = {
            rank: 'Gold II',
            name: 'Gold',
            id: 2
        }
    } else if (rank <= 1850) {
        role = {
            rank: 'Gold III',
            name: 'Gold',
            id: 3
        }
    } else if (rank <= 1975) {
        role = {
            rank: 'Gold IV',
            name: 'Gold',
            id: 4
        }
    } else if (rank <= 2100) {
        role = {
            rank: 'Platinum I',
            name: 'Platinum',
            id: 1
        }
    } else if (rank <= 2225) {
        role = {
            rank: 'Platinum II',
            name: 'Platinum',
            id: 2
        }
    } else if (rank <= 2350) {
        role = {
            rank: 'Platinum III',
            name: 'Platinum',
            id: 3
        }
    } else if (rank <= 2475) {
        role = {
            rank: 'Platinum IV',
            name: 'Platinum',
            id: 4
        }
    } else if (rank <= 2600) {
        role = {
            rank: 'Diamond I',
            name: 'Diamond',
            id: 1
        }
    } else if (rank <= 2750) {
        role = {
            rank: 'Diamond II',
            name: 'Diamond',
            id: 2
        }
    } else if (rank <= 2900) {
        role = {
            rank: 'Diamond III',
            name: 'Diamond',
            id: 3
        }
    } else if (rank <= 3050) {
        role = {
            rank: 'Diamond IV',
            name: 'Diamond',
            id: 4
        }
    } else if (rank <= 3200) {
        role = {
            rank: 'Heroic',
            name: 'Heroic',
            id: 0
        }
    } else if (rank <= 3500) {
        role = {
            rank: 'Heroic ✩',
            name: 'Heroic',
            id: 1
        }
    } else if (rank <= 4000) {
        role = {
            rank: 'Heroic ✩✩',
            name: 'Heroic',
            id: 2
        }
    } else if (rank <= 4350) {
        role = {
            rank: 'Heroic ✩✩✩',
            name: 'Heroic',
            id: 3
        }
    } else if (rank <= 5050) {
        role = {
            rank: 'Master ✯',
            name: 'Master',
            id: 1
        }
    } else if (rank <= 5400) {
        role = {
            rank: 'Master ✯✯',
            name: 'Master',
            id: 2
        }
    } else if (rank <= 6500) {
        role = {
            rank: 'Master ✯✯✯',
            name: 'Master',
            id: 3
        }
    } else if (rank <= 7150) {
        role = {
            rank: 'GrandMaster',
            name: 'GrandMaster',
            id: 0
        }
    } else if (rank <= 7700) {
        role = {
            rank: 'GrandMaster ✩',
            name: 'GrandMaster',
            id: 1
        }
    } else if (rank <= 9100) {
        role = {
            rank: 'GrandMaster ✩✩',
            name: 'GrandMaster',
            id: 2
        }
    } else if (rank <= 10800) {
        role = {
            rank: 'GrandMaster ✩✩✩',
            name: 'GrandMaster',
            id: 3
        }
    } else if (rank <= 20000) {
        role = {
            rank: 'GrandMaster ✩✩✩✩',
            name: 'GrandMaster',
            id: 4
        }
    } else if (rank <= 25000) {
        role = {
            rank: 'Epic I',
            name: 'Epic',
            id: 1
        }
    } else if (rank <= 30000) {
        role = {
            rank: 'Epic II',
            name: 'Epic',
            id: 2
        }
    } else if (rank <= 35000) {
        role = {
            rank: 'Epic III',
            name: 'Epic',
            id: 3
        }
    } else if (rank <= 40000) {
        role = {
            rank: 'Epic IV',
            name: 'Epic',
            id: 4
        }
    } else if (rank <= 45000) {
        role = {
            rank: 'Legend I',
            name: 'Legend',
            id: 1
        }
    } else if (rank <= 50000) {
        role = {
            rank: 'Legend II',
            name: 'Legend',
            id: 2
        }
    } else if (rank <= 55000) {
        role = {
            rank: 'Legend III',
            name: 'Legend',
            id: 3
        }
    } else if (rank <= 60000) {
        role = {
            rank: 'Legend IV',
            name: 'Legend',
            id: 4
        }
    } else if (rank <= 70000) {
        role = {
            rank: 'Mythic I',
            name: 'Mythic',
            id: 1
        }
    } else if (rank <= 80000) {
        role = {
            rank: 'Mythic II',
            name: 'Mythic',
            id: 2
        }
    } else if (rank <= 90000) {
        role = {
            rank: 'Mythic III',
            name: 'Mythic',
            id: 3
        }
    } else if (rank <= 100000) {
        role = {
            rank: 'Mythic IV',
            name: 'Mythic',
            id: 4
        }
    } else if (rank <= 120000) {
        role = {
            rank: 'Immortal I',
            name: 'Immortal',
            id: 1
        }
    } else if (rank <= 140000) {
        role = {
            rank: 'Immortal II',
            name: 'Immortal',
            id: 2
        }
    } else if (rank <= 160000) {
        role = {
            rank: 'Immortal III',
            name: 'Immortal',
            id: 3
        }
    } else if (rank <= 180000) {
        role = {
            rank: 'Immortal IV',
            name: 'Immortal',
            id: 4
        }
    } else if (rank <= 200000) {
        role = {
            rank: 'Celestial I',
            name: 'Celestial',
            id: 1
        }
    } else if (rank <= 220000) {
        role = {
            rank: 'Celestial II',
            name: 'Celestial',
            id: 2
        }
    } else if (rank <= 240000) {
        role = {
            rank: 'Celestial III',
            name: 'Celestial',
            id: 3
        }
    } else if (rank <= 260000) {
        role = {
            rank: 'Celestial IV',
            name: 'Celestial',
            id: 4
        }
    } else if (rank <= 280000) {
        role = {
            rank: 'Divine I',
            name: 'Divine',
            id: 1
        }
    } else if (rank <= 300000) {
        role = {
            rank: 'Divine II',
            name: 'Divine',
            id: 2
        }
    } else if (rank <= 320000) {
        role = {
            rank: 'Divine III',
            name: 'Divine',
            id: 3
        }
    } else if (rank <= 340000) {
        role = {
            rank: 'Divine IV',
            name: 'Divine',
            id: 4
        }
    } else if (rank <= 360000) {
        role = {
            rank: 'Titan I',
            name: 'Titan',
            id: 1
        }
    } else if (rank <= 380000) {
        role = {
            rank: 'Titan II',
            name: 'Titan',
            id: 2
        }
    } else if (rank <= 400000) {
        role = {
            rank: 'Titan III',
            name: 'Titan',
            id: 3
        }
    } else if (rank <= 420000) {
        role = {
            rank: 'Titan IV',
            name: 'Titan',
            id: 4
        }
    } else if (rank <= 440000) {
        role = {
            rank: 'Godlike I',
            name: 'Godlike',
            id: 1
        }
    } else if (rank <= 460000) {
        role = {
            rank: 'Godlike II',
            name: 'Godlike',
            id: 2
        }
    } else if (rank <= 480000) {
        role = {
            rank: 'Godlike III',
            name: 'Godlike',
            id: 3
        }
    } else if (rank <= 500000) {
        role = {
            rank: 'Godlike IV',
            name: 'Godlike',
            id: 4
        }
    } else if (rank <= 520000) {
        role = {
            rank: 'Omnipotent I',
            name: 'Omnipotent',
            id: 1
        }
    } else if (rank <= 540000) {
        role = {
            rank: 'Omnipotent II',
            name: 'Omnipotent',
            id: 2
        }
    } else if (rank <= 560000) {
        role = {
            rank: 'Omnipotent III',
            name: 'Omnipotent',
            id: 3
        }
    } else if (rank <= 580000) {
        role = {
            rank: 'Omnipotent IV',
            name: 'Omnipotent',
            id: 4
        }
    } else if (rank <= 600000) {
        role = {
            rank: 'Supreme I',
            name: 'Supreme',
            id: 1
        }
    } else if (rank <= 620000) {
        role = {
            rank: 'Supreme II',
            name: 'Supreme',
            id: 2
        }
    } else if (rank <= 640000) {
        role = {
            rank: 'Supreme III',
            name: 'Supreme',
            id: 3
        }
    } else if (rank <= 660000) {
        role = {
            rank: 'Supreme IV',
            name: 'Supreme',
            id: 4
        }
    } else if (rank <= 680000) {
        role = {
            rank: 'Eternal I',
            name: 'Eternal',
            id: 1
        }
    } else if (rank <= 700000) {
        role = {
            rank: 'Eternal II',
            name: 'Eternal',
            id: 2
        }
    } else if (rank <= 720000) {
        role = {
            rank: 'Eternal III',
            name: 'Eternal',
            id: 3
        }
    } else if (rank <= 740000) {
        role = {
            rank: 'Eternal IV',
            name: 'Eternal',
            id: 4
        }
    }
    else if (rank <= 760000) {
        role = {
            rank: 'Transcendent I',
            name: 'Transcendent',
            id: 1
        }
    } else if (rank <= 780000) {
        role = {
            rank: 'Transcendent II',
            name: 'Transcendent',
            id: 2
        }
    } else if (rank <= 800000) {
        role = {
            rank: 'Transcendent III',
            name: 'Transcendent',
            id: 3
        }
    } else if (rank <= 820000) {
        role = {
            rank: 'Transcendent IV',
            name: 'Transcendent',
            id: 4
        }
    } else if (rank <= 840000) {
        role = {
            rank: 'Infinity I',
            name: 'Infinity',
            id: 1
        }
    } else if (rank <= 860000) {
        role = {
            rank: 'Infinity II',
            name: 'Infinity',
            id: 2
        }
    } else if (rank <= 880000) {
        role = {
            rank: 'Infinity III',
            name: 'Infinity',
            id: 3
        }
    } else if (rank <= 900000) {
        role = {
            rank: 'Infinity IV',
            name: 'Infinity',
            id: 4
        }
    } else if (rank <= 920000) {
        role = {
            rank: 'Cosmic I',
            name: 'Cosmic',
            id: 1
        }
    } else if (rank <= 940000) {
        role = {
            rank: 'Cosmic II',
            name: 'Cosmic',
            id: 2
        }
    } else if (rank <= 960000) {
        role = {
            rank: 'Cosmic III',
            name: 'Cosmic',
            id: 3
        }
    } else if (rank <= 980000) {
        role = {
            rank: 'Cosmic IV',
            name: 'Cosmic',
            id: 4
        }
    } else if (rank <= 1000000) {
        role = {
            rank: 'Galactic I',
            name: 'Galactic',
            id: 1
        }
    } else if (rank <= 1020000) {
        role = {
            rank: 'Galactic II',
            name: 'Galactic',
            id: 2
        }
    } else if (rank <= 1040000) {
        role = {
            rank: 'Galactic III',
            name: 'Galactic',
            id: 3
        }
    } else if (rank <= 1060000) {
        role = {
            rank: 'Galactic IV',
            name: 'Galactic',
            id: 4
        }
    } else if (rank <= 1080000) {
        role = {
            rank: 'Universal I',
            name: 'Universal',
            id: 1
        }
    } else if (rank <= 1100000) {
        role = {
            rank: 'Universal II',
            name: 'Universal',
            id: 2
        }
    } else if (rank <= 1120000) {
        role = {
            rank: 'Universal III',
            name: 'Universal',
            id: 3
        }
    } else if (rank <= 1140000) {
        role = {
            rank: 'Universal IV',
            name: 'Universal',
            id: 4
        }
    } else if (rank <= 1160000) {
    //disni
        role = {
            rank: 'Multiversal I',
            name: 'Multiversal',
            id: 1
        }
    } else if (rank <= 1180000) {
        role = {
            rank: 'Multiversal II',
            name: 'Multiversal',
            id: 2
        }
    } else if (rank <= 1200000) {
        role = {
            rank: 'Multiversal III',
            name: 'Multiversal',
            id: 3
        }
    } else if (rank <= 1220000) {
        role = {
            rank: 'Multiversal IV',
            name: 'Multiversal',
            id: 4
        }
    } else if (rank <= 1240000) {
        role = {
            rank: 'Omniversal I',
            name: 'Omniversal',
            id: 1
        }
    } else if (rank <= 1260000) {
        role = {
            rank: 'Omniversal II',
            name: 'Omniversal',
            id: 2
        }
    } else if (rank <= 1280000) {
        role = {
            rank: 'Omniversal III',
            name: 'Omniversal',
            id: 3
        }
    } else if (rank <= 1300000) {
        role = {
            rank: 'Omniversal IV',
            name: 'Omniversal',
            id: 4
        }
    } else if (rank <= 1320000) {
        role = {
            rank: 'Absolute I',
            name: 'Absolute',
            id: 1
        }
    } else if (rank <= 1340000) {
        role = {
            rank: 'Absolute II',
            name: 'Absolute',
            id: 2
        }
    } else if (rank <= 1360000) {
        role = {
            rank: 'Absolute III',
            name: 'Absolute',
            id: 3
        }
    } else if (rank <= 1380000) {
        role = {
            rank: 'Absolute IV',
            name: 'Absolute',
            id: 4
        }
    } else if (rank <= 1400000) {
        role = {
            rank: 'Ultimate I',
            name: 'Ultimate',
            id: 1
        }
    } else if (rank <= 1420000) {
        role = {
            rank: 'Ultimate II',
            name: 'Ultimate',
            id: 2
        }
    } else if (rank <= 1440000) {
        role = {
            rank: 'Ultimate III',
            name: 'Ultimate',
            id: 3
        }
    } else if (rank <= 1460000) {
        role = {
            rank: 'Ultimate IV',
            name: 'Ultimate',
            id: 4
        }
    } else if (rank <= 1480000) {
        role = {
            rank: 'Supreme Alpha I',
            name: 'Supreme Alpha',
            id: 1
        }
    } else if (rank <= 1500000) {
        role = {
            rank: 'Supreme Alpha II',
            name: 'Supreme Alpha',
            id: 2
        }
    } else if (rank <= 1520000) {
        role = {
            rank: 'Supreme Alpha III',
            name: 'Supreme Alpha',
            id: 3
        }
    } else if (rank <= 1540000) {
        role = {
            rank: 'Supreme Alpha IV',
            name: 'Supreme Alpha',
            id: 4
        }
    } else if (rank <= 1560000) {
        role = {
            rank: 'Eternal Omega I',
            name: 'Eternal Omega',
            id: 1
        }
    } else if (rank <= 1580000) {
        role = {
            rank: 'Eternal Omega II',
            name: 'Eternal Omega',
            id: 2
        }
    } else if (rank <= 1600000) {
        role = {
            rank: 'Eternal Omega III',
            name: 'Eternal Omega',
            id: 3
        }
    } else if (rank <= 1620000) {
        role = {
            rank: 'Eternal Omega IV',
            name: 'Eternal Omega',
            id: 4
        }
    } else if (rank <= 1640000) {
        role = {
            rank: 'Immortal God I',
            name: 'Immortal God',
            id: 1
        }
    } else if (rank <= 1660000) {
        role = {
            rank: 'Immortal God II',
            name: 'Immortal God',
            id: 2
        }
    } else if (rank <= 1680000) {
        role = {
            rank: 'Immortal God III',
            name: 'Immortal God',
            id: 3
        }
    } else if (rank <= 1700000) {
        role = {
            rank: 'Immortal God IV',
            name: 'Immortal God',
            id: 4
        }
    } else if (rank <= 1720000) {
        role = {
            rank: 'Celestial Deity I',
            name: 'Celestial Deity',
            id: 1
        }
    } else if (rank <= 1740000) {
        role = {
            rank: 'Celestial Deity II',
            name: 'Celestial Deity',
            id: 2
        }
    } else if (rank <= 1760000) {
        role = {
            rank: 'Celestial Deity III',
            name: 'Celestial Deity',
            id: 3
        }
    } else if (rank <= 1780000) {
        role = {
            rank: 'Celestial Deity IV',
            name: 'Celestial Deity',
            id: 4
        }
    } else if (rank <= 1800000) {
        role = {
            rank: 'Divine Creator I',
            name: 'Divine Creator',
            id: 1
        }
    } else if (rank <= 1820000) {
        role = {
            rank: 'Divine Creator II',
            name: 'Divine Creator',
            id: 2
        }
    } else if (rank <= 1840000) {
        role = {
            rank: 'Divine Creator III',
            name: 'Divine Creator',
            id: 3
        }
    } else if (rank <= 1860000) {
        role = {
            rank: 'Divine Creator IV',
            name: 'Divine Creator',
            id: 4
        }
    } else if (rank <= 1880000) {
        role = {
            rank: 'Titan Overlord I',
            name: 'Titan Overlord',
            id: 1
        }
    } else if (rank <= 1900000) {
        role = {
            rank: 'Titan Overlord II',
            name: 'Titan Overlord',
            id: 2
        }
    } else if (rank <= 1920000) {
        role = {
            rank: 'Titan Overlord III',
            name: 'Titan Overlord',
            id: 3
        }
    } else if (rank <= 1940000) {
        role = {
            rank: 'Titan Overlord IV',
            name: 'Titan Overlord',
            id: 4
        }
    } else if (rank <= 1960000) {
        role = {
            rank: 'Godlike Emperor I',
            name: 'Godlike Emperor',
            id: 1
        }
    } else if (rank <= 1980000) {
        role = {
            rank: 'Godlike Emperor II',
            name: 'Godlike Emperor',
            id: 2
        }
    } else if (rank <= 2000000) {
        role = {
            rank: 'Godlike Emperor III',
            name: 'Godlike Emperor',
            id: 3
        }
    } else if (rank <= 2020000) {
        role = {
            rank: 'Godlike Emperor IV',
            name: 'Godlike Emperor',
            id: 4
        }
    } else if (rank <= 2040000) {
        role = {
            rank: 'Omnipotent King I',
            name: 'Omnipotent King',
            id: 1
        }
    } else if (rank <= 2060000) {
        role = {
            rank: 'Omnipotent King II',
            name: 'Omnipotent King',
            id: 2
        }
    } else if (rank <= 2080000) {
        role = {
            rank: 'Omnipotent King III',
            name: 'Omnipotent King',
            id: 3
        }
    } else if (rank <= 2100000) {
        role = {
            rank: 'Omnipotent King IV',
            name: 'Omnipotent King',
            id: 4
        }
    } else if (rank <= 2200000) {
        role = {
            rank: 'Supreme Legend I',
            name: 'Supreme Legend',
            id: 1
        }
    } else if (rank <= 2300000) {
        role = {
            rank: 'Supreme Legend II',
            name: 'Supreme Legend',
            id: 2
        }
    } else if (rank <= 2400000) {
        role = {
            rank: 'Supreme Legend III',
            name: 'Supreme Legend',
            id: 3
        }
    } else if (rank <= 2500000) {
        role = {
            rank: 'Supreme Legend IV',
            name: 'Supreme Legend',
            id: 4
        }
    } else if (rank <= 2600000) {
        role = {
            rank: 'Eternal Myth I',
            name: 'Eternal Myth',
            id: 1
        }
    } else if (rank <= 2700000) {
        role = {
            rank: 'Eternal Myth II',
            name: 'Eternal Myth',
            id: 2
        }
    } else if (rank <= 2800000) {
        role = {
            rank: 'Eternal Myth III',
            name: 'Eternal Myth',
            id: 3
        }
    } else if (rank <= 2900000) {
        role = {
            rank: 'Eternal Myth IV',
            name: 'Eternal Myth',
            id: 4
        }
    } else if (rank <= 3000000) {
        role = {
            rank: 'Immortal Phoenix I',
            name: 'Immortal Phoenix',
            id: 1
        }
    } else if (rank <= 3100000) {
        role = {
            rank: 'Immortal Phoenix II',
            name: 'Immortal Phoenix',
            id: 2
        }
    } else if (rank <= 3200000) {
        role = {
            rank: 'Immortal Phoenix III',
            name: 'Immortal Phoenix',
            id: 3
        }
    } else if (rank <= 3300000) {
        role = {
            rank: 'Immortal Phoenix IV',
            name: 'Immortal Phoenix',
            id: 4
        }
    } else if (rank <= 3400000) {
        role = {
            rank: 'Celestial Dragon I',
            name: 'Celestial Dragon',
            id: 1
        }
    } else if (rank <= 3500000) {
        role = {
            rank: 'Celestial Dragon II',
            name: 'Celestial Dragon',
            id: 2
        }
    } else if (rank <= 3600000) {
        role = {
            rank: 'Celestial Dragon III',
            name: 'Celestial Dragon',
            id: 3
        }
    } else if (rank <= 3700000) {
        role = {
            rank: 'Celestial Dragon IV',
            name: 'Celestial Dragon',
            id: 4
        }
    } else if (rank <= 3800000) {
        role = {
            rank: 'Divine Archon I',
            name: 'Divine Archon',
            id: 1
        }
    } else if (rank <= 3900000) {
        role = {
            rank: 'Divine Archon II',
            name: 'Divine Archon',
            id: 2
        }
    } else if (rank <= 4000000) {
        role = {
            rank: 'Divine Archon III',
            name: 'Divine Archon',
            id: 3
        }
    } else if (rank <= 4100000) {
        role = {
            rank: 'Divine Archon IV',
            name: 'Divine Archon',
            id: 4
        }
    } else if (rank <= 4200000) {
        role = {
            rank: 'Titan Prime I',
            name: 'Titan Prime',
            id: 1
        }
    } else if (rank <= 4300000) {
        role = {
            rank: 'Titan Prime II',
            name: 'Titan Prime',
            id: 2
        }
    } else if (rank <= 4400000) {
        role = {
            rank: 'Titan Prime III',
            name: 'Titan Prime',
            id: 3
        }
    } else if (rank <= 4500000) {
        role = {
            rank: 'Titan Prime IV',
            name: 'Titan Prime',
            id: 4
        }
    } else if (rank <= 4600000) {
        role = {
            rank: 'Godlike Sovereign I',
            name: 'Godlike Sovereign',
            id: 1
        }
    } else if (rank <= 4700000) {
        role = {
            rank: 'Godlike Sovereign II',
            name: 'Godlike Sovereign',
            id: 2
        }
    } else if (rank <= 4800000) {
        role = {
            rank: 'Godlike Sovereign III',
            name: 'Godlike Sovereign',
            id: 3
        }
    } else if (rank <= 4900000) {
        role = {
            rank: 'Godlike Sovereign IV',
            name: 'Godlike Sovereign',
            id: 4
        }
    } else if (rank <= 5000000) {
        role = {
            rank: 'Omnipotent Ascendant I',
            name: 'Omnipotent Ascendant',
            id: 1
        }
    } else if (rank <= 5100000) {
        role = {
            rank: 'Omnipotent Ascendant II',
            name: 'Omnipotent Ascendant',
            id: 2
        }
    } else if (rank <= 5200000) {
        role = {
            rank: 'Omnipotent Ascendant III',
            name: 'Omnipotent Ascendant',
            id: 3
        }
    } else if (rank <= 5300000) {
        role = {
            rank: 'Omnipotent Ascendant IV',
            name: 'Omnipotent Ascendant',
            id: 4
        }
    } else if (rank <= 5400000) {
        role = {
            rank: 'Supreme Paragon I',
            name: 'Supreme Paragon',
            id: 1
        }
    } else if (rank <= 5500000) {
        role = {
            rank: 'Supreme Paragon II',
            name: 'Supreme Paragon',
            id: 2
        }
    } else if (rank <= 5600000) {
        role = {
            rank: 'Supreme Paragon III',
            name: 'Supreme Paragon',
            id: 3
        }
    } else if (rank <= 5700000) {
        role = {
            rank: 'Supreme Paragon IV',
            name: 'Supreme Paragon',
            id: 4
        }
    } else if (rank <= 5800000) {
        role = {
            rank: 'Eternal Zenith I',
            name: 'Eternal Zenith',
            id: 1
        }
    } else if (rank <= 5900000) {
        role = {
            rank: 'Eternal Zenith II',
            name: 'Eternal Zenith',
            id: 2
        }
    } else if (rank <= 6000000) {
        role = {
            rank: 'Eternal Zenith III',
            name: 'Eternal Zenith',
            id: 3
        }
    } else if (rank <= 6100000) {
        role = {
            rank: 'Eternal Zenith IV',
            name: 'Eternal Zenith',
            id: 4
        }
    } else if (rank <= 6200000) {
        role = {
            rank: 'Immortal Apex I',
            name: 'Immortal Apex',
            id: 1
        }
    } else if (rank <= 6300000) {
        role = {
            rank: 'Immortal Apex II',
            name: 'Immortal Apex',
            id: 2
        }
    } else if (rank <= 6400000) {
        role = {
            rank: 'Immortal Apex III',
            name: 'Immortal Apex',
            id: 3
        }
    } else if (rank <= 6500000) {
        role = {
            rank: 'Immortal Apex IV',
            name: 'Immortal Apex',
            id: 4
        }
    } else if (rank <= 6600000) {
        role = {
            rank: 'Celestial Pinnacle I',
            name: 'Celestial Pinnacle',
            id: 1
        }
    } else if (rank <= 6700000) {
        role = {
            rank: 'Celestial Pinnacle II',
            name: 'Celestial Pinnacle',
            id: 2
        }
    } else if (rank <= 6800000) {
        role = {
            rank: 'Celestial Pinnacle III',
            name: 'Celestial Pinnacle',
            id: 3
        }
    } else if (rank <= 6900000) {
        role = {
            rank: 'Celestial Pinnacle IV',
            name: 'Celestial Pinnacle',
            id: 4
        }
    } else if (rank <= 7000000) {
        role = {
            rank: 'Divine Peak I',
            name: 'Divine Peak',
            id: 1
        }
    } else if (rank <= 7100000) {
        role = {
            rank: 'Divine Peak II',
            name: 'Divine Peak',
            id: 2
        }
    } else if (rank <= 7200000) {
        role = {
            rank: 'Divine Peak III',
            name: 'Divine Peak',
            id: 3
        }
    } else if (rank <= 7300000) {
        role = {
            rank: 'Divine Peak IV',
            name: 'Divine Peak',
            id: 4
        }
    } else if (rank <= 7400000) {
        role = {
            rank: 'Titan Summit I',
            name: 'Titan Summit',
            id: 1
        }
    } else if (rank <= 7500000) {
        role = {
            rank: 'Titan Summit II',
            name: 'Titan Summit',
            id: 2
        }
    } else if (rank <= 7600000) {
        role = {
            rank: 'Titan Summit III',
            name: 'Titan Summit',
            id: 3
        }
    } else if (rank <= 7700000) {
        role = {
            rank: 'Titan Summit IV',
            name: 'Titan Summit',
            id: 4
        }
    } else if (rank <= 7800000) {
        role = {
            rank: 'Godlike Apex I',
            name: 'Godlike Apex',
            id: 1
        }
    } else if (rank <= 7900000) {
        role = {
            rank: 'Godlike Apex II',
            name: 'Godlike Apex',
            id: 2
        }
    } else if (rank <= 8000000) {
        role = {
            rank: 'Godlike Apex III',
            name: 'Godlike Apex',
            id: 3
        }
    } else if (rank <= 8100000) {
        role = {
            rank: 'Godlike Apex IV',
            name: 'Godlike Apex',
            id: 4
        }
    } else if (rank <= 8200000) {
        role = {
            rank: 'Omnipotent Supreme I',
            name: 'Omnipotent Supreme',
            id: 1
        }
    } else if (rank <= 8300000) {
        role = {
            rank: 'Omnipotent Supreme II',
            name: 'Omnipotent Supreme',
            id: 2
        }
    } else if (rank <= 8400000) {
        role = {
            rank: 'Omnipotent Supreme III',
            name: 'Omnipotent Supreme',
            id: 3
        }
    } else if (rank <= 8500000) {
        role = {
            rank: 'Omnipotent Supreme IV',
            name: 'Omnipotent Supreme',
            id: 4
        }
    } else if (rank <= 8600000) {
        role = {
            rank: 'Supreme Emperor I',
            name: 'Supreme Emperor',
            id: 1
        }
    } else if (rank <= 8700000) {
        role = {
            rank: 'Supreme Emperor II',
            name: 'Supreme Emperor',
            id: 2
        }
    } else if (rank <= 8800000) {
        role = {
            rank: 'Supreme Emperor III',
            name: 'Supreme Emperor',
            id: 3
        }
    } else if (rank <= 8900000) {
        role = {
            rank: 'Supreme Emperor IV',
            name: 'Supreme Emperor',
            id: 4
        }
    } else if (rank <= 9000000) {
        role = {
            rank: 'Eternal Overlord I',
            name: 'Eternal Overlord',
            id: 1
        }
    } else if (rank <= 9100000) {
        role = {
            rank: 'Eternal Overlord II',
            name: 'Eternal Overlord',
            id: 2
        }
    } else if (rank <= 9200000) {
        role = {
            rank: 'Eternal Overlord III',
            name: 'Eternal Overlord',
            id: 3
        }
    } else if (rank <= 9300000) {
        role = {
            rank: 'Eternal Overlord IV',
            name: 'Eternal Overlord',
            id: 4
        }
    } else if (rank <= 9400000) {
        role = {
            rank: 'Immortal Monarch I',
            name: 'Immortal Monarch',
            id: 1
        }
    } else if (rank <= 9500000) {
        role = {
            rank: 'Immortal Monarch II',
            name: 'Immortal Monarch',
            id: 2
        }
    } else if (rank <= 9600000) {
        role = {
            rank: 'Immortal Monarch III',
            name: 'Immortal Monarch',
            id: 3
        }
    } else if (rank <= 9700000) {
        role = {
            rank: 'Immortal Monarch IV',
            name: 'Immortal Monarch',
            id: 4
        }
    } else if (rank <= 9800000) {
        role = {
            rank: 'Celestial King I',
            name: 'Celestial King',
            id: 1
        }
    } else if (rank <= 9900000) {
        role = {
            rank: 'Celestial King II',
            name: 'Celestial King',
            id: 2
        }
    } else if (rank <= 10000000) {
        role = {
            rank: 'Celestial King III',
            name: 'Celestial King',
            id: 3
        }
    } else if (rank <= 10100000) {
        role = {
            rank: 'Celestial King IV',
            name: 'Celestial King',
            id: 4
        }
    } else if (rank <= 10200000) {
        role = {
            rank: 'Divine God I',
            name: 'Divine God',
            id: 1
        }
    } else if (rank <= 10300000) {
        role = {
            rank: 'Divine God II',
            name: 'Divine God',
            id: 2
        }
    } else if (rank <= 10400000) {
        role = {
            rank: 'Divine God III',
            name: 'Divine God',
            id: 3
        }
    } else if (rank <= 10500000) {
        role = {
            rank: 'Divine God IV',
            name: 'Divine God',
            id: 4
        }
    } else if (rank <= 10600000) {
        role = {
            rank: 'Titan God I',
            name: 'Titan God',
            id: 1
        }
    } else if (rank <= 10700000) {
        role = {
            rank: 'Titan God II',
            name: 'Titan God',
            id: 2
        }
    } else if (rank <= 10800000) {
        role = {
            rank: 'Titan God III',
            name: 'Titan God',
            id: 3
        }
    } else if (rank <= 10900000) {
        role = {
            rank: 'Titan God IV',
            name: 'Titan God',
            id: 4
        }
    } else if (rank <= 11000000) {
        role = {
            rank: 'Godlike Deity I',
            name: 'Godlike Deity',
            id: 1
        }
    } else if (rank <= 11100000) {
        role = {
            rank: 'Godlike Deity II',
            name: 'Godlike Deity',
            id: 2
        }
    } else if (rank <= 11200000) {
        role = {
            rank: 'Godlike Deity III',
            name: 'Godlike Deity',
            id: 3
        }
    } else if (rank <= 11300000) {
        role = {
            rank: 'Godlike Deity IV',
            name: 'Godlike Deity',
            id: 4
        }
    } else if (rank <= 11400000) {
        role = {
            rank: 'Omnipotent Creator I',
            name: 'Omnipotent Creator',
            id: 1
        }
    } else if (rank <= 11500000) {
        role = {
            rank: 'Omnipotent Creator II',
            name: 'Omnipotent Creator',
            id: 2
        }
    } else if (rank <= 11600000) {
        role = {
            rank: 'Omnipotent Creator III',
            name: 'Omnipotent Creator',
            id: 3
        }
    } else if (rank <= 11700000) {
        role = {
            rank: 'Omnipotent Creator IV',
            name: 'Omnipotent Creator',
            id: 4
        }
    } else if (rank <= 11800000) {
        role = {
            rank: 'Supreme Ultimate I',
            name: 'Supreme Ultimate',
            id: 1
        }
    } else if (rank <= 11900000) {
        role = {
            rank: 'Supreme Ultimate II',
            name: 'Supreme Ultimate',
            id: 2
        }
    } else if (rank <= 12000000) {
        role = {
            rank: 'Supreme Ultimate III',
            name: 'Supreme Ultimate',
            id: 3
        }
    } else if (rank <= 12100000) {
        role = {
            rank: 'Supreme Ultimate IV',
            name: 'Supreme Ultimate',
            id: 4
        }
    } else if (rank <= 12200000) {
        role = {
            rank: 'Eternal Infinity I',
            name: 'Eternal Infinity',
            id: 1
        }
    } else if (rank <= 12300000) {
        role = {
            rank: 'Eternal Infinity II',
            name: 'Eternal Infinity',
            id: 2
        }
    } else if (rank <= 12400000) {
        role = {
            rank: 'Eternal Infinity III',
            name: 'Eternal Infinity',
            id: 3
        }
    } else if (rank <= 12500000) {
        role = {
            rank: 'Eternal Infinity IV',
            name: 'Eternal Infinity',
            id: 4
        }
    } else if (rank <= 12600000) {
        role = {
            rank: 'Immortal Universe I',
            name: 'Immortal Universe',
            id: 1
        }
    } else if (rank <= 12700000) {
        role = {
            rank: 'Immortal Universe II',
            name: 'Immortal Universe',
            id: 2
        }
    } else if (rank <= 12800000) {
        role = {
            rank: 'Immortal Universe III',
            name: 'Immortal Universe',
            id: 3
        }
    } else if (rank <= 12900000) {
        role = {
            rank: 'Immortal Universe IV',
            name: 'Immortal Universe',
            id: 4
        }
    } else if (rank <= 13000000) {
        role = {
            rank: 'Celestial Multiverse I',
            name: 'Celestial Multiverse',
            id: 1
        }
    } else if (rank <= 13100000) {
        role = {
            rank: 'Celestial Multiverse II',
            name: 'Celestial Multiverse',
            id: 2
        }
    } else if (rank <= 13200000) {
        role = {
            rank: 'Celestial Multiverse III',
            name: 'Celestial Multiverse',
            id: 3
        }
    } else if (rank <= 13300000) {
        role = {
            rank: 'Celestial Multiverse IV',
            name: 'Celestial Multiverse',
            id: 4
        }
    } else if (rank <= 13400000) {
        role = {
            rank: 'Divine Omniverse I',
            name: 'Divine Omniverse',
            id: 1
        }
    } else if (rank <= 13500000) {
        role = {
            rank: 'Divine Omniverse II',
            name: 'Divine Omniverse',
            id: 2
        }
    } else if (rank <= 13600000) {
        role = {
            rank: 'Divine Omniverse III',
            name: 'Divine Omniverse',
            id: 3
        }
    } else if (rank <= 13700000) {
        role = {
            rank: 'Divine Omniverse IV',
            name: 'Divine Omniverse',
            id: 4
        }
    } else if (rank <= 13800000) {
        role = {
            rank: 'Titan Absolute I',
            name: 'Titan Absolute',
            id: 1
        }
    } else if (rank <= 13900000) {
        role = {
            rank: 'Titan Absolute II',
            name: 'Titan Absolute',
            id: 2
        }
    } else if (rank <= 14000000) {
        role = {
            rank: 'Titan Absolute III',
            name: 'Titan Absolute',
            id: 3
        }
    } else if (rank <= 14100000) {
        role = {
            rank: 'Titan Absolute IV',
            name: 'Titan Absolute',
            id: 4
        }
    } else if (rank <= 14200000) {
        role = {
            rank: 'Godlike Supreme I',
            name: 'Godlike Supreme',
            id: 1
        }
    } else if (rank <= 14300000) {
        role = {
            rank: 'Godlike Supreme II',
            name: 'Godlike Supreme',
            id: 2
        }
    } else if (rank <= 14400000) {
        role = {
            rank: 'Godlike Supreme III',
            name: 'Godlike Supreme',
            id: 3
        }
    } else if (rank <= 14500000) {
        role = {
            rank: 'Godlike Supreme IV',
            name: 'Godlike Supreme',
            id: 4
        }
    } else if (rank <= 15000000) {
        role = {
            rank: '✨ ULTIMATE LEGEND ✨',
            name: 'Ultimate Legend',
            id: 999
        }
    } else {
        role = {
            rank: '🏆 SUPREME GOD OF THE UNIVERSE 🏆',
            name: 'Supreme God',
            id: 9999
        }
    }
    
    return role
}//wm: ditss.
