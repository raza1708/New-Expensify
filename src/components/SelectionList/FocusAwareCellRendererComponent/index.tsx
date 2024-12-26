import { View, ViewProps } from 'react-native';
import React from 'react';
import type { FocusEventHandler } from 'react';
import type { ListItem } from '@components/SelectionList/types';

interface CellRendererProps<TItem> extends ViewProps {
    onFocusCapture?: ((event: FocusEventHandler) => void) | undefined;
    cellKey: string;
    children: React.ReactNode;
    index: number;
    item: TItem;
}

function FocusAwareCellRendererComponent<TItem extends ListItem>({ onFocusCapture, ...rest }: CellRendererProps<TItem>) {
    return (
        <View
            {...rest}
            // Forward bubbled events to VirtualizedList's captured handler which is not supported on web platforms.

            // onFocus={onFocusCapture as unknown as FocusEventHandler | undefined}
            onFocus={onFocusCapture}
        />
    );
}


FocusAwareCellRendererComponent.displayName = 'FocusAwareCellRendererComponent';

export default FocusAwareCellRendererComponent;
