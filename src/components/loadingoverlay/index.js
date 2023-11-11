import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { ActivityIndicator } from 'react-native'

export default function LoadingOverLay() {
    const loadingLayout = useSelector(state => state.loadingLayout.isLoading);
    
    return (
    
            loadingLayout
            ? 
            <View style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                opacity: 0.5,
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                    <ActivityIndicator size="large" color="#fff" />
            </View>
            :
            <View>
            </View>
        
        
    )
}