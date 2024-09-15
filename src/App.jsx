import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Box, ChakraProvider } from '@chakra-ui/react'
import CodeEditor from './components/CodeEditor'
import LanguageSelector from './components/LanguageSelector'

function App() {
  //mobile, desktop
  return (
    <ChakraProvider>
      {/* width={["auto", '100%']} height={["auto", '100%']}  minW="90vw"*/}
      <Box bg="#0f0a19" color="gray.500" minH="100vh" minW="100vw" px={6} py={8}>
        <CodeEditor/>
      </Box>
    </ChakraProvider>
   
  )

}

export default App
