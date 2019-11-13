# Rails API

[Video](https://youtu.be/FjEJ2LLkxHk)

### Objectives

- Understand WHY we want to use a Rails API
- Understand how to get a Rails API up and running from scratch
- Understand how to use a Rails API with your SPA


### Why a Rails API?

- JSON is language agnostic. It is just a string that follows rules that our language of choice can parse into a datatype that pertains to that language (e.g. Ruby Hashes, JavaScript Objets). We can then take that information and turn them into custom objects. 

- So, we can now build a backend that can be used by MULTIPLE frontends! We can build a web app with JavaScript, a mobile app with Swift, Java, or React Native, and we can even let other developers use our backend to make their own sites!!!

- We can get the great user expereience of a JS-based frontend while keeping our backend flexible.


Do this with an existing rails app:

```ruby
class UsersController < ApplicationController
  def index
    @users = User.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @users }
    end
  end
end
```
If we navigate to http://localhost:3000/users.html we’ll see html, if we navigate to http://localhost:3000/users.json we will see JSON.



### Rails API - How?

We ONLY care about JSON now and will never want to return HTML

Start by doing:

`rails new my-app --api`

How is this different??
     - No layout view
     - Controller inherits from ActionController::API which is a lighter-weight version of the class. It does not have ActionView

Now, let's generate a user:

`rails g model user username password_digest name`

Migrate
`rails db:migrate`

And test it in the console

`User.create(name: "Micah", username: "micahshute")`

Note we will leave password blank for now.

Now, make the controller: 
`rails g controller api/v1/users`

    - Why do we version?
        - It allows you to change the api which may break the code of people using v1, giving them time to transition over.
    
    - How do we customize the JSON that is returned?
        - Show relationshiops
        - Hide data





### Serialization

Go into rails console:

```ruby

u = User.all.first
u.to_json

```

- Let's see how to include relationships and hide other data. 
- Start by creating Tweet model which include content

`rails g model tweet content user:belongs_to`

Update models with has_many and belongs_to

Make some tweets in the console. 

***Refresher Q: How do I make tweets in rails c?***

A: 
```ruby
 u = User.all.first
 u.tweets.build(content: "My tweet!")
 u.save
```

In the `users_controller.rb` file:

```ruby
def index
    @users = User.all
    render json: @users
end
```



See it in the browser. Now let's add the relationship and hide the password

Go to the route, let them figure out why the error is there. (No route)
***Q: How do I set up my routes?***

A:

```ruby
# config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
    end
  end
end

```

***Q: What route do I go to?***
A: /api/v1/users

and I get: 
```json
[
    {
        id: 1,
        username: "micahshute",
        password_digest: null,
        name: "Micah",
        created_at: "2019-11-12T19:45:39.873Z",
        updated_at: "2019-11-12T19:45:39.873Z"
    }
]
```

OK, I want to get related tweets and not show my password_digest:

```ruby
#users_controller.rb

def index
    @users = User.all
    render json: @users, only: [:id, :name], include: :tweets
end

```

And now your password is hidden and you have your tweets coming through!

### Connect to the Front End


Go to any website (besides localhost) and attempt a fetch request (expecting CORS error)

```js
    const url = 'http://localhost:3000/api/v1/users'
    fetch(url)
        .then(res => res.json())
        .then(json => console.log(json))
```

ERROR: 

```
Access to fetch at 'http://localhost:3000/api/v1/users' from origin 'https://education.flatironschool.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

Cross-Origin Read Blocking (CORB) blocked cross-origin response http://localhost:3000/api/v1/users with MIME type application/json. See https://www.chromestatus.com/feature/5629709824032768 for more details.
```

***Q: What does this mean??***
A: CORS has blocked us from making cross-site requests. It is important because it lets a website "whitelist" who is able to access it with fetch. 

CORS Resources:
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
https://www.owasp.org/index.php/CORS_OriginHeaderScrutiny

CORS is a rule that `fetch` follows that prevents making a request from one website to another website unless the target website allows it explicitly. 

So, let's tell our rails app to allow our frontend to get data from it!

we will start by just letting our API accept all traffic. You can later update this to ONLY allow your front-end (and your mobile app!)

### Allow CORS

1. Uncomment out `rack-cors` in Gemfile
2. run `bundle install`
3. Open `app/config/initializers/cors.rb` and change it to: 
```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end

```

(should just be able to uncomment it)
