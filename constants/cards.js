suits = ['♦', '♠', '♥', '♣'];
faces = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

const cardsArray = [];

for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < faces.length; j++) {
        cardsArray.push([suits[i], faces[j]]);
    }
}

export default cardsArray;

export const key = {
    'A': 4,
    'K': 3,
    'Q': 2,
    'J': 1
};
