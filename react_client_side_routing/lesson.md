# Client Side Routing

## Objectives: 
- Understand Client Side Routing OUTSIDE the context of React
- Understand the mechanics of using it within react with react-router-dom
- Understand the advanced abilities of react-router-dom such as switch, passing props to components, exact path vs path, etc


### What is client side routing?

- ASK: First of all, whats server side routing?
    - Answer: HTTP requests are sent from the browser to the backend, which crafts an HTML response to return to the browser over the network as an HTTP response

- ASK: So, what do you think client side routing is?
    - Answer: Change the browser location with JavaScript, and render new HTML to the page again with JS running on the browser. While this MAY include AJAX requests, the backend will not be formulating HTML data to give to the browser based off of a page change

- Benefits to Client side routing?
    - Fast routing
- Benefits to Server side routing?
    - Longer history of use
    - Shorter initial load time
    - Allows SEO

### Client side is not something specific to react.

Let's look at how this acheived with JS: 

There are 2 things I can call:
```js
    window.location.href = '/path'
    //or window.location = '/path
    
```
The above DOES fire off an HTTP request to that route UNLESS the only change is to the hash (e.g. `www.site.com/todos#some-anchor`)

<br/> 

OR 
<br/> 

I can do the following: 

```js
    window.history.pushState(
        {state: 'info'},
        'page title (mostly unused)',
        '/new/path'
    )
```

This does NOT fire off a new HTTP request no matter what, and allows me to save state to the session

<br/>

Sidenote for state hash: 

```js
// Browsers will call the popstate() method when a back button is fired, 
// which will pop the most recent state pushed to the stack

// you can save the location of the page that the user was previously viewing, 
// or some form options they had entered but never submitted.


// Below function will get fired for every app-wide popstate
window.addEventListener('popstate', function(event) {
  // Can access state data using event.state.data
});
```
<br/>

Show Vanilla JS example in `./vanilla_js_routing`

***To run the code, you can't open the file with `open index.html`. Instead, use `python3 -m http.server` or, if you only have python2, use `python -m SimpleHTTPServer`***
<br/>


** Note as well that if you refresh the page while on `/secret`, you get an error. This is because pushState never actually fired an HTTP request ** 


To make a router, I could do something similar to my DogWalkerApp video (demonstrated for the JS/Rails project).

Make a class called `Router` which stores key-value pairs of pathnames to PageManager objects (which are just classes which handle rendering HTML to the DOM and handling events).
the router can give a method called `redirect` to each of the PageMangers which accepts a string which should correspond to a key of the pathname: PageManager object. If the path exists, it can do `window.history.pushState` and call the `render()` method of the associated pageManager!



## Ok, so how does this work in React??

- Most of this is made for us already, so we just need to know the API of the components that do all the above dirty work for us!

1. Review the docs https://reacttraining.com/react-router/web/guides/quick-start

Cover: 

- `yard add react-router-dom`
- `import { BrowserRouter as Router, Route}
- Basic routing example: describe
    - Wrap everything in a Router opening and closing tag
    - In the switch, notice that "/" is at the bottom, because switch will choose the FIRST match it sees


## Project

- Add Router to allow going to /search

In App, do this first: 


```jsx
      return (
    <Router>
      <div className="App">
          <PokeTeamContainer
            pokemon={chosenPokemon}
            handleRemovePokemon={handleRemovePokemon}
          />

          <Link to="/search">Search</Link>
            <Route 
              path="/search" 
              render={props => (
                <SearchPokemon {...props} handleChoosePokemon={handleChoosePokemon} />
              )}
            
            />

            <Route 
              path="/"
              render={props => (
                <PokePoolContainer {...props} handleChoosePokemon={handleChoosePokemon}/>
              )}
            >
            </Route>
          

        
      </div>
    </Router>
  );

```


Show that clicking `Search` maintins the PokemonPool.

Then, import Switch and wrap the Routes in a switch:

```jsx
  return (
    <Router>
      <div className="App">
          <PokeTeamContainer
            pokemon={chosenPokemon}
            handleRemovePokemon={handleRemovePokemon}
          />

          <Link to="/search">Search</Link>

          <Switch>
            <Route 
              path="/search" 
              render={props => (
                <SearchPokemon {...props} handleChoosePokemon={handleChoosePokemon} />
              )}
            
            />

            <Route 
              path="/"
              render={props => (
                <PokePoolContainer {...props} handleChoosePokemon={handleChoosePokemon}/>
              )}
            >
            </Route>
          </Switch>
          

        
      </div>
    </Router>
  );


```


This will have the correct functionality


Go over Examples in the docs for other functionality