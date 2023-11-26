import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemGroup: {
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    itemLeft: {
        flex: 8,
        backgroundColor: 'red',
    },
    itemRight: {
        flex: 4,
        backgroundColor: 'blue',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },

    grItem: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    textCheck: {
        color: '#0287E5',
        fontSize: 13,
        fontWeight: '600',
    },
    textTime: {
        color: '#1ED15E',
        fontSize: 13,
        fontWeight: '600',
    },
});
