// LanguageSelector.jsx
import { Box, MenuItem, Text, Menu, MenuButton, Button, MenuList, Portal, useColorMode, IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import React from 'react';

const ACTIVE_COLOR = "blue.400";

const LanguageSelector = ({ language, onSelect, languages }) => {
  const { colorMode, toggleColorMode } = useColorMode(); // Access the current theme and toggle function

  return (
    <Box mb={4}>
      <Text fontSize="lg" color={colorMode === "dark" ? "white" : "black"}>Language: </Text>
      <Box display="flex" alignItems="center" mt={1}>
        <Menu isLazy>
          <MenuButton as={Button} bg={colorMode === "dark" ? "gray.700" : "gray.300"} color={colorMode === "dark" ? "white" : "black"} _hover={{}}>
            {language}  
          </MenuButton>
          <Portal>
            <MenuList
              bg={colorMode === 'dark' ? 'gray.900' : 'white'}
              maxH="50vh"
              overflowY="auto"
            >
              {languages.map((lang) => (
                <MenuItem
                  key={lang.language}
                  color={lang.language === language ? ACTIVE_COLOR : (colorMode === 'dark' ? 'gray.400' : 'gray.700')}
                  bg={lang.language === language ? (colorMode === 'dark' ? 'gray.900' : 'white') : (colorMode === 'dark' ? 'gray.900' : 'white')}
                  _hover={{
                    color: ACTIVE_COLOR,
                    bg: colorMode === 'dark' ? 'gray.900' : 'gray.200',
                  }}
                  onClick={() => onSelect(lang.language)}
                >
                  {lang.language}
                  &nbsp;
                  <span style={{ color: colorMode === 'dark' ? 'gray.600' : 'gray.500', fontSize: '0.75rem' }}>
                    ({lang.version})
                  </span>
                </MenuItem>
              ))}
            </MenuList>
          </Portal>
        </Menu>
        
        {/* Theme Toggle Button */}
        <IconButton
          aria-label="Toggle Theme"
          icon={colorMode === 'dark' ? <SunIcon color="yellow.400" /> : <MoonIcon color="gray.900" />}
          onClick={toggleColorMode}
          ml={4} // Add margin left for spacing between the language button and theme toggle button
          bg={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
          _hover={{ bg: colorMode === 'dark' ? 'gray.500' : 'gray.300' }}
        />
      </Box>
    </Box>
  );
};

export default LanguageSelector;
