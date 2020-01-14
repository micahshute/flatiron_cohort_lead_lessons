

# React: Props, State, Forms, Events


### Props

#### Q: What are props?

Information sent into a child component from a parent component like an HTML attribute:

```jsx
    // name and age are props
    <MyComponent name={'Micah'} age={29} />

```

**Components should never change their own props.**


### State

#### Q: What is state?

Information managed from within a component.

DO NOT modify state directly.
This will not re-render a component


https://reactjs.org/docs/state-and-lifecycle.html


Class Component

```jsx
import React, { Component } from 'react'

export default class List extends Component{

    constructor(props){
        super(props)
        this.state = {
            items: []
        }

    }



    //...

    someMethod(){
        const newItemsArray = ["Wake up"]
        this.setState({items: newItemsArray})
        //OR
        this.setState(prevState => ({
            items: [...prevState.items, newItemsArray[0]]
        }))
    }

}



```

React Hooks


```jsx
import React, { useState } from "react";

export default function List() {
  const [items, setItems] = useState([]);
    //...


}

```

**NOTE:** class components `setState` accepts a second OPTIONAL argument: a function which is a callback once the state is set (b/c it is set asynchronously). To get a similar effect with react hooks, you use useEffect, which accepts a function as an argument which runs upon initial render and every time state changes:

```jsx

import React, { useState } from "react";

export default function List() {
  const [items, setItems] = useState([]);
    //...

    useEffect( () => {
        // this will run upon initial render and after every state change
    })
}

```

setState does shallow merges so you can set only one key-value pair at once and it won't overwrite the rest of the state.

In hooks, setProperty completely overwrites it instead of merging


### Make app
Code in other .js files in this folder


Notes: 

- For forms, we keep the text value in state to allow for form validation. Show what happens when you do a manual `handleTextChange` that does more than just write to the state.

- Build a basic form FIRST, THEN show the modular version