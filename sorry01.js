// Get references to the button and textarea
const writeButton = document.getElementById('writeButton');
const textArea = document.getElementById('textArea');
const cntInput = document.getElementById('cnt');

// returns int in [0, maxNum ]
const rndInt = function (maxNum) {
    return Math.floor(Math.random() * (maxNum+1) );
}


const cards = [
    { t: "Either move a pawn from Start or move a pawn one space forward.",
        n: 1,
        p: 5
    },
    { t: "Either move a pawn from Start or move a pawn two spaces forward.\n" +
      "Draw again",
        n: 2,
        p: 4
    },
    { t: "Move a pawn three spaces forward.",
        n: 3,
        p: 4
    },
     { t: "Move a pawn four spaces backward.",
        n: 4,
        p: 4
    },
    { t: "Move a pawn five spaces foward.",
        n: 5,
        p: 4
    },
    { t: "Move one pawn seven spaces forward,\n" + "or split the seven spaces between two pawns (such as four spaces for one pawn and three for another). ",
        n: 7,
        p: 4
    },
    { t: "Move a pawn eight spaces foward.",
        n: 8,
        p: 4
    },
    { t: "Move a pawn ten spaces forward or one space backward.\n" + "If none of a player's pawns can move forward 10 spaces, then one pawn must move back one space.",
        n: 10,
        p: 4
    },
    { t: "Move eleven spaces forward, or switch the places of one of the player's own pawns and an opponent's pawn.\n" + "A player who cannot move 11 spaces is not forced to switch and instead can end their turn.\n" + "An 11 cannot be used to switch a pawn that is in a Safety Zone, or to move a pawn out of Start.",
        n: 11,
        p: 4
    },
    { t: "Move a pawn twelve spaces forward.",
        n: 12,
        p: 4
    },
    { t: "Take any one pawn from Start and move it directly to a square occupied by any opponent's pawn, sending that pawn back to its own Start.\n" + "A Sorry! card cannot be used on an opponent's pawn in a Safety Zone or at the Home base.\n" + "If there are no pawns on the player's Start, or no opponent's pawns on any space that can be moved to, the turn ends.",
        n: "Sorry!",
        p: 4
    },
];

const normalizedProbs = function() {

  const sum = cards.reduce((accumulator, v) => accumulator + v.p, 0);
  return cards.map( x => x.p/sum);
}();


// returns one of the choices defined by probabilities[], between 0 and (probabilities.length-1)
const rndIntWithProb = function() {
    let log = true;
    if(log) {
        let y2 = 0.0;
        console.log('normalizedProbs[] cumulative:');
        for(j=0; j < normalizedProbs.length; j++) {
          y2 = y2 + normalizedProbs[j];
          console.log('[' + j +'] = ' + y2);
        }
    }
    let ret = normalizedProbs.length - 1;
    let x = Math.random();
    let y = 0.0;
    if(log) console.log('x = ' + x);
    for(j=0; j < normalizedProbs.length; j++) {
        y = y + normalizedProbs[j];
        if(log) console.log('j = ' +j + '  y = ' + y);
        if( x < y ) {
            ret = j;
            if(log) console.log('Returns ' +j);
            break;
        }
    }
    if(log) console.log('Returns==> ' + ret);
    return ret;
}


const cardTextGenerator = function() {
    

    //let cardIndex = rndInt(cards.length - 1);

    let cardIndex = rndIntWithProb();

    let card = cards[cardIndex];

    return "Card # " + card.n + "\n" + card.t;
}

let clickCount = 0;

// Add click event listener to the button
writeButton.addEventListener('click', function () {
    
    const currentText = cardTextGenerator();
    textArea.value = currentText;

    clickCount++;
    cntInput.value = "- " + clickCount + " -";

    textArea.style.backgroundColor = '#e8f5e8';
    setTimeout(() => {
        textArea.style.backgroundColor = '';
    }, 300);
});

/*
// Optional: Add functionality to clear the text area on double-click
textArea.addEventListener('dblclick', function () {
    textArea.value = '';
    textArea.placeholder = 'Text area cleared! ';

    setTimeout(() => {
        textArea.placeholder = 'Click the button below to get the next card ...';
    }, 2000);
});
*/