import type {ViewStyle} from 'react-native';
import overflowAuto from './overflowAuto';
// import overscrollBehaviorContain from './overscrollBehaviorContain';

/**
 * Overflow utility styles with Bootstrap inspired naming.
 *
 * https://getbootstrap.com/docs/5.0/utilities/overflow/
 */
export default {
    overflowHidden: {
        overflow: 'hidden',
    },

    overflowVisible: {
        overflow: 'visible',
    },

    overflowScroll: {
        overflow: 'scroll',
    },
    overflowAuto,

    overscrollBehaviorXNone: {
        // overscrollBehaviorX: 'none',
    },

    overscrollBehaviorContain: {}

   
} satisfies Record<string, ViewStyle>;
