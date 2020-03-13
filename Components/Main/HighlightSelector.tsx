import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const HighlightSelector = props => {
    return (
        <View style={props.style}>
            <View style={[styles.Main]}>
                <View style={styles.Row}>
                    <TouchableOpacity
                        style={[styles.Surface, { backgroundColor: 'red' }]}
                    />
                    <TouchableOpacity
                        style={[styles.Surface, { backgroundColor: 'orange' }]}
                    />
                    <TouchableOpacity
                        style={[styles.Surface, { backgroundColor: 'yellow' }]}
                    />
                </View>
                <View style={styles.Row}>
                    <TouchableOpacity
                        style={[styles.Surface, { backgroundColor: 'green' }]}
                    />
                    <TouchableOpacity
                        style={[styles.Surface, { backgroundColor: 'blue' }]}
                    />
                    <TouchableOpacity
                        style={[styles.Surface, { backgroundColor: 'indigo' }]}
                    />
                </View>
                <View style={styles.Row}>
                    <TouchableOpacity
                        style={[styles.Surface, { backgroundColor: 'violet' }]}
                    />
                    <TouchableOpacity
                        style={[styles.Surface, { backgroundColor: 'gray' }]}
                    />
                    <TouchableOpacity
                        style={[styles.Surface, { backgroundColor: 'black' }]}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Main: {
        alignSelf: 'flex-end',
        backgroundColor: '#D3D3D3',
        marginRight: 5,
        minHeight: 25,
        minWidth: 50,
    },
    Row: {
        display: 'flex',
        flexDirection: 'row',
    },
    Surface: {
        margin: 5,
        minHeight: 30,
        minWidth: 30,
    },
});
export default HighlightSelector;
