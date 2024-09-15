import { Box, HStack } from '@chakra-ui/react'
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import React, { useRef, useState, useEffect } from 'react'
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from '../constants';
import Output from './Output';
import { getRuntimes } from '../api';

const CodeEditor = () => {
    const editorRef = useRef()
    const [value, setValue] = useState("");
    const [language, setLanguage] = useState("");
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        const fetchLanguages = async() => {
            try {
                const runtime = await getRuntimes();
                setLanguages(runtime);
                setLanguage(runtime[0].language);
                setValue(CODE_SNIPPETS[runtime[0].language]); 
            } catch (error) {
                console.error("Error: ", error);
            }
        }

        fetchLanguages();
    }, []);
    

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

    const onSelect = (language) => {
        setLanguage(language);
        setValue(CODE_SNIPPETS[language]);
    }

    return (
        <Box>
            <HStack spacing={4}>
                <Box w = "50%">
                    <LanguageSelector language={language} onSelect={onSelect} languages={languages}/>
                    <Editor
                        zIndex={0}
                        height="75vh"
                        theme='vs-dark'
                        language={language}
                        defaultValue={CODE_SNIPPETS[language]}
                        onMount={onMount}
                        value={value}
                        onChange={
                            (value, ) => setValue(value)
                        }
                    />
                </Box>
                <Output editorRef={editorRef} language={language}></Output>
            </HStack>
            
        </Box>
    )
}

export default CodeEditor