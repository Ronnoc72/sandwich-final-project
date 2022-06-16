import { View, Text, StyleSheet } from 'react-native';
import { RULES } from '../constants/rules';
import { Colors } from '../constants/colors';

function Rule({ text }) {
    return (
        <View style={styles.ruleElement}>
            <Text style={styles.ruleNumber}>{RULES.indexOf(text)+1}</Text>
            <Text key={RULES.indexOf(text)} style={styles.ruleText}>{text}</Text>
        </View>
    )
}

export default Rule;

const styles = StyleSheet.create({
    ruleNumber: {
        fontSize: 24,
        textAlign: 'center',
        borderBottomWidth: 2
    },
    ruleElement: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#CDD3CE',
        elevation: 4,
        shadowColor: 'black'
    },
    ruleText: {
        fontSize: 16,
        color: Colors.green50
    }
});