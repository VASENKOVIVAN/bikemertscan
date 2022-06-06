import * as React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'


export const AppHeaderIcon = (props) => (
    <HeaderButton
        {...props}
        iconSize={34}
        style={{ marginRight: -18 }}
        IconComponent={MaterialIcons}
        // color= {THEME.MAIN_COLOR}
        color='white'
    // onPress={navigation.navigate('ProfileScreen')}

    />
)