import { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';

import Rule from '../components/Rule';
import SubTitle from '../components/SubTitle';
import IconButton from '../components/ui/IconButton';
import { RULES, GOAL } from '../constants/rules';

function GoalPage({ onPress, backButton }) {
    const slideInAnim = useRef(new Animated.Value(2000)).current;

    useEffect(() => {
        Animated.timing(slideInAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
    }, []);

    return (
        <Animated.View style={[styles.rulesContainer, {right: slideInAnim}]}>
            <View style={styles.buttonContainer}>
                <IconButton icon='close' size={24} onPress={backButton}
                    outerBtnStyles={styles.backOuterButton} />
                <IconButton icon='arrow-back' size={24} onPress={() => {
                    Animated.timing(slideInAnim, {
                        toValue: 2000,
                        duration: 500,
                        useNativeDriver: false
                    }).start();
                    setTimeout(onPress, 200);
                }}
                    outerBtnStyles={styles.backOuterButton} />
            </View>
            <SubTitle text='GOALS' />
            <Text>{GOAL}</Text>
        </Animated.View>
    );
}

function RulePage({ onPress, backButton }) {
    const slideInAnim = useRef(new Animated.Value(2000)).current;

    useEffect(() => {
        Animated.timing(slideInAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
    }, []);

    const ruleElements = RULES.map((text) => {
        return <Rule key={text} text={text} />;
    });

    return (
        <Animated.View style={[styles.rulesContainer, {left: slideInAnim}]}>
            <View style={styles.buttonContainer}>
                <IconButton icon='close' size={24} onPress={backButton}
                    outerBtnStyles={styles.backOuterButton} />
                <IconButton icon='arrow-forward' size={24} onPress={() => {
                    Animated.timing(slideInAnim, {
                        toValue: 2000,
                        duration: 500,
                        useNativeDriver: false
                    }).start();
                    setTimeout(onPress, 200);
                }}
                    outerBtnStyles={styles.backOuterButton} />
            </View>
            <SubTitle text='RULES' />
            <View style={styles.ruleElementStyles}>{ruleElements}</View>
        </Animated.View>
    );
}

function RulesScreen({ navigation }) {
    const [screenShown, setScreenShown] = useState(true);    

    function changeScreens() {
        setScreenShown(current => !current);
    }

    function backButtonHandler() {
        navigation.navigate('TitlePage');
    }

    return (
        <>
            {screenShown ? <RulePage onPress={changeScreens} backButton={backButtonHandler} /> : 
                <GoalPage onPress={changeScreens} backButton={backButtonHandler} />}
        </>
    );
}

export default RulesScreen;

const styles = StyleSheet.create({
    rulesContainer: {
        flex: 1,
        marginVertical: 52,
        marginHorizontal: 12,
        height: '80%'
    },
    ruleElementStyles: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    backOuterButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 3
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});