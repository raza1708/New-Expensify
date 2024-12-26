import { ViewStyle } from 'react-native';

// Extending ViewStyle to include the 'visibility' property
type ExtendedViewStyle = ViewStyle & {
  visibility?: 'visible' | 'hidden'; // Adding the 'visibility' property
};

type VisibilityStyles = Record<'visible' | 'hidden', Pick<ExtendedViewStyle, 'visibility'>>;

export default VisibilityStyles;
