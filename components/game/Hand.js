import { View, Text, StyleSheet, Pressable } from 'react-native';

import Card from './Card';

function Hand({ handRotation, slideCard, isDisabled }) {
    return (
        <Pressable onPress={slideCard} disabled={isDisabled}>
            <View style={[styles.deckContainer, handRotation]}>
                <Card addTransforms={{transform: [{translateX: -75}, {rotate: '75deg'}, {translateY: -120}]}} />
                <Card addTransforms={{transform: [{translateX: -65}, {rotate: '45deg'}, {translateY: -25}]}} />
                <Card addTransforms={{transform: [{translateX: -100}, {rotate: '0deg'}]}} />
            </View>
        </Pressable>
    );
}

export default Hand;

const styles = StyleSheet.create({
    deckContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});