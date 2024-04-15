import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import ChatLoading from "./ChatLoading";
import {getSender} from "../config/ChatLogics"

const MyChats = ({fetchAgain}) => {

  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("userInfo")));

  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        // headers: {
        //   "Content-type": "application/json"
        // },
        withCredentials: true,
      }

      const {data} = await axios.get("http://localhost:5000/api/chat", config)   
      console.log(data);
      setChats(data)


    } catch (error) {
      toast({
        title: "Error Occured!",
        Description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }

  useEffect(() => {
   setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
   console.log("set loggeduser");
   fetchChats();
  }, [fetchAgain]);
  

  return (
    <>
        <Box
          display={{ base: selectedChat ? "none" : "flex", md: "flex"}}
          flexDir="column"
          alignItems="center"
          p={3}
          bg="white" 
          h="90%"
          w={{ base: "100%", md: "31%"}}
          borderRadius="lg"
          borderWidth="1px"
        >

          <Box
            display="flex"
            flexDir="column"
            p={3}
            bg="#F8F8F8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {chats ? (
              <Stack overflowY="scroll">
                {chats.map((chat)=>(
                  <Box
                    onClick={() => setSelectedChat(chat)}
                    cursor="pointer"
                    bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                    color={selectedChat === chat ? "white" : "black"}
                    px={3}
                    py={2}
                    borderRadius="1g"
                    key={chat._id}
                  >
                    <Text>
                      {getSender(loggedUser, chat.users)}
                    </Text>
                  </Box>
                ))}
              </Stack>
            ) : (
              <ChatLoading/>
            )}

          </Box>
        </Box>
    </>
  )
}

export default MyChats