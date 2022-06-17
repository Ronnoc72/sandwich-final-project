import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Easing } from 'react-native';

import { insertGame } from '../util/database';

import Card from '../components/game/Card';
import Hand from '../components/game/Hand';
import IconButton from '../components/ui/IconButton';
import CustomButton from '../components/ui/CustomButton';

import cardsArray from '../constants/cards';
import { key } from '../constants/cards';
import { Game } from '../models/game';
import { Colors } from '../constants/colors';

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

let playerOneCards;
let playerTwoCards;

let timers = [];
let otherTimers = [];

function clearAllTimers() {
    if (timers.length > 0) {
        for (let i = 0; i < timers.length; i++) {
            clearInterval(timers[i]);
        }
        timers = [];
    }
    if (otherTimers.length > 0) {
        for (let i = 0; i < otherTimers.length; i++) {
            clearTimeout(otherTimers[i]);
        }
        otherTimers = [];
    }
}

function start() {
    let copy = [...cardsArray];
    let cardsArrayCopy = shuffle(copy);
    playerOneCards = cardsArrayCopy.splice(0, 26);
    playerTwoCards = cardsArrayCopy;
}

start();

function PlayScreen() {
    // true is player one and false is player two.
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [playerTurn, setPlayerTurn] = useState(true);
    const [index, setIndex] = useState(0);
    const [slidingCard, setSlidingCard] = useState();
    const [cards, setCards] = useState([]);
    const [pureCards, setPureCards] = useState([]);
    const [cantPress, setCantPress] = useState(false);
    const [faceCard, setFaceCard] = useState([]);
    const [addNewCards, setAddNewCards] = useState(false);
    const [animation, setAnimation] = useState([]);
    const [winnerText, setWinnerText] = useState();
    const [amountSlapped, setAmountSlapped] = useState(0);
    const [playerTurns, setPlayerTurns] = useState(0);
    const [makeSliding, setMakeSliding] = useState([]);

    const slideInAnim = useRef(new Animated.Value(0)).current;

    function reset() {
        setWinnerText('');
        setAmountSlapped(0);
        setPlayerTurns(0);
        setPlayerTurn(true);
        setIndex(0);
        setSlidingCard(null);
        setCards([]);
        setPureCards([]);
        setCantPress(false);
        setFaceCard([]);
        setAddNewCards(false);
        setAnimation([]);
        setMakeSliding([]);
    }

    useEffect(() => {
        if (typeof winnerText === 'string') return;
        if (cantPress) {
            setPlayerTurns(playerTurns + 1);
            let current;
            if (playerTurn) {
                current = playerOneCards.pop();
            } else {
                current = playerTwoCards.pop();
            }
            setAnimation([current, playerTurn]);
            setFaceCard(current);
            setPlayerTurn(!playerTurn);
        }
    }, [cantPress]);

    useEffect(() => {
        if (typeof winnerText === 'string') return;
        if (animation) {
            animatingCard(animation[0], animation[1]);
        }
    }, [animation[0]]);

    useEffect(() => {
        if (typeof winnerText === 'string') return;
        if (faceCard === undefined) return;
        if (faceCard.length > 0) {
            if (faceCard[1] === undefined) return;
            faceCardHandler(faceCard[1], playerTurn);
            setFaceCard([]);
        }
    }, [faceCard[1]]);

    useEffect(() => {
        if (typeof winnerText === 'string') return;
        if (addNewCards) {
            if (!playerTurn) {
                for (let i = 0;  i < pureCards.length; i++) {
                    playerOneCards.push(pureCards[i]);
                }
            } else {
                for (let i = 0; i < pureCards.length; i++) {
                    playerTwoCards.push(pureCards[i]);
                }
            }
            setCards([]);
            setPureCards([]);
        }
        setAddNewCards(false);
    }, [addNewCards]);

    useEffect(() => {
        if (typeof winnerText === 'string') return;
        if (makeSliding.length > 0) {
            if (makeSliding[1]) {
                setSlidingCard(<Card normalStyles={{position: 'absolute', 
                    bottom: slideInAnim, left: (windowWidth/2)-50}}
                    addTransforms={{transform: [{rotate: `${makeSliding[2]}deg`}]}}
                    suit={makeSliding[0][0]} face={makeSliding[0][1]} flipped={false} />);
            } else {
                setSlidingCard(<Card normalStyles={{position: 'absolute', 
                    top: slideInAnim, left: (windowWidth/2)-50}}
                    addTransforms={{transform: [{rotate: `${makeSliding[2]}deg`}]}}
                    suit={makeSliding[0][0]} face={makeSliding[0][1]} flipped={false} />);
            }
            Animated.timing(slideInAnim, {
                toValue: (windowHeight/2)-50,
                duration: 500,
                useNativeDriver: false,
                easing: Easing.out(Easing.exp)
            }).start();
            setMakeSliding([]);
        }
    }, [makeSliding[0]]);

    function faceCardTimer(cardCount, newPlayerTurn, playerArray) {
        setCantPress(false);
        let turnIndex = 0;
        let innerTimer;
        const timer = setInterval(() => {
            timers.push(timer);
            const card = playerArray.pop();
            if (card === undefined) {
                clearAllTimers();
                return;
            }
            if (card[1] == 'A' || card[1] == 'K' || card[1] == 'Q' || card[1] == 'J') {
                turnIndex++;
                clearAllTimers();
                faceCardHandler(card[1], !newPlayerTurn);
            }
            if (turnIndex >= cardCount) {
                turnIndex++;
                clearAllTimers();
                setAddNewCards(true);
                return;
            }
            innerTimer = setTimeout(() => {
                console.log('timer');
                otherTimers.push(innerTimer);
                turnIndex++;
                if (turnIndex <= cardCount) {
                    setAnimation([card, newPlayerTurn]);
                }
            }, 1250);
        }, 1250);
    }

    function faceCardHandler(face, newPlayerTurn) {
        if (!isNaN(face)) return;
        const cardCount = key[face];
        if (newPlayerTurn) {
            faceCardTimer(cardCount, newPlayerTurn, playerOneCards);
        } else {
            faceCardTimer(cardCount, newPlayerTurn, playerTwoCards);
        }
    }

    async function endGame() {
        if (playerOneCards.length > 0 && playerTwoCards.length > 0) return;
        const playerWon = playerOneCards.length === 0;
        setCantPress(true);
        if (playerWon) {
            setWinnerText('Player Two Wins');
            const response = await insertGame(new Game(0, 'Player One', amountSlapped, playerTurns));
        } else {
            setWinnerText('Player One Wins');
            const response = await insertGame(new Game(0, 'Player Two', amountSlapped, playerTurns));
        }
    }

    function animatingCard(card, currentPlayer) {
        if (card === undefined) return;
        const randomRotate = (Math.random()*50)-25;
        setMakeSliding([card, currentPlayer, randomRotate]);
        setTimeout(() => {
            if (currentPlayer) {
                setCards([...cards, <Card normalStyles={{position: 'absolute', 
                    left: (windowWidth/2)-50, bottom: (windowHeight/2)-50}} key={index}
                    addTransforms={{transform: [{rotate: `${randomRotate}deg`}]}}
                    suit={card[0]} face={card[1]} flipped={false} />]);
                setPureCards([...pureCards, [card[0], card[1]]]);
            } else {
                setCards([...cards, <Card normalStyles={{position: 'absolute', 
                    left: (windowWidth/2)-50, top: (windowHeight/2)-50}} key={index}
                    addTransforms={{transform: [{rotate: `${randomRotate}deg`}]}}
                    suit={card[0]} face={card[1]} flipped={false} />]);
                setPureCards([...pureCards, [card[0], card[1]]]);
            }
            setSlidingCard(null);
            setIndex(index + 1);
            Animated.timing(slideInAnim, {
                toValue: 0,
                duration: 1,
                useNativeDriver: false
            }).start();
            setCantPress(false);
            endGame();
        }, 1000);
        endGame();
    }

    function slideCardHandler() {
        setCantPress(true);
    }

    function slap(player) {
        setAmountSlapped(amountSlapped + 1);
        if (pureCards.length == 0 || pureCards.length == 1) return;
        const slapCard = pureCards[pureCards.length-1];
        if (pureCards[pureCards.length-2][1] == slapCard[1]) {
            setAddNewCards(true);
            if (pureCards.length > 2) {
                if (pureCards[pureCards.length-3][1] == slapCard[1]) {
                    setAddNewCards(true);
                }
            }
            setPureCards([]);
            setCards([]);
        } else {
            if (player) {
                for (let i = 0; i < 2; i++) {
                    setIndex(index + 1);
                    const discard = playerOneCards.pop();
                    if (discard === undefined) return;
                    setPureCards([...pureCards, discard]);
                    setCards([<Card normalStyles={{position: 'absolute', 
                        left: (windowWidth/2)-50, top: (windowHeight/2)-50}} key={index}
                        addTransforms={{transform: [{rotate: `0deg`}]}}
                        suit={discard[0]} face={discard[1]} flipped={false} />, ...cards]);
                }
            } else {
                for (let i = 0; i < 2; i++) {
                    setIndex(index + 1);
                    const discard = playerTwoCards.pop();
                    if (discard === undefined) return;
                    setPureCards([...pureCards, discard]);
                    setCards([<Card normalStyles={{position: 'absolute', 
                        left: (windowWidth/2)-50, top: (windowHeight/2)-50}} key={index}
                        addTransforms={{transform: [{rotate: `0deg`}]}}
                        suit={discard[0]} face={discard[1]} flipped={false} />, ...cards]);
                }
            }
        }
    }

    if (winnerText) {
        return (
            <View style={styles.gameOverContainer}>
                <Text style={styles.gameOverText}>{winnerText}</Text>
                <CustomButton text='Again?' outerBtnStyles={{opacity: 1}} 
                textStyles={{color: 'black'}} onPress={() => {
                    start();
                    reset();
                }} />
            </View>
        );
    }


    return (
        <View style={styles.gameContainer}>
            {/* Player Two Section */}
            <View style={styles.slides}>
                <View style={[styles.playerCard, {left: windowWidth-100, top: 20, transform: [{rotate: '180deg'}]}]}>
                    <Text style={[styles.playerCardText, {fontWeight: 'bold'}]}>Cards: </Text>
                    <Text style={[styles.playerCardText, {color: Colors.green100}]}>{playerTwoCards.length}</Text>
                </View>
                <Hand handRotation={{transform: [{rotate: '0deg'}]}} slideCard={slideCardHandler} 
                    isDisabled={faceCard.length > 0 || cantPress} />
                <IconButton icon='star' size={36} 
                    outerBtnStyles={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => {
                        slap(0);
                    }} isDisabled={cantPress || faceCard.length > 0} />
            </View>
            {/* Player One Section */}
            <View style={styles.slides}>
                <IconButton icon='star' size={36} 
                    outerBtnStyles={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center', left: windowWidth-100}}
                    onPress={() => {
                        slap(1);
                    }} isDisabled={cantPress || faceCard.length > 0} />
                <Hand handRotation={{transform: [{rotate: '180deg'}]}} slideCard={slideCardHandler}
                    isDisabled={faceCard.length > 0 || cantPress} />
                <View style={[styles.playerCard, {bottom: 10, left: 10}]}>
                    <Text style={[styles.playerCardText, {fontWeight: 'bold'}]}>Cards: </Text>
                    <Text style={[styles.playerCardText, {color: Colors.green100}]}>{playerOneCards.length}</Text>
                </View>
            </View>
            {cards.map(elm => elm)}
            {slidingCard}
        </View>
    );
}

export default PlayScreen;

const styles = StyleSheet.create({
    gameContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    slides: {
        
    },
    playerCardText: {
        fontSize: 20,
        color: Colors.gray100
    },
    gameOverContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameOverText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 42
    },
    playerCard: {
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: Colors.green50,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black'
    }
});