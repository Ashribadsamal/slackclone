import React from 'react';
import  {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './App.css';
import {useEffect,useState} from 'react';

import Chat from './Component/Chat.js';
import Login from './Component/Login.js';
import styled from 'styled-components';
import Header from './Component/Header.js';
import Sidebar from './Component/Sidebar';
import db from './firebase';
import {auth,provider} from "./firebase";



function App() {

  const [room,setRooms]=useState([])
   const[user,setUser]=useState(JSON.parse(localStorage.getItem('user')))

  const getChannels = ()=>{
    db.collection('room').onSnapshot((snapshot)=>{
     setRooms(snapshot.docs.map((doc)=>{
       
        return{id:doc.id,name:doc.data().name}
      }))
      
    })
  }

  const signOut=()=>{
    auth.signOut().then(()=>{
      localStorage.removeItem('user');
      setUser(null);
    })
  }

  useEffect(() => {
    getChannels();
    
  }, [])


console.log("user in app",user);

  return(
    <div>
      <Router>
        {
          !user?
          <Login setUser={setUser}/>
          :
        
          <Container>
            <Header signOut={signOut} user={user} />


            <Main>
              <Sidebar room={room}/>
              <Switch>
                <Route  path="/room/:channelId">
                  <Chat user={user}/>
                </Route>
                <Route path="/">
                  select Or create channel
                </Route>
              </Switch>
            </Main> 
          </Container>
        }
      </Router>
    </div>
  )
}

export default App;

const Container=styled.div`
  width:100%;
  height:100vh;
   display:grid;
   grid-template-rows:38px minmax(0,1fr); 
  
  `
  const Main =styled.div`
  display:grid;
  grid-template-columns:260px auto;
  `
