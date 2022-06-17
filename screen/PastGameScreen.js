import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SubTitle from '../components/SubTitle';
import PastGameElement from '../components/PastGameElement';
import IconButton from '../components/ui/IconButton';

import { fetchGames, deleteGame } from '../util/database';
import { Game } from '../models/game';

let index = 0;

function PastGameScreen({ navigation }) {
    const [loadedGames, setLoadedGames] = useState([]);
    const isFocused = useIsFocused();

    async function btnDeleteHandler(id) {
        await deleteGame(id);
        loadGames();
    }

    async function loadGames() {
        const games = await fetchGames();
        games.push(new Game(-1, '', 0, 0));
        setLoadedGames(games);
    }

    function backButtonHandler() {
        navigation.navigate('TitlePage');
    }
    
    useEffect(() => {
        if (isFocused) {
            loadGames();
        }
    }, [isFocused]);

    if (!loadedGames || loadedGames.length === 1) {
        return (
            <View style={styles.rootContainer}>
                <Text style={styles.fallbackText}>No games added yet - start playing.</Text>
            </View>
        )
    }

    return (
        <View style={styles.rootContainer}>
            <IconButton icon='close' size={20} onPress={backButtonHandler}
                    outerBtnStyles={styles.backOuterButton} />
            <View style={styles.title}>
                <SubTitle text='PREVIOUS ' />
                <SubTitle text='GAMES' />
            </View>
            <View style={styles.listContainer}>
                <FlatList data={loadedGames} keyExtractor={(item) => {
                        index++;
                        return index;
                    }}
                    renderItem={({item}) => {
                        index++;
                        return (<PastGameElement key={index} item={item} 
                            id={item.id} onPress={() => btnDeleteHandler(item.id)} />);
                    }} />
            </View>
        </View>
    );
}

export default PastGameScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginVertical: 28
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    listContainer: {
        alignItems: 'center',
        marginHorizontal: 16
    },
    backOuterButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 3,
        margin: 5
    }
});