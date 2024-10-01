// App.jsx
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import CodeEditor from './components/CodeEditor';

// Create a custom theme that supports light and dark modes
const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'light' ? 'white' : '#1c2130', // Background for light and dark modes
        color: props.colorMode === 'light' ? 'gray.800' : 'gray.100', // Text color for light and dark modes
      },
    }),
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box
        minH="100vh"
        minW="100vw"
        px={6}
        py={8}
      >
        <CodeEditor />
      </Box>
    </ChakraProvider>
  );
}

export default App;
