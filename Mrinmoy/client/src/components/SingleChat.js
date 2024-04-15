import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import { ArrowBackIcon } from "@chakra-ui/icons"
import { getSender } from '../config/ChatLogics'
import axios from 'axios'
import ScrollableChat from './ScrollableChat'

import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000"; 
var socket, selectedChatCompare;  

const SingleChat = ({fetchAgan, setFetchAgain}) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    
    const { user, selectedChat, setSelectedChat} =  ChatState()
    
    const toast = useToast();
    
    
    const fetchMessages = async(event) => {
      if (!selectedChat) return;
      
      try {
        const config = {
          // headers: {
            //   Authorization: `Bearer ${user.token}`,
            // },
            withCredentials: true,
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );
      // console.log(data);
      setMessages(data);
      setLoading(false);
      console.log('joined chat');
      
      // socket.emit('join chat', selectedChat._id)
      
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    
  }
  
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
                },
                withCredentials: true,
              };
              
              const { data } = await axios.post(
                "http://localhost:5000/api/message",
                {
                  content: newMessage,
                  chatId: selectedChat,
                },
                config
              );
              console.log("hhh");
              setNewMessage("");
              // socket.emit("new message", data);
              setMessages([...messages, data]);
            } catch (error) {
              toast({
                title: "Error Occured!",
                description: "Failed to send the Message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
            }
        }
      }
    const typingHandler = (e) => {
        setNewMessage(e.target.value)
      }
      
      useEffect(() => {
      //   if(user && user._id){

      //     if (!socket) {
      //       socket = io(ENDPOINT);
      //   }

      //       socket.emit("setup", user);
      //     socket.on("connected", () => {
      //       setSocketConnected(true);
      //       console.log("set connected to true");
      //   });
      //       // socket.on("typing", () => setIsTyping(true));
      //     // socket.on("stop typing", () => setIsTyping(false));
      //   }
      //   return () => {
      //     socket.off("connected");
      //     socket.emit("disconnect");
      //     socket.off();
      // };
      }, [user])
      
      useEffect(() => {
        fetchMessages();
        // selectedChatCompare = selectedChat;
        
      }, [selectedChat]);
      
      useEffect(() => {
        // socket.on("message recieved", (newMessageRecieved) => {
        //   if (
        //     !selectedChatCompare || // if chat is not selected or doesn't match current chat
        //     selectedChatCompare._id !== newMessageRecieved.chat._id
        //   ) {
        //     // if (!notification.includes(newMessageRecieved)) {
        //     //   setNotification([newMessageRecieved, ...notification]);
        //     //   setFetchAgain(!fetchAgain);
        //     // }
        //   } else {
        //     setMessages([...messages, newMessageRecieved]);
        //   }
        // });
      });

  return (
    <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{base: "28px", md: "30px"}}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent={{base: "space-between"}}
                        alignItems="center"
                    >
                        <IconButton
                            display={{base: "flex", md: "none"}}  
                            icon={<ArrowBackIcon/>}
                            onClick={()=> setSelectedChat("")}
                        />
                        {getSender(user, selectedChat.users)}
                    </Text>
                    <Box
                        display="flex"
                        flexDir="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {loading ? (
                            <Spinner
                                size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"
                            />
                        ):(
                            <div className="messages">
                                <ScrollableChat messages={messages} />
                            </div>
                        )}
                        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                            <Input
                                variant="filled"
                                bg="#F4F4F4"
                                placeholder='Message...'
                                onChange={typingHandler}
                                value={newMessage}
                                autoComplete="off"
                            />
                        </FormControl>
                    </Box>
                
                </>
            ) : (
                <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="2xl" pb={3} fontFamily="Work sans"
                    >Click on a user to start chatting</Text>
                </Box>
            )}    
    </>
  )
}

export default SingleChat;