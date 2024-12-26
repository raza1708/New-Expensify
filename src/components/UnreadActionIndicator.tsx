import React from 'react';
import {View, ViewStyle} from 'react-native';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import CONST from '@src/CONST';
import Text from './Text';

type UnreadActionIndicatorProps = {
    /** The ID of the report action */
    reportActionID: string;

    /** Whether we should hide thread divider line */
    shouldHideThreadDividerLine?: boolean;
};

function UnreadActionIndicator({reportActionID, shouldHideThreadDividerLine}: UnreadActionIndicatorProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const containerStyle = shouldHideThreadDividerLine ? styles.topUnreadIndicatorContainer : styles.unreadIndicatorContainer;

    return (
        <View
            accessibilityLabel={translate('accessibilityHints.newMessageLineIndicator')}
            data-action-id={reportActionID}
            style={[containerStyle, styles.userSelectNone as ViewStyle, styles.pointerEventsNone]}
            data-selection-scrapper-hidden-element = {true}
            // dataSet={{[CONST.SELECTION_SCRAPER_HIDDEN_ELEMENT]: true}}
        >
            <View style={styles.unreadIndicatorLine} />
            <Text style={styles.unreadIndicatorText}>{translate('common.new')}</Text>
        </View>
    );
}

UnreadActionIndicator.displayName = 'UnreadActionIndicator';

export default UnreadActionIndicator;
