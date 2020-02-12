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