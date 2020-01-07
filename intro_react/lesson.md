# Intro to React

## What is React?

A framework built in JS to make frontends

## JSX and Babel

### What is JSX?

    - A `syntax extension to JavaScript` that works with React.
    - You can think of it like "syntactic sugar". 


    Remember how Ruby let you say things like `dog.age = 4` even though actually you were doing `dog.age=(4)`? You can almost think of this the same way, except it cannot be compiled by a standard JavaScript compiler - we need to put it through a special pre-processor to turn it into Vanilla JS. 

    JSX lets us write HTML-like syntax directly in with our JavaScript.

```jsx
class Card extends React.Component{
  

  handleClick(){
	alert('click')
  }
  
  render(){
    return (
      <div className="card">
        <h2></h2>
        <button onClick={this.handleClick.bind(this) }>This is a test</button>
        <div className="bodyContainer" >
        	<p id="card-body">
              {this.props.data}
          	</p>
        	<img src={this.props.imgURL} />
        </div>
      </div>
    )
  }
  
}
```

    - Everything was normal JavaScript, but in the `render` method, I returned some new JSX syntax. This looks just like HTML, but it will actually be turned into JavaScript which then makes the actual HTML elements (or, in this case, React virtual DOM elements that eventually become actual HTML elements).

    - So, JSX is a JavaScript *extension* that can be *transpiled*  into plain JavaScript.

### What is a transpiler?

    - A transpiler simply takes code from one language and converts it to source code in another language.

### What is Babel? 

    - Babel is the *transpiler* that takes our JSX and turns it into Vanilla JS. I will show you some input and output source code, where the input is JSX and the output is Vanilla JS:

    Input JSX:
```jsx
import React from 'react'
const element = <h1>Hello, world!</h1>


class Card extends React.Component{
  

  handleClick(){
	alert('click')
  }
  
  render(){
    return (
      <div className="card">
        <h2></h2>
        <button onClick={this.handleClick.bind(this) }>This is a test</button>
        <div className="bodyContainer" >
        	<p id="card-body">
              {this.props.data}
          	</p>
        	<img src={this.props.imgURL} />
        </div>
      </div>
    )
  }
  
}
```

    Output JS:
```js
import React from 'react';
const element = React.createElement("h1", null, "Hello, world!");

class Card extends React.Component {
  handleClick() {
    alert('click');
  }

  render() {
    return React.createElement("div", {
      className: "card"
    }, React.createElement("h2", null), React.createElement("button", {
      onClick: this.handleClick.bind(this)
    }, "This is a test"), React.createElement("div", {
      className: "bodyContainer"
    }, React.createElement("p", {
      id: "card-body"
    }, this.props.data), React.createElement("img", {
      src: this.props.imgURL
    })));
  }

}
```


## Let's spin up an app


`npx create-react-app assignment-tracker`

### What files did this give us?

`package.json` -> metadata, dependencies  

`yarn.lock` -> auto-generated; "locks" in all the dependencies and sub-dependencies (like Gemfile.lock)  

`public` directory -> static files (images, index.html)  

`src` directory -> where we code:  

- `index.js` = entry point
    - imports our files
    - ReactDOM.render -> renders our <App /> element to the dom (ReactDOM vs React Native)
    - 2 args: App and the HTML element
- App.js -> the component rendered to the screen
    - Class components extend Component
    - need a render funciton
    - Now react gives App to you as a funcitonal component
    - Classes give us lifecycle methods and state, but now with `React Hooks` we get those in functional components
    
- start with `yarn start`

- Show that any changes get immediately loaded
- Go over the JSX
- `yarn build` can give you the JS that is made. In the `build/static/js`

### Quesitons?


### Another component

`touch MyName.js`
```jsx
import React from 'react'

const MyName = () => {
    return (
        <h3>Micah Shute</h3>
    )
}

export default MyName
```

in App.js: 

`import MyName from './MyName`
and add `<MyName />` just below the logo

Note: you can also do `<MyName></MyName>` if your MyName component allows nested objects inside of it.

### To export a named component:

Inside of MyName.js: 
```jsx
export {
    MyName
}
```
Inside of App.js:

```jsx
import { MyName } from './MyName'

```

### Adding JS inside of JSX: use curley brackets

Top of `App.js`

`const names = ['Tony', 'Steve', 'Peter', 'Thor', 'Micah']`

in the render function:

```jsx

{names}

```

### Make MyName take the name as a prop:

** Anyone know how to do this? **

```jsx
//MyName.js
const MyName = (props) => {
    return (
    <h3>{props.name}</h3>
    )
}

//App.js

const names = ['Tony', 'Steve', 'Peter', 'Thor']

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MyName name={names[0]}/>
        <p>
          Edit <code>src/App.js</code> and save to reload. :) Hello!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
    </div>
  );
}

```
### Now that I can do this, who can tell me how to get my array of Names turned into MyName Components?

then, map `names` to `<MyName/>` components:


```jsx
//App.js
{names.map(n => <MyName name={n}/>)}
```

then do:
```jsx
//App.js
<ul>
    {names.map(n => <li><MyName name={n}/></li>)}
</ul>
```

Change `MyName` to `NameComponent`
Put the `map` into its own funciton `namedComponents`

```jsx
function App() {

  const names = ['Tony', 'Steve', 'Peter', 'Thor', 'Micah']

  const namedComponents = names.map(n => <li><MyName name={n}/></li>)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
        {namedComponents}
        </ul>
        
        <p>
          Edit <code>src/App.js</code> and save to reload. :) Hello!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
    </div>
  );
}

```
** Note: if you use a class component, use `this.props` to get the props rathern than just `props`**

** Can destructure props**


### React Facts

Cannot return 2 sibling elements from a component. They MUST be both enclosed in something. (div or reat fragment: `<> </>`)

If Components are rendered as an array, we need to have a `key` passed in as well

## Have student take remote control or clone the repo


Have them make a `FavoriteLanguage` component and render that from inside of the `NameComponent`. Change the array to an array of objects instead of strings
