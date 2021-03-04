
import React from 'react';
import styled from 'styled-components';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {sidebaritems} from '../data/SidebarData';
import AddIcon from '@material-ui/icons/Add';
import db from '../firebase';
import {useHistory} from 'react-router-dom';



function Sidebar(props) {
    //console.log(props);
    const history=useHistory();

    const  goToChannel=(id)=>{
        if(id){
            console.log(id);
            history.push(`/room/${id}`)
        }
    }

    const addChannel=()=>{
        const promptName=prompt("Enter channel name");
        if(promptName){
            db.collection('room').add({
                name:promptName
            })
        }
    }


    return (
        <Container>
            <WorkSpaceContainer>
                <Name>jhjjh</Name>
                <NewMessage>
                  <AddCircleIcon/>
                </NewMessage>
            </WorkSpaceContainer>
            <MainChannel>
                {sidebaritems.map(item=>(
                   <MainChannelItem>
                       {item.icon}
                       {item.text}
                    
                   </MainChannelItem>
                ))}
                
            </MainChannel>
            <ChannelContainer>
                <NewChannelContainer>
                    
                    <div>
                        channel
                    </div>
                    <AddIcon onClick={addChannel}/>
                </NewChannelContainer>
                 <ChannelList>
                    {
                        props.room.map(item=>(
                          <Channel onClick={()=>goToChannel(item.id)}>
                           # {item.name}
                          </Channel>
                        ))
                    }
                 </ChannelList>
                
            </ChannelContainer>
        </Container>
    )
}

export default Sidebar;

const Container=styled.div`

background-color:#3F0E40;
`
const WorkSpaceContainer=styled.div`
color:white;
height:64px;
display:flex;
align-items:center;
padding-left:19px;
justify-content:space-between;
border-bottom:1px solid #532753;
`

const Name=styled.div``

const NewMessage=styled.div`
  width:36px;
  height:36px;
  background-color:white;
  color:#3F0E40;
  fill:#3F0E40;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:50%;
  margin-right:20px;
  cursor:pointer;
`
const MainChannel=styled.div`
  padding-top:20px;
`
const MainChannelItem=styled.div`
color:rgb(188,171,188);
display:grid;
grid-template-columns:15% auto;
height:28px;
align-items:center;
padding-left:19px;
cursor:pointer;
:hover{
    background:#350D36;   
}
`
const ChannelContainer=styled.div`
   color:rgb(188,171,188);
   margin-top:10px;

`
const NewChannelContainer=styled.div`
display:flex;
justify-content:space-between;
align-items:center;
height:20px;
padding-left:19px;
padding-right:12px;
`
const ChannelList=styled.div`

`
const Channel=styled.div`
   display:flex;
   height:28px;
   align-items:center;
    padding-left:19px;
    cursor:pointer;
   :hover{
       background:#350D36;
   }
`