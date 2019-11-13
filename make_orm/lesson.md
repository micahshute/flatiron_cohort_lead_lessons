### Build ORM From Scratch

[Video](https://youtu.be/xrIkx5wAwug)

#### Objectives

Let's build a twitter CLI that allows a user to make and read tweets. All tweets will be saved in a SQLite3 database, which can be read by ruby and turned into Tweet objects.

- Build file archetecture
    - bin
    - lib
    - config
    - db

- How to start? Well let's start with what we know. How do we want to kick off the program? 
 - bin/run

- Populate bin
    - `touch bin/run`

- add shebang `#!/usr/bin/env ruby`
- `require_relative '../config/env'`
 - `TweetsApp.new.start`

 - Make environment file inside of config
 - Make lib/tweet_app.rb
    - make #start puts `hello world`

 - Make lib/tweets_app.rb have a while loop in the start which allows the user to put a message and then displays all tweets

 - Make a Tweet model instantiated with username and message
 - Start putting SQL functionality into tweet class
 - Setup SQL in config/env
 - Setup actual database db/tweets.db
 `sqlite3 twitter.db`
 `CREATE TABLE tweets (id INTEGER PRIMARY KEY, username TEXT, message TEXT)`

 - Use ? to prevent sql injection



