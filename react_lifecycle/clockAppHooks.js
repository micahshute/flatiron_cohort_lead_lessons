// App same as other fileimport React, { useState, useEffect } from "react";

export default function Clock(props) {
    const [date, setDate] = useState(new Date());
  
    useEffect(() => {
      console.log("running");
      const interval = setInterval(() => {
        console.log(new Date().toLocaleTimeString());
        setDate(new Date());
      }, 1000);
  
      return function() {
        clearInterval(interval);
      };
    }, []);
  
    const handleDelete = () => {
      props.handleDelete(props.id);
    };
  
    return (
      <div>
        <h2>{date.toLocaleTimeString()}</h2>
        <button onClick={handleDelete.bind(this)}>X</button>
      </div>
    );
  }
  