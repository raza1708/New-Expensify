import {useEffect} from 'react';
import {DevSettings} from 'react-native';
import toggleTestToolsModal from '@userActions/TestTool';
import type CustomDevMenuElement from './types';
import React from 'react';

const CustomDevMenu: CustomDevMenuElement = Object.assign(
    () => {
        useEffect(() => {
            DevSettings.addMenuItem('Open Test Preferences', toggleTestToolsModal);
        }, []);
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <></>;
    },
    {
        displayName: 'CustomDevMenu',
    },
);

export default CustomDevMenu;
