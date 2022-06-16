import * as SQLite from 'expo-sqlite';
import { Game } from '../models/game';

const database = SQLite.openDatabase('pastGames.db');

export function init() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS games (
                id INTEGER PRIMARY KEY NOT NULL,
                playerWon TEXT NOT NULL,
                amountSlapped INT NOT NULL,
                playerTurns INT NOT NULL
            )`, [],
            () => {
                resolve();
            },
            (_, error) => {
                reject(error);
            });
        });
    });
    return promise;
}

export function dropTable() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`DROP TABLE games`, [],
            () => {
                resolve();
            },
            (_, error) => {
                reject(error);
            });
        });
    });
    return promise;
}

export function insertGame(game) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`INSERT INTO games (playerWon, amountSlapped, playerTurns) VALUES (?, ?, ?)`,
            [game.playerWon, game.amountSlapped, game.playerTurns],
            (_, result) => {
                resolve(result);
            },
            (_, error) => {
                reject(error);
            });
        });
    });

    return promise;
}

export function deleteGame(id) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`DELETE FROM games WHERE id=${id}`, [],
            () => {
                resolve();
            },
            (_, error) => {
                reject(error);
            });
        });
    });
}

export function fetchGames() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`SELECT * FROM games`, [],
            (_, result) => {
                const games = [];

                for (const dg of result.rows._array) {
                    games.push(new Game(dg.id, dg.playerWon, dg.amountSlapped, dg.playerTurns));
                }

                resolve(games);
            },
            (_, error) => {
                reject(error);
            });
        });
    });
    return promise;
}