import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

function CustomButton({ text, onPress, textStyles, btnStyles, outerBtnStyles }) {
    return (
        <Pressable android_ripple={true} style={[styles.buttonContainer, outerBtnStyles]} 
            onPress={onPress}>
            <View style={btnStyles}>
                <Text style={[styles.text, textStyles]}>{text}</Text>
            </View>
        </Pressable>
    );
}

export default CustomButton;

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: Colors.green50,
        opacity: 0.7,
        padding: 12,
        borderRadius: 8
    },
    text: {
        color: Colors.burgundy,
        fontSize: 16
    }
});