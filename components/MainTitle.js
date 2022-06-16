import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

function MainTitle() {
    return (
        <View style={styles.titleContainer}>
            <Text style={[styles.title, { fontSize: 45 }]}>S</Text>
            <Text style={[styles.title, styles.smallTitleText]}> A N D</Text>
            <Text style={[styles.title, { fontSize: 45 }]}> W</Text>
            <Text style={[styles.title, styles.smallTitleText]}> I C H</Text>
        </View>
    )
}

export default MainTitle;

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        padding: 12,
        backgroundColor: Colors.green100
    },
    title: {
        fontSize: 36,
        color: Colors.burgundy,
    },
    smallTitleText: {
        color: Colors.gray50,
        marginVertical: 10,
        borderBottomWidth: 2,
        borderColor: Colors.gray50
    }
});