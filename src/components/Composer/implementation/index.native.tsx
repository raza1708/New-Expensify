import type { MarkdownStyle } from '@expensify/react-native-live-markdown';
import mimeDb from 'mime-db';
import type { ForwardedRef } from 'react';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import type { NativeSyntheticEvent, TextInput, TextInputChangeEventData, TargetedEvent } from 'react-native';
// import type {NativeSyntheticEvent, TextInput, TextInputChangeEventData, TextInputPasteEventData} from 'react-native';
import { StyleSheet } from 'react-native';
import type { FileObject } from '@components/AttachmentModal';
import type { ComposerProps } from '@components/Composer/types';
import type { AnimatedMarkdownTextInputRef } from '@components/RNMarkdownTextInput';
import RNMarkdownTextInput from '@components/RNMarkdownTextInput';
import useAutoFocusInput from '@hooks/useAutoFocusInput';
import useMarkdownStyle from '@hooks/useMarkdownStyle';
import useResetComposerFocus from '@hooks/useResetComposerFocus';
import useStyleUtils from '@hooks/useStyleUtils';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import updateIsFullComposerAvailable from '@libs/ComposerUtils/updateIsFullComposerAvailable';
import * as EmojiUtils from '@libs/EmojiUtils';
import * as FileUtils from '@libs/fileDownload/FileUtils';
import CONST from '@src/CONST';

declare module 'react-native' {
    interface TextInputProps {
      onPaste?:
      | ((e: NativeSyntheticEvent<TextInputPasteEventData>) => void)
      | undefined;
      onClear?:
      | ((e: NativeSyntheticEvent<TextInputChangeEventData>) => void)
      | undefined;
    }
  }

export interface TextInputPasteEventData extends TargetedEvent {
    items: Array<{
        type: string;      // The type of the clipboard content (e.g., 'text/plain', 'application/pdf', etc.)
        data: string;     // The actual content from the clipboard, typically a URI or base64 data
    }>;
}


const excludeNoStyles: Array<keyof MarkdownStyle> = [];
const excludeReportMentionStyle: Array<keyof MarkdownStyle> = ['mentionReport'];

function Composer(
    {
        onClear: onClearProp = () => { },
        onPasteFile = () => { },
        isDisabled = false,
        maxLines,
        isComposerFullSize = false,
        setIsFullComposerAvailable = () => { },
        autoFocus = false,
        style,
        // On native layers we like to have the Text Input not focused so the
        // user can read new chats without the keyboard in the way of the view.
        // On Android the selection prop is required on the TextInput but this prop has issues on IOS
        selection,
        value,
        isGroupPolicyReport = false,
        ...props
    }: ComposerProps,
    ref: ForwardedRef<TextInput>,
) {
    const textInput = useRef<AnimatedMarkdownTextInputRef | null>(null);
    const { isFocused, shouldResetFocusRef } = useResetComposerFocus(textInput);
    const textContainsOnlyEmojis = useMemo(() => EmojiUtils.containsOnlyEmojis(value ?? ''), [value]);
    const theme = useTheme();
    const markdownStyle = useMarkdownStyle(value, !isGroupPolicyReport ? excludeReportMentionStyle : excludeNoStyles);
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();

    const { inputCallbackRef, inputRef: autoFocusInputRef } = useAutoFocusInput();

    useEffect(() => {
        if (autoFocus === !!autoFocusInputRef.current) {
            return;
        }
        inputCallbackRef(autoFocus ? textInput.current : null);
    }, [autoFocus, inputCallbackRef, autoFocusInputRef]);

    /**
     * Set the TextInput Ref
     * @param {Element} el
     */
    const setTextInputRef = useCallback((el: AnimatedMarkdownTextInputRef) => {
        // eslint-disable-next-line react-compiler/react-compiler
        textInput.current = el;
        if (typeof ref !== 'function' || textInput.current === null) {
            return;
        }

        if (autoFocus) {
            inputCallbackRef(el);
        }

        // This callback prop is used by the parent component using the constructor to
        // get a ref to the inner textInput element e.g. if we do
        // <constructor ref={el => this.textInput = el} /> this will not
        // return a ref to the component, but rather the HTML element by default
        ref(textInput.current);
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, []);

    const onClear = useCallback(
        ({ nativeEvent }: NativeSyntheticEvent<TextInputChangeEventData>) => {
            onClearProp(nativeEvent.text);
        },
        [onClearProp],
    );


    const pasteFile = useCallback(
        (e: NativeSyntheticEvent<TextInputPasteEventData>) => {
            const clipboardContent = e.nativeEvent.items.at(0);
            if (!clipboardContent) {
                return;        // No items in clipboard, exit early
            }
            if (clipboardContent?.type === 'text/plain') {
                return;
            }
            const mimeType = clipboardContent?.type ?? '';
            const fileURI = clipboardContent?.data;

            // Check if fileURI exists and is a valid URL
            if (!fileURI || typeof fileURI !== 'string') {
                return;          // Invalid file URI, exit early
            }
            const baseFileName = fileURI?.split('/').pop() ?? 'file';
            const { fileName: stem, fileExtension: originalFileExtension } = FileUtils.splitExtensionFromFileName(baseFileName);
            const fileExtension = originalFileExtension || (mimeDb[mimeType].extensions?.[0] ?? 'bin');
            const fileName = `${stem}.${fileExtension}`;
            const file: FileObject = { uri: fileURI, name: fileName, type: mimeType };
            onPasteFile(file);
        },
        [onPasteFile],
    );

    const maxHeightStyle = useMemo(() => StyleUtils.getComposerMaxHeightStyle(maxLines, isComposerFullSize), [StyleUtils, isComposerFullSize, maxLines]);
    const composerStyle = useMemo(() => StyleSheet.flatten([style, textContainsOnlyEmojis ? styles.onlyEmojisTextLineHeight : {}]), [style, textContainsOnlyEmojis, styles]);

    return (
        <RNMarkdownTextInput
            id={CONST.COMPOSER.NATIVE_ID}
            multiline
            autoComplete="off"
            placeholderTextColor={theme.placeholderText}
            ref={setTextInputRef}
            value={value}
            onContentSizeChange={(e) => updateIsFullComposerAvailable({ maxLines, isComposerFullSize, isDisabled, setIsFullComposerAvailable }, e, styles, true)}
            rejectResponderTermination={false}
            smartInsertDelete={false}
            textAlignVertical="center"
            style={[composerStyle, maxHeightStyle]}
            markdownStyle={markdownStyle}
            autoFocus={autoFocus}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...props}
            readOnly={isDisabled}
            onPaste={pasteFile}
            onBlur={(e) => {
                if (!isFocused) {
                    // eslint-disable-next-line react-compiler/react-compiler
                    shouldResetFocusRef.current = true; // detect the input is blurred when the page is hidden
                }
                props?.onBlur?.(e);
            }}
            onClear={onClear}
        />
    );
}

Composer.displayName = 'Composer';

export default React.forwardRef(Composer);
