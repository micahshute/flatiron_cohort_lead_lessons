[Lesson Slides](https://docs.google.com/presentation/d/1SPkY7kc0sbftK_ifQ_wL0BWMpcKc3HUvvqqzg7iWtwg/edit?usp=sharing)

[Video](https://youtu.be/YJoL67FoXR0)

- Make a new gem via `bundle gem <gemname>`
- Put all of your `require` statements in `<gemname>.rb`
    - You can change the name to `environment.rb` if you'd like
- What is a shebang? Where does it go, and what is it for
    - Put an executable file in `bin`, shebang goes at the top.
    - Wikipedia: In Unix-like operating systems, when a text file with a shebang is used as if it is an executable, the program loader mechanism parses the rest of the file's initial line as an interpreter directive. The loader executes the specified interpreter program, passing to it as an argument the path that was initially used when attempting to run the script, so that the program may use the file as input data.[8] For example, if a script is named with the path path/to/script, and it starts with the following line, #!/bin/sh, then the program loader is instructed to run the program /bin/sh, passing path/to/script as the first argument.
    - Basically, it tells the computer what language to use. It is the same as saying `ruby path/to/script` in this case
    - `#!/usr/bin/env ruby`

- What is the difference between `require` and `require_relative` ? 
- Do your initial commit
- Make a new branch so you can come back to this point at any time. call it `execytable_setup`.
- Start with bin file. What do we want to say there for our program to run? 
    - Have them give you ideas. Tell them to think in "good OOP code" - USE ABSTRACTION

```ruby
app = CLI.new
app.run
```

- GOAL: Make this display "Hello World" on the screen, then end the program

- OK, so let's make a CLI class 
    - may have to `chmod 777 bin/movies`
     - Don't require it in the environment file, and see if they can figure out what went wrong
     - need require_relative for movie_version
     - Require CLI in current_movies.rb, as well as require current_movies.rb in bin/movies

- Once it's working, let's do another commit. Is our executable_setup complete? Let's merge it with master, and make a new branch dev

- What should the CLI class do? start making it so you can list movies and then choose one for details

- See if they try to do scraping in the CLI class. Maybe even start doing it yourself and ask them what you are doing wrong.

- Once CLI has begun successfully, commit. 

- Start making Scraper class to get bottom level movies.
    - Talk about the design choice between giving scraper all class methods or making it an initializable object. Both are valid.
- commit
- Instantiate movie objects with the info
- commit
 Have them be listed out. Allow one to be chosen in CLI. 
