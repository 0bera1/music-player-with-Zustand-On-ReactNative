import { colors, fontSizes } from '@/constants/tokens';
import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container2: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 130,
    },
    text: {
        fontSize: fontSizes.base,
        color: colors.text,
    },
});

export const utilsStyles = StyleSheet.create({
    centredRow:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    itemSeperator:{
        borderColor:colors.textMuted,
        borderWidth: StyleSheet.hairlineWidth,
        opacity:0.35
    },
    emptyContentText:{
        ...defaultStyles.text,
        fontSize:fontSizes.sm,
        textAlign:'center',
        marginVertical:20,
        color:colors.textMuted
    },
    emptyContentImage:{
        width:200,
        height:200,
        alignSelf:'center',
        marginVertical:20,
        opacity:0.3
    },
    slider:{
        height:7,
        borderRadius:15,
    }

});