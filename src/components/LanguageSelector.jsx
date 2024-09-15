import { Box, MenuItem, Text, Menu, MenuButton, Button, MenuList, Portal } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// import { LANGUAGES_VERSION } from '../constants';


// const languages = Object.entries(LANGUAGES_VERSION);
const ACTIVE_COLOR = "blue.400";

const LanguageSelector = ({language, onSelect, languages}) => {

  return (
    <Box
       textAlign="left" ml={2} mb={4}>
      <Text mb={2} fontSize="lg">Language: </Text>
      <Menu isLazy>
        <MenuButton as={Button}>{language}</MenuButton>
        <Portal>
          <MenuList 
            bg="gray.900"
            maxH="50vh"
            overflowY="auto"
          >
            {
              languages.map((lang) => (
                <MenuItem 
        
                    key={lang.language}
                    color={lang.language === language ? ACTIVE_COLOR : "gray.400"}
                    bg={lang.language === language ? "gray.900" : "gray.900"}
                    _hover={{
                      color: ACTIVE_COLOR,
                      bg: "gray.900",
                    }}
                    onClick={() => onSelect(lang.language)}
                >
                  {lang.language}
                  &nbsp;
                  {/* <Text as="span" color="gray.600" fontSize="sm">{version}</Text> */}
                  <span style={{ color: 'gray.900', fontSize: '0.75rem', }}>
                    ({lang.version})
                  </span> 
                </MenuItem>
              ))
            }
          </MenuList>
        </Portal>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
