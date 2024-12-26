import type { ViewStyle } from 'react-native';

// Extending the ViewStyle type to include overscrollBehavior for web
interface WebViewStyle extends ViewStyle {
  overscrollBehavior?: 'auto' | 'contain' | 'none' | 'inherit';
}

type OverscrollBehaviorStyles = Pick<WebViewStyle, 'overscrollBehavior'>;

export default OverscrollBehaviorStyles;
