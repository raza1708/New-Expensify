import { TextStyle } from "react-native";


// I have made this file just to store these properties, so, Add these properties in a file that contains StyleSheet of react-native i.e. node_modules/react-native/Libraries/StyleSheet/StyleSheetTypes.d.ts
export interface ExtendedStyle extends TextStyle {
  whiteSpace?: 'nowrap' | 'pre-wrap' | 'pre';            // You can specify other values if needed
  wordBreak?: 'break-word' | 'break-all';          
  textUnderlinePosition?: 'under' | 'left' | 'right';
  textDecorationSkipInk?: 'auto' | 'none';
  visibility?: 'visible' | 'hidden';

  }

