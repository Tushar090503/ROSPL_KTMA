import { Box, Button, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { executeCode } from '../api';

const Output = ({editorRef, language}) => {
    const toast = useToast(); 
    const [output, setOutput] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if(!sourceCode) return;
        try{
            setLoading(true);
            const {run: result} = await executeCode(language, sourceCode);
            setOutput(result.output.split("\n"));
            result.stderr ? setIsError(true) : setIsError(false);
        } catch (error) {
            console.log(error);
            toast({
                title: "An error occured",
                description: error.message || "Unable to run code",
                status: "error",
                // colorScheme: "red",  
                duration: 6000,
                isClosable: true
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box w="50%">
            <Text mb={2} fontSize="lg">
                Output:
            </Text>
            <Button 
                variant="outline"
                colorScheme='green'
                mb={4}
                onClick={runCode}
                isLoading={loading}
            >
                    Run Code
            </Button>
            <Box
                height="75vh"
                p={2}
                color={
                    isError ? "red.500" : ""
                }
                border="1px solid"
                borderRadius={4}
                borderColor={
                    isError ? "red.300" : "#333"
                }
            >
                {output ? output.map((line, i) =>
                    <Text key={i}>{line}</Text>
                ) : "Click 'Run Code' to see the output"}
            </Box>
        </Box>
    )
}

export default Output