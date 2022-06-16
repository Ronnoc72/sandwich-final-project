import { View, Text, StyleSheet } from 'react-native';

function SubTitle({ text }) {
    return (
        <View style={styles.rulesTitle}>
            <Text style={{ fontSize: 42 }}>{text[0]}</Text>
            <Text style={styles.smallTitleText}>{text.slice(1, text.length)}</Text>
        </View>
    );
}

export default SubTitle;

const styles = StyleSheet.create({
    rulesTitle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    smallTitleText: {
        fontSize: 24,
        marginTop: 18
    },
});