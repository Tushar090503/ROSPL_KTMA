// Output.jsx
import { Box, Button, Text, useToast, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import { executeCode } from '../api';

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const outputBackground = useColorModeValue('white', '#1e1e1e'); // Output box background
  const textColor = useColorModeValue('gray.800', 'gray.100');

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box w="40%">
      <Text mb={2} fontSize="lg">
        Output:
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        onClick={runCode}
        isLoading={loading}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        bg={outputBackground} // Background color based on theme
        color={isError ? "red.500" : textColor} // Text color based on theme
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.300" : "#333"}
      >
        {output ? output.map((line, i) => (
          <Text key={i}>{line}</Text>
        )) : "Click 'Run Code' to see the output"}
      </Box>
    </Box>
  );
};

export default Output;
