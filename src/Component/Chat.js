import React  from 'react';
import {useEffect , useState} from 'react';
import styled from 'styled-components';
//import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoIcon from '@material-ui/icons/Info';
import ChatInput from './ChatInput.js';
import ChatMessage from './ChatMessage';
import db from '../firebase';
import {useParams} from 'react-router-dom'
import firebase from 'firebase'


function Chat({ user }) {

  let {channelId}=useParams();
  const[channel,setChannel]=useState([]);
  const [messages,setMessages ] = useState([])

  const getMessages = ()=>{
    db.collection('room')
    .doc(channelId)
    .collection('messages')
    .orderBy('timestamp','asc')
    .onSnapshot((snapshot)=>{
        let messages= snapshot.docs.map((doc)=>
          doc.data()
        );
        console.log(messages);
        setMessages(messages);
    })

  }

  const sendMessage = (text)=>{
    if(channelId){
       
     let payload={
          text:text,
          timestamp:firebase.firestore.Timestamp.now(),
          user: user.name,
          userImage: user.photo
        }
        db.collection("room").doc(channelId).collection('messages').add(payload);
        console.log(payload)
    }
  }
  
  const getChannel=()=>{
    db.collection('room')
    .doc(channelId)
    .onSnapshot((snapshot)=>{
      setChannel(snapshot.data());
      console.log(snapshot.data());
    })
  }

  useEffect(()=>{
    getChannel();
    getMessages();
  },[channelId])


    return (
        <Container>
            <HeaderContainer>
               <Channels>
                 <ChannelName>
                       # {channel.name}   
                 </ChannelName>
                 <ChannelInfo>
                     company wide annoucement welcome you
                 </ChannelInfo>
               </Channels>
               <ChannelDetail>
                   <div>
                       Details
                   </div>
                   <Info/>
                  
               </ChannelDetail>
            </HeaderContainer>
            <MessageContainer>
              {
                messages.length > 0 &&
                messages.map((data,index)=>(
                  <ChatMessage 
                    text={data.text}
                    name={data.user}
                    image={data.userImage}
                    timestamp={data.timestamp}
                  
                  />
                ))
              }
               
            </MessageContainer>
            <ChatInput sendMessage={sendMessage}/>


        </Container>
    )
}

export default Chat


const Container=styled.div`
  display:grid;
  grid-template-rows:64px auto min-content;
  min-height:0;
`
const HeaderContainer=styled.div`
 display:flex;
 justify-content:space-between;
 align-items:center;
 padding-left:20px;
 padding-right:20px;
 border-bottom:1px solid  rgba(83,39,83,.13);

`
const ChannelName=styled.div`
 font-weight:700;
`
const ChannelInfo=styled.div`
  font-weight:400;
  color:#606060;
  font-size:13px;
  margin-top:8px;
`
const MessageContainer=styled.div`
 
display:flex;
flex-direction:column;
overflow-y:scroll;
 color:red;
 align-item:center;
 padding-left:20px;
`

const Channels = styled.div`
 
 
`
const ChannelDetail=styled.div`
 display:flex;
 color:#606060;
 align-items:center;
`

const Info=styled(InfoIcon)`
margin-left:10px;
`