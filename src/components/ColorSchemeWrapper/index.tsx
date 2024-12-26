import React from 'react';
import {View, ViewStyle} from 'react-native';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';

function ColorSchemeWrapper({children}: React.PropsWithChildren): React.ReactElement {
    const theme = useTheme();
    const styles = useThemeStyles();

    return <View style={[styles.flex1, styles.colorSchemeStyle(theme.colorScheme) as ViewStyle]}>{children}</View>;
}

export default ColorSchemeWrapper;
