
import { useContext } from 'react';
import Messages from '../../components/messages/messages';
import NavChat from '../../components/navchat/navchat';
import './chat.css'
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
function Chat() {
    // Lay User hien tai 
    const { currentUser } = useContext(AuthContext);
    // Lau user_id tu URL
    const room_id = parseInt(useLocation().pathname.split("/")[2]);
    console.log(room_id);
    
    return ( 
        <>
        
        <NavChat />
        <div className="card  chat-container product-list-block">
            
                <Messages room_id={room_id} user_id={ currentUser.id } />
                
        </div>   
        </>
        
     );
}

export default Chat;