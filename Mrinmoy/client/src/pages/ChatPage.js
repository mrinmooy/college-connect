import React, { useEffect, useState } from 'react'
import { Box } from "@chakra-ui/layout";
import axios from 'axios'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'
import './ChatPage.css'
import { ChatState } from '../Context/ChatProvider';

const ChatPage = () => {

    const { user } = ChatState();
    const [ fetchAgain, setFetchAgain] = useState(false);



  return (
    <>
        <div className="ChatPage" style={{ width: "100%" }}>
        {<SideDrawer />}
        <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
          <MyChats fetchAgain={fetchAgain}/>
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          
        </Box>
      </div>
    </>
  )
}

export default ChatPage