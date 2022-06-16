import { View, Text, Image, StyleSheet, Animated } from 'react-native';

function Card({ addTransforms, normalStyles, face, suit, flipped=true }) {

    return (
        <Animated.View style={[styles.cardContainer, addTransforms, normalStyles]}>
            {flipped ? <Image style={styles.image} source={require('../../assets/card-back.jpg')} /> : <View style={styles.flippedCard}></View>}
            <View style={styles.innerContainer}>
                <Text>{face}{suit}</Text>
                <Text style={{transform: [{rotate: '180deg'}]}}>{face}{suit}</Text>
            </View>
        </Animated.View>
    );
}

export default Card;

const styles = StyleSheet.create({
    cardContainer: {},
    image: {
        width: 100,
        height: 150,
        borderRadius: 8
    },
    innerContainer: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexDirection: 'row'
    },
    flippedCard: {
        backgroundColor: 'white',
        width: 100,
        height: 150,
        borderRadius: 8
    }
});