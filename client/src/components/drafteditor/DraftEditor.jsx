import React, { useRef, useState, useMemo, useCallback } from 'react';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, { defaultSuggestionsFilter } from '@draft-js-plugins/mention';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from '@draft-js-plugins/buttons';

import '@draft-js-plugins/static-toolbar/lib/plugin.css';

import mentions from './Mentions';
import "../../assets/css/draft.css"

const DraftEditor = ({ editorState, setEditorState }) => {
    const ref = useRef(null);
    // const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState(mentions);

    // Initialize the mention plugin
    const mentionPlugin = useMemo(() => createMentionPlugin(), []);
    const { MentionSuggestions } = mentionPlugin;

    // Initialize the toolbar plugin
    const toolbarPlugin = useMemo(() => createToolbarPlugin(), []);
    const { Toolbar } = toolbarPlugin;

    // Combine the plugins
    const plugins = useMemo(() => [mentionPlugin, toolbarPlugin], [mentionPlugin, toolbarPlugin]);

    const onOpenChange = useCallback((open) => {
        setOpen(open);
    }, []);

    const onSearchChange = useCallback(({ value }) => {
        setSuggestions(defaultSuggestionsFilter(value, mentions));
    }, []);

    const MentionEntry = (props) => {
        const { isFocused, searchValue, selectMention, ...parentProps } = props;

        return (
            <div {...parentProps} className="mentionEntry">
                <img src={props.mention.avatar} alt={props.mention.name} />
                <span>{props.mention.name}</span>
            </div>
        );
    };

    // *** User handling from mentions
    const extractMentions = (editorState) => {
        const contentState = editorState.getCurrentContent();
        const mentionedUsers = [];

        contentState.getBlockMap().forEach((block) => {
            block.findEntityRanges(
                (character) => {
                    const entityKey = character.getEntity();
                    return (
                        entityKey !== null &&
                        contentState.getEntity(entityKey).getType() === 'mention'
                    );
                },
                (start, end) => {
                    const entityKey = block.getEntityAt(start);
                    const mentionData = contentState.getEntity(entityKey).getData();
                    mentionedUsers.push(mentionData.mention);
                }
            );
        });

        return mentionedUsers;
    }

    const handleSendComment = () => {
        const mentionedUsers = extractMentions(editorState)
        console.log("Mentioned users:", mentionedUsers);
    }

    return (
        <div
            className='w-full border border-gray-200 p-4 rounded-md relative'
            onClick={() => {
                ref.current && ref.current.focus();
            }}
        >
            <Toolbar>
                {(externalProps) => (
                    <div className='testClass bg-gray-50 shadow-none absolute left-0 top-0 w-full'>
                        <BoldButton {...externalProps} getEditorState={() => editorState} setEditorState={setEditorState} />
                        <ItalicButton {...externalProps} getEditorState={() => editorState} setEditorState={setEditorState} />
                        <UnderlineButton {...externalProps} getEditorState={() => editorState} setEditorState={setEditorState} />
                        <CodeButton {...externalProps} getEditorState={() => editorState} setEditorState={setEditorState} />
                        <UnorderedListButton {...externalProps} getEditorState={() => editorState} setEditorState={setEditorState} />
                        <OrderedListButton {...externalProps} getEditorState={() => editorState} setEditorState={setEditorState} />
                        <BlockquoteButton {...externalProps} getEditorState={() => editorState} setEditorState={setEditorState} />
                        <CodeBlockButton {...externalProps} getEditorState={() => editorState} setEditorState={setEditorState} />
                    </div>
                )}
            </Toolbar>

            <div className='mt-10'>
                <Editor
                    editorKey="editor"
                    editorState={editorState}
                    onChange={setEditorState}
                    plugins={plugins}
                    ref={ref}
                    placeholder='Write your comment'
                />
            </div>
            <MentionSuggestions
                open={open}
                onOpenChange={onOpenChange}
                suggestions={suggestions}
                onSearchChange={onSearchChange}
                entryComponent={MentionEntry}
                onAddMention={() => {
                    // get the mention object selected
                }}
            // popoverContainer={({ children }) => <div>{children}</div>}
            // onAddMention={() => { /* handle mention addition */ }}
            />

            {/* <div style={{ marginTop: "100px" }}>
                <button onClick={handleSendComment} type='button'>handleSendComment</button>
            </div> */}
        </div>
    );
};

export default DraftEditor;