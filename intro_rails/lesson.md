lesson slides?

- `gem install rails --version 5.2`
- navigate to appropriate file directory
- `rails new todo-app`
- `rails g scaffold todo title completed:boolean`
```
      invoke  active_record
      create    db/migrate/20190818180306_create_todos.rb
      create    app/models/todo.rb
      invoke    test_unit
      create      test/models/todo_test.rb
      create      test/fixtures/todos.yml
      invoke  resource_route
       route    resources :todos
      invoke  scaffold_controller
      create    app/controllers/todos_controller.rb
      invoke    erb
      create      app/views/todos
      create      app/views/todos/index.html.erb
      create      app/views/todos/edit.html.erb
      create      app/views/todos/show.html.erb
      create      app/views/todos/new.html.erb
      create      app/views/todos/_form.html.erb
      invoke    test_unit
      create      test/controllers/todos_controller_test.rb
      create      test/system/todos_test.rb
      invoke    helper
      create      app/helpers/todos_helper.rb
      invoke      test_unit
      invoke    jbuilder
      create      app/views/todos/index.json.jbuilder
      create      app/views/todos/show.json.jbuilder
      create      app/views/todos/_todo.json.jbuilder
      invoke  assets
      invoke    scss
      create      app/assets/stylesheets/todos.scss
      invoke  scss
      create    app/assets/stylesheets/scaffolds.scss
```
- Migrate:
``` rake db:migrate ```
- Show functionality in `rails server`
- Look at all of the files created individually
- Point out specifically big changes from sinatra:
    - Models inherit from ApplicationRecord instead of ActiveRecord::Base. ApplicationRecord DOES inherit from ActiveRecord::Base but is a 'abstract class'.
    - Controllers inherit from ApplicationController (same), but ApplicationController inherits from ActionController::Base instead of Sinatra::Base.
    - before_action
    - method names: "RESTful actions" instead of routes
    - Routes in config/routes.rb
    - actions implicitly render erb file with the same name
    - require/permit params
- helpers are in separate modules instead of inside a controller as a block





-Remove with:

```
    rake db:rollback
    rails destroy scaffold todo item completed:boolean
```


- Make with other generators

- Get list of available generators:
`rails generate`


- `rails g resource todo item completed:boolean`

```
Running via Spring preloader in process 31471
      invoke  active_record
      create    db/migrate/20190819052012_create_todos.rb
      create    app/models/todo.rb
      invoke    test_unit
      create      test/models/todo_test.rb
      create      test/fixtures/todos.yml
      invoke  controller
      create    app/controllers/todos_controller.rb
      invoke    erb
      create      app/views/todos
      invoke    test_unit
      create      test/controllers/todos_controller_test.rb
      invoke    helper
      create      app/helpers/todos_helper.rb
      invoke      test_unit
      invoke    assets
      invoke      scss
      create        app/assets/stylesheets/todos.scss
      invoke  resource_route
       route    resources :todos
```

- This time, migration, model, controller all made, but controller is blank, view folder has no files.
- This gives you more flexibility
- params are still `resources :todos`
- you CAN configure routes, ie:
`resources :todos, only: [:index, :show]`
OR 
'resources :todos, except: [:delete]`
- ***Explain to me why this ISN'T magic***
  - For routes, controller actions, generators, and models.



- If you want even MORE control:

`rails g model todo item completed:boolean`
```
Running via Spring preloader in process 26368
      invoke  active_record
      create    db/migrate/20190818222831_create_todos.rb
      create    app/models/todo.rb
      invoke    test_unit
      create      test/models/todo_test.rb
      create      test/fixtures/todos.yml
```


`rails g controller Todos new create upda
te`
```
Running via Spring preloader in process 31686
      create  app/controllers/todos_controller.rb
       route  get 'todos/new'
get 'todos/create'
get 'todos/update'
      invoke  erb
      create    app/views/todos
      create    app/views/todos/new.html.erb
      create    app/views/todos/create.html.erb
      create    app/views/todos/update.html.erb
      invoke  test_unit
      create    test/controllers/todos_controller_test.rb
      invoke  helper
      create    app/helpers/todos_helper.rb
      invoke    test_unit
      invoke  assets
      invoke    scss
      create      app/assets/stylesheets/todos.scss
```
- `rails g controller Todo` gave us:
```
Rails.application.routes.draw do
  get 'todos/new'
  get 'todos/create'
  get 'todos/update'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
```


- Custom Routes:
` get 'todos/:id', to: 'todos#show', as: 'todo'

- `rake routes`

- Talk about HTML helpers - this is a big difference. You can use code from `rails g scaffold` as an example.