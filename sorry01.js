// Get references to the button and textarea
const writeButton = document.getElementById('writeButton');
const textArea = document.getElementById('textArea');
const cntInput = document.getElementById('cnt');

// returns int in [0, maxNum ]
const rndInt = function (maxNum) {
    return Math.floor(Math.random() * (maxNum+1) );
}

// relative probablity of each option
const probabilities = [
   10, // [0]
   20, // [1]
   2, // [2]
   2, // [3]
   1, // [4]
   1, // [5]
   1, // [6]
   9 // [7] 
];

const normalizedProbs = function() {
  const sum = probabilities.reduce((accumulator, v) => accumulator + v, 0);
  return probabilities.map( x => x/sum);
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

const cards = [
    "Card 0 text",
    "Card One text",
    "Card two text",
    "Card 3",
    "Card 4 text",
    "Card 5 text",
    "Card 6 text",
    "Card 7 text",
];

const cardTextGenerator = function() {
    let n = rndIntWithProb(); // rndInt(7); // 0..7
    let txt = cards[n];
    return "Your Number is " + n + "   \n" + txt;
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