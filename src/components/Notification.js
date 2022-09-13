import { useSelector } from 'react-redux'
import notificationReducer, { displayMessage } from "../reducers/notificationReducer";

const Notification = () => {
    const notification= useSelector(state => state.notification)
    console.log('Notification', notification)
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    // if (message === null) {
    //   return null;
    // }
    if (notification)
    return (
      <div style={style}>
        {notification}
      </div>
    )
    // if(type === 'error'){
    //   return <div className="error">{notification}</div>;
    // }else if (type === 'success'){
    //   return <div className="success">{notification}</div>
    // }

    
  };

export default Notification