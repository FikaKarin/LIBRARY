import React, {useState, useEffect} from 'react';
import './FlashMessage.css';

//function for flashmessage at: Unable to load New book
//see in Book.js
function FlashMessage(props) {
    //accepts an initial value to 'visible' as (true)
    const [visible, setVisible] = useState(true);

    useEffect(()=>{
        const timer = setTimeout(()=>setVisible(false), props.duration);

        return ()=>{
            clearTimeout(timer);
        }
    });
    //if visible is true --> show message, if visible is false --> hide message
    return <div className={(visible ? 'show': 'hide') + ' message'}>{props.message}</div>;
}

export default FlashMessage;