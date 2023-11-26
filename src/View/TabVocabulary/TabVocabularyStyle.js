import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        paddingHorizontal: 20,
    },
    tabItem: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 15,
        flex: 2,
    },
    imgbackgroundsStyle: {
        justifyContent: 'center',
        width: 160,
        height: 160,
        borderRadius: 20,
        padding: 2,
    },
    bgLayer: {
        flex: 1,
        backgroundColor: 'rgba(0,0, 0,0.3)',
        borderRadius: 15,
        justifyContent: 'flex-end',
    },
    words: {
        color: '#ffff',
        fontSize: 16,
        fontWeight: '700',
        marginHorizontal: 15,
    },
    grItem: {
        width: '85%',
        alignSelf: 'center',
        marginVertical: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textCheck: {
        color: '#0287E5',
        fontSize: 15,
        fontWeight: '400',
    },
    textTime: {
        color: '#1ED15E',
        fontSize: 15,
        fontWeight: '400',
    },
    ///// thu muc
    textLib: {
        color: '#AAAAAA',
        fontSize: 20,
        fontWeight: '600',
    },
    ////
    lib: {
        flex: 3,
        width: '90%',
        alignSelf: 'center',
    },
    bottom: {
        alignSelf: 'center',
        width: '90%',
        flex: 2,
    },
});
