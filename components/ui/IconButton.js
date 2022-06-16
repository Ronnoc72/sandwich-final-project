import { Ionicons } from '@expo/vector-icons';
import { View, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

function IconButton({ icon, size, onPress, btnStyles, outerBtnStyles, isDisabled }) {
    return (
        <Pressable disabled={isDisabled} android_ripple={true} style={[styles.buttonContainer, outerBtnStyles]} 
            onPress={onPress}>
            <View style={btnStyles}>
                <Ionicons name={icon} size={size} />
            </View>
        </Pressable>
    );
}

export default IconButton;

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