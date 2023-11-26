import { StyleSheet } from 'react-native';
import { color_percent, rootColor } from '../InitData/init';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
    },

    itemGroup: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemLeft: {
        flex: 8,
        flexDirection: 'row',
    },
    percent: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 7,
        borderColor: color_percent,
    },
    pecentText: {
        color: rootColor,
        fontSize: 14,
        fontWeight: '700',
    },
    grVocabulary: {
        flex: 1,
        paddingHorizontal: 15,
    },
    vocabylary: {
        color: rootColor,
        fontSize: 22,
        fontWeight: '600',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    grSubTop: {
        width: '100%',
        height: 50,
        borderBottomWidth: 5,
        borderBottomColor: rootColor,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 40,
    },
    subIcon: {
        marginHorizontal: 16,
    },
    subGrAudio: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    spelling: {
        fontSize: 15,
    },
    type: {
        marginTop: 10,
        color: 'gray',
        fontSize: 15,
        textDecorationLine: 'underline',
        fontWeight: '500',
    },
    mean: {
        color: '#39B1FF',
        fontSize: 15,
        fontWeight: '500',
    },
    description: {
        marginVertical: 10,
    },
    example: {
        lineHeight: 20,
        marginBottom: 10,
    },
});
