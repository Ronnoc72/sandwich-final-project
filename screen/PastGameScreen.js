import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SubTitle from '../components/SubTitle';
import PastGameElement from '../components/PastGameElement';

import { fetchGames, deleteGame } from '../util/database';
import { Game } from '../models/game';

let index = 0;

function PastGameScreen() {
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
    }
});