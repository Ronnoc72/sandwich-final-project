import { View, Text, StyleSheet } from 'react-native';

import CustomButton from '../components/ui/CustomButton';
import MainTitle from '../components/MainTitle';
import { Colors } from '../constants/colors';

function TitlePage({ navigation }) {
    function rulesButtonHandler() {
        navigation.navigate('RulesPage');
    }

    function playButtonHandler() {
        navigation.navigate('PlayPage');
    }

    function pastGameButtonHandler() {
        navigation.navigate('PastGamePage');
    }

    return (
        <View style={styles.container}>
            <MainTitle />
            <View style={styles.buttonContainer}>
                <CustomButton text='Rules' textStyles={styles.generalButtonText} 
                    btnStyles={styles.generalButton} outerBtnStyles={styles.generalOuterButton} 
                    onPress={rulesButtonHandler} />
                <CustomButton text='Play' textStyles={styles.generalButtonText}
                    btnStyles={styles.generalButton} outerBtnStyles={styles.generalOuterButton} 
                    onPress={playButtonHandler} />
                <CustomButton text='Previous Games' textStyles={styles.generalButtonText}
                    btnStyles={styles.generalButton} outerBtnStyles={styles.generalOuterButton} 
                    onPress={pastGameButtonHandler} />
            </View>
        </View>
    )
}

export default TitlePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 52,
        marginHorizontal: 12
    },
    buttonContainer: {
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%'
    },
    generalButtonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 26
    },
    generalButton: {
        width: 200,
        borderRadius: 8
    },
    generalOuterButton: {
        marginTop: 16,
        elevation: 4,
        shadowColor: 'black'
    }
});