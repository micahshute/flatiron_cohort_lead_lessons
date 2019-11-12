# SPA and Fetch

# Videos:
[Fetch](https://youtu.be/MyK0QEl8bjI)
[SPA w/ Fetch](https://youtu.be/ZtlyGQJr-0k)

### Objectives:

- Describe Single Page App -> start with a base HTML file which we will populate and change with JS as the user interacts with it.
    - The page will not refresh, instead all HTML changes will be purely JS-driven

- Understand how to use `fetch` to send HTTP requests to a backend (including `GET`, `POST`, `PATCH`, `PUT`, `DELETE`)
- Understand the benefits in user experience using fetch over page refreshes


- [ ] Manipulate the DOM in conjunction with `fetch` calls
- [ ] Understand optimistic vs pessimistic rendering

### Deliverables (User Stories)

Expand the functionality of the JS Pokemon Search Assignment!

- [ ] As a user, I should see all the Pokemon
- [ ] As a user, I should be able to delete a Pokemon on click of a button
- [ ] As a user, I should be able to create my own Pokemon
- [ ] As a user, I should be able to edit a clicked Pokemon

These changes should _persist_ in our database.

### Getting started

- Our backend will be simulated using JSON Server. Show it:
    - To setup: `npm install -g json-server`
    - Have a db.json file in your directory.
    - JSON server will evaluate your JSON and give you restful routes which you can get back info from your db.json file in JSON format.
    - If you look at the schema we have, we start with `{ pokemon: [...]}`. This tells JSON Server that the `resource` is pokemon. So, it will give you the restful routes `GET /pokemon`, 'GET /pokemon/id`, `POST /pokemon`, `PATCH /pokemon/id`, and `DELETE /pokemon/id`, and will return or update parts of your `db.json` file based on what HTTP requests we send to the server.
    - To get the ID, each object in the array must have a key of `id`. EG: 

    ```json
    {
  "pokemon": [
    {
      "height": 10,
      "weight": 130,
      "id": 2,
      "name": "ivysaur",
      "abilities": [
        "overgrow",
        "chlorophyll"
      ],
      "moves": [...
      ```
    - Start the JSON server with the command `json-server --watch db.json`

- Show the data in the browser --> localhost:3000/pokemon


### Fetch

Persisting data/change? Well _crud_... how do we do that? 🤔

| CRUD              | FETCH         |
| ----------------- | ------------- |
| Create            | POST          |
| Read              | GET           |
| Update            | PATCH or PUT  |
| Delete / Destroy  | DELETE        |

[Using `fetch` Documentation][using-fetch-mdn]


- Go to https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch to show fetch

- In browser, do:

```js

    const res = await fetch('http://localhost:3000/pokemon/2')
    const json = await res.json()
    console.log(JSON.stringify(json))

```

#### Intuition

- What do you think happened above? 
- What can we discern from the code.
    - HTTP Request?
        - GET
    - What does await mean??
        - Something async
    - How do you think we would do a post or patch or delete request?
        - Other parameters required in the fetch method


### .then syntax

```js

fetch('http://localhost:3000/pokemon/2')
    .then(res => res.json())
    .then(json => {
        let txt = JSON.stringify(json)
        console.log(txt)
    })

```

- Note that with this syntax, the next input to `.then` is determined by the RETURN value of the previous THEN. Watch what happens when we do this: 

```js

fetch('http://localhost:3000/pokemon/2')
.then(res => {res.json()})
.then(json => {
    let txt = JSON.stringify(json)
    console.log(txt)
})

```

- Why did that return undefined????

- Where do you think we would start rendering info to the page?



### Fetching ⚾️ <== 🐕

**About**

* `fetch` will always **return** a [_Promise_][mdn-promise] and it is promising to do something **if** it returns. We can think of this as the **promise** of an eventual value
  * There is **NO** guarantee of when it will come back!
  * There is **NO** guarantee that it will succeed!
* We **want** `fetch` to be **asynchronous _BECAUSE_**:
  * **If** `fetch` calls were **synchronous**, we would be stuck waiting for the call to finish before the code could proceed.
  * So **rather than _blocking_** any other JavaScript from running, we want `fetch` calls to be asynchronous. We want to write code around the eventual success or failure of some _asynchronous_ ⏳ operation such as an HTTP request.

**Usage**

* The `body` data **HAS** to be a string in a `POST`, `PUT`, or `PATCH` `fetch` call.
* You need `headers` in `POST`, `PUT`, or `PATCH` to tell the server what kind of content (`Content-Type`) you are sending to it. For example:
  * `'Content-Type': 'application/json'` is telling the server that you are sending a string of JSON in the `body` of your `fetch` request. You can [read more about the different types of data that can be sent here][mdn-mime-types]

---

### POST example:

- Go back to FETCH API Docs: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- What type of data is the second argument?
    - Javascript object
    - Key `method` describes 'POST' as a string
    - Key `headers` value is another object which can take key-value header pairs
    - Key `body` holds a STRING which is the data we want to post.

Let's use this info to POST the following data to the server:

```json
{
    "id": 1,
    "name": "Bulbasaur",
    "height": 8,
    "weight": 85
}

```

- Tell me what to write - restful POST to make a new pokemon:

```js
const url = "http://localhost:3000/pokemon"
const data = {
    "id": 1,
    "name": "Bulbasaur",
    "height": 8,
    "weight": 85
}
const res = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})

const json = await res.json()
console.log(json)
```

Now using `.then` syntax:

```js

const url = "http://localhost:3000/pokemon"
const data = {
    "id": 1,
    "name": "Bulbasaur",
    "height": 8,
    "weight": 85
}

fetch(url, {
     method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(res => res.json())
.then(json => {
    console.log(JSON.stringify(json))
})

```

## Optimistic vs Pessimistic Rendering

#### Optimistic

* You can manipulate the DOM synchronously (outside the `.then()`).
* This is referred to as optimist rendering because you are **not waiting** for the async response to resolve.

**Pros**:
* Super responsive! User Experience++!

**Cons**:
* `fetch`es (aka: the "Promise") can lie!! If the `fetch` fails, data can become out of sync.
* `fetch`es are also **NOT** guaranteed to run in order.
  * What if we create a Pokemon and then update it relying all on optimistic rendering? The `PATCH` might reach the server _before_ your `POST`!!

Very interesting example of optimistic rendering that is handled _robustly_: **Reddit**

> When you vote, your vote isn’t instantly processed—instead, it’s placed into a queue.
>
> Source: [Caching at Reddit](https://redditblog.com/2017/1/17/caching-at-reddit/)

[Hacker News commenter's insight](https://news.ycombinator.com/item?id=13433793):

> I remember looking into this a while ago and was bewildered to find that when I upvoted or downvoted, there was no XHR call to the backend! There was no hidden iframe/image, no silent form post. Absolutely no network activity. Yet when I refreshed, my vote was shown correctly. I thought I was going crazy.
>
> This was long ago so I'm a bit fuzzy on the details but after a bit of digging, I found the most elegant data collection technique I've ever seen. Instead of sending network data when I voted, a local cookie was set with the link id and vote value. Then when I went to another page, my browser naturally sent the cookie to the server, where I believe it was processed, and then a fresh cookie was sent back to my browser. I could vote on 10 links, the local cookie would get large and then on the next page refresh, the backend would receive my batch of votes, process them, and send me a fresh cookie again.

#### Pessimistic

* You can manipulate the DOM asynchronously (inside the `.then()`) using the response from the server.
* Doing this is called pessimistic rendering because you **are waiting until** the async response has return to complete the action. In other words, you're pessimistic about the success of the request.
* This is to make sure the data on your page is consistent with the database.

**Pros**:
* What is reflected in the _client_ will always be in sync with the _server_.

**Cons**:
* If the `fetch` is slow, the UI will appear to not respond! (**hint** maybe good UX will signal to the user that something is happening)

![loading spinner](https://media.giphy.com/media/jAYUbVXgESSti/giphy.gif)

Example of a feature you might want to always do pessimistically: **user signup**

* Think about registration forms on the web. What do they normally all do?
  * Disable things once you submit?
  * Show a spinner?
  * Anything else?
* You want to confirm that a new user was successfully created before redirecting your user somewhere. In this case, pessimistic rendering is preferable.

```js
pokemonPostForm.addEventListener('submit', (event) => {
    // submits will try to POST!!! so everything refreshes!
    event.preventDefault();
    console.log(event);
    // optimistic vs pessimistic
    // postPokemon(event);
    fetch(`http://localhost:3000/pokemon/${selectedPokemon}`, {
        method: 'PATCH',
        // the header, among other things it does
        // it tells the server with 'Content-Type'
        // what type of string data, since body is always a string,
        // is being sent over
        // "application/json => means json type data for this application
        headers: { // dont forget these!!!!!
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "name": 'PATCHED!'
        })
      }

    ).then(
      // pessistic rendering logic here INSIDE the fetch -- only will update AFTER the fetch resolves
    )
    .catch( err => {
        // undo the optimisic rendering IF USING OPTIMISTIC RENDERING
    })
    // optimisic rendering INSIDE the event listener BUT OUTSIDE the fetch
    // update DOM
  })

```
---
## Updating the DOM

As the developer, _it is your job to decide whether optimistic or pessimistic rendering is appropriate_. You must then remember to update the data **everywhere** that it is kept. At a **minimum**, this means:

1. `fetch` for making changes to your database
2. DOM manipulation for updating what the user sees in the browser

_But wait, there's more!_

3. Did you store any data in JavaScript variables?
  * Update them!

These steps are you being aware of _how_ **your** application is built.

**Considerations** for #1, #2, #3, etc...:

1. Where should you put that `fetch`?
  * When do you want it to be sent? 🤔
  * Perhaps on some sort of `event`? 🤔🤔
  * Maybe I can _listen_ for a certain type of `event`? 🤔🤔🤔
  * I wonder where I can _add_ that _`event`_ _listener_? 🤔🤔🤔🤔
  * Maybe somewhere where we can _delegate_ that responsibility? 🤔🤔🤔🤔🤔
2. How can we update the DOM?
  * JavaScript has a **TON** of ways to accomplish the same task. Some are more hacky than others. Some are better than others. However, **always** remember: Red, Green, Refactor!
  * **Do what you know** to work before you try and make it better!
  * Some example strategies for manipulating the DOM:
    * Rerender the entire container! 🙌
    * `appendChild` 🤱 (just make sure to construct the whole node to append)
    * Add to `innerHTML` +=
    * `event.currentTarget` to find what the event listener is attached to (where everything bubbles up to) 👂
    * Climbing the tree 🧗‍🌲:
      * `event.target.parentElement` or `event.target.parentNode` for looking up the tree ([difference](https://stackoverflow.com/questions/8685739/difference-between-dom-parentnode-and-parentelement))
      * `event.target.children` for looking down the tree
    * `removeChild` 😵
    * Be mindful where you create your variables for your `.querySelector()` (does it need to be inside the fetch? or event listener?)
    * Learn to use the MDN docs!
3. Be sure to update your global/local js variables after you've updated the server and the browser. Keep all datapoints in sync
  * **HOWEVER!** Remember to take note of which methods are destructive and which are NOT!
  * If you don't remember, look it up! Google, StackOverflow, MDN, think of them as your "phone a friend". ☎️
  * For example: `filter` does not mutate while `push` does! Consistency? Naming conventions? What do you think we are, Ruby? 💎🤣

**Et cetera!**

As you are adding functionality (those things above), there will be times where you will need to add, remove, or change the base HTML in order to be able to accomplish the task. Remember that you are the developer. **You get to decide how the HTML looks!**

For example:

- new elements (`<button>`, `<form>`)
- more attributes (`data-id`, `data-action`)
- renaming attributes that make no sense (class: `pokemon-container` => `pokemon-card`)

```html
<div data-id="1" class="pokemon-card">
  <div class="pokemon-frame">
    <h1 class="center-text">bulbasaur</h1>
      <div class="pokemon-image">
        <img name="flip" data-id="1" data-action="flip" class="toggle-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png">
      </div>
    <button data-action="delete" class="pokemon-button">Delete</button>
  </div>
</div>
```

---



- OK, so how to get started. First of all, what do we want to be able to do? Let's choose one feature first, and focus on how to implement that while being as organized as possible.

- Rendering all pokemon from the get request.
