import { ImageStyle } from 'react-native';
export default {
    oFCover: {
        objectFit: 'cover',
    },
    oFFill: {
        objectFit: 'fill',
    },
    oFContain: {
        objectFit: 'contain',
    },
    oFNone: {
        objectFit: 'scale-down',
    },
} satisfies Record<string, ImageStyle>;
