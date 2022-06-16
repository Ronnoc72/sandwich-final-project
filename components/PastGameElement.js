import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

import IconButton from './ui/IconButton';

function PastGameElement({ item, onPress }) {

    if (item.playerWon === '') {
        return (
            <View style={[styles.rootContainer, 
                {backgroundColor: Colors.background, elevation: 0}]}></View>
        );
    }

    return (
        <View style={styles.rootContainer}>
            <IconButton icon='close' size={24} 
                outerBtnStyles={styles.btnStyles} onPress={onPress} />
            <View style={styles.slide}>
                <Text style={styles.textStyles}>Player Won: </Text>
                <Text style={styles.secondTextStyles}>{item.playerWon}</Text>
            </View>
            <View style={styles.slide}>
                <Text style={styles.textStyles}>Amount Slapped: </Text>
                <Text style={styles.secondTextStyles}>{item.amountSlapped}</Text>
            </View>
            <View style={styles.slide}>
                <Text style={styles.textStyles}>Player's Turns: </Text>
                <Text style={styles.secondTextStyles}>{item.playerTurns}</Text>
            </View>
        </View>
    );
}

export default PastGameElement;

const styles = StyleSheet.create({
    rootContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '90%',
        height: 120,
        margin: 20,
        backgroundColor: Colors.green50,
        elevation: 4,
        shadowColor: 'black',
        borderRadius: 8,
        padding: 42,
    },
    slide: {
        flexDirection: 'row'
    },
    textStyles: {
        color: Colors.gainsboro,
        fontSize: 22
    },
    secondTextStyles: {
        fontSize: 18,
        color: Colors.green100,
        top: 4
    },
    btnStyles: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        height: 50
    }
});