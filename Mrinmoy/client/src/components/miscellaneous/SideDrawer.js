import { Box, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import {Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Spinner, useToast} from "@chakra-ui/react";
import {React, useState} from 'react'
import {useDisclosure} from "@chakra-ui/hooks";
import ChatLoading from "../ChatLoading";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";



const SideDrawer = () => {
    
    const [search,  setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(); 
    const { setSelectedChat, chats, setChats} = ChatState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const toast = useToast()

    const handleSearch = async () => {
    
        if(!search){
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top-left"
            });
            return;
        }

        try {
            setLoading(true)
            const config = {
                // headers: {
                //   "Content-type": "application/json",
                // },
                withCredentials: true,
              };
             const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);

             setLoading(false);
             setSearchResult(data);
            
        } catch (error) {
            toast({
                description: "Failed to Load the Search Results",
                title: "Error Occured!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    
    }

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true)

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
                withCredentials: true,
            };

            const {data} = await axios.post('http://localhost:5000/api/chat', {userId}, config);

            // console.log(data._id);

            if (!chats.find((c) => c._id === data._id)){ 
                setChats([data, ...chats]);   
                console.log("drawer");
            }
            
            setSelectedChat(data)
            setLoadingChat(false);
            onClose();

        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

  return (
<>
    <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px">
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
            <Button variant="ghost" onClick={onOpen}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <Text display={{base: "none", md: "flex"}} px="4">
                    Search User
                </Text>
            </Button>
        </Tooltip>
        {/* <Text fontSize="xl" fontFamily="Work-sans">
            Chat with your Friends
        </Text> */}
    </Box>

    <Drawer 
        placement="left"
        onClose={onClose}
        isOpen={isOpen}>
        <DrawerOverlay/>
        <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
                Search Users
            </DrawerHeader>
            <DrawerBody>
                <Box display="flex" pb={2}>
                    <Input
                        placeholder="Search by name"
                        mr={2}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button onClick={handleSearch}> Go </Button>

                </Box>
                {loading ? <ChatLoading /> : 
                (
                    searchResult?.map(user => (
                        <UserListItem
                            key = {user._id}
                            user = {user}
                            handleFunction = { () => accessChat(user._id)}
                        />
                    ))
                ) }
                {loadingChat &&  <Spinner ml="auto" display="flex"/>}
            </DrawerBody>
        </DrawerContent>
    </Drawer>
</>
  )
}

export default SideDrawer