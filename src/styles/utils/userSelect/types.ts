import type {TextStyle} from 'react-native';

type UserSelectStyles = Record<'userSelectText' | 'userSelectNone', Pick<TextStyle, 'userSelect'>>;

export default UserSelectStyles;
