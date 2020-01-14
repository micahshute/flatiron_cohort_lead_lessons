//Styles.js

import styled from "styled-components";

const RedButton = styled.button`
  background-color: red;
`;

const GreenButton = styled.button`
  background-color: green;
`;

const Title = styled.h1`
  color: #003faf;
  text-align: center;
  font-family: sans-serif;
`;

const Card = styled.div`
  border: 1px solid #003faf;
  box-shadow: 5px 10px #dfaaaa;
  padding: 5px;
  margin: 20px;
`;

export { RedButton, GreenButton, Title, Card };





// App.js


import React, { useState } from "react";
import { Title } from "./Styles";
import List from "./List";
import Form from "./Form";
import "./styles.css";

export default function App() {
  const [listItems, setListItems] = useState([]);

  const handleItemDelete = id => {
    const newListItems = listItems.filter(li => li.id !== id);
    setListItems(newListItems);
  };

  const handleFormSubmit = formData => {
    setListItems([
      ...listItems,
      {
        item: formData[0],
        priority: formData[1],
        id: `${formData[0]}${formData[1]}`
      }
    ]);
  };
  return (
    <div className="App">
      <Title>Todos:</Title>
      <Form
        submitCallback={handleFormSubmit}
        inputs={["Item", "Priority"]}
        submitValue={"New Todo"}
      />
      <List items={listItems} handleDelete={handleItemDelete} />
    </div>
  );
}




// Form.js

import React, { useState } from "react";

export default function Form(props) {
  const [inputs, setInputs] = useState(props.inputs.map(input => ""));

  const handleTextChange = (e, i) => {
    const nextInputs = [...inputs];
    nextInputs[i] = e.target.value;
    setInputs(nextInputs);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setInputs(props.inputs.map(i => ""));
    props.submitCallback(inputs);
  };

  const renderInputs = () => {
    return props.inputs.map((inputName, index) => (
      <input
        type="text"
        onChange={e => handleTextChange(e, index)}
        value={inputs[index]}
        placeholder={inputName}
        key={inputName}
      />
    ));
  };

  return (
    <form>
      {renderInputs()}
      <button type="submit" onClick={handleSubmit}>
        {props.submitValue}
      </button>
    </form>
  );
}


// List.js

import React from "react";

import ListItem from "./ListItem";

export default function List({ items, handleDelete }) {
  const listItems = () =>
    items.map(i => (
      <ListItem
        item={i.item}
        priority={i.priority}
        key={i.id}
        id={i.id}
        deleteCallback={handleDelete}
      />
    ));

  return <div>{listItems()}</div>;
}



//ListItem.js

import React from "react";
import { Card, RedButton } from "./Styles";
function ListItem(props) {
  const handleDelete = e => {
    e.preventDefault();
    props.deleteCallback(props.id);
  };

  return (
    <Card>
      <h4>Item: {props.item}</h4>
      <p>Priority: {props.priority}</p>
      <RedButton onClick={handleDelete}>Delete</RedButton>
    </Card>
  );
}

export default ListItem;
