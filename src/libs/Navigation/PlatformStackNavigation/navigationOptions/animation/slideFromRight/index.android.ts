import type {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import Animations from '..';
import type SlideFromRightTransitionNavigationOptions from './types';

const transition: SlideFromRightTransitionNavigationOptions = {animation: Animations.SLIDE_FROM_RIGHT} satisfies NativeStackNavigationOptions;

export default transition;
