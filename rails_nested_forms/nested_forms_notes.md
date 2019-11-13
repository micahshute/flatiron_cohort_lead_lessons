- Starting project: https://github.com/micahshute/rails-nested-forms-lesson

[Video](https://youtu.be/A-rX40taEJg)

### Objectives
- Understand what nested forms are and why they would be desirable
- Start with basic framework for an app with Projects and Tasks, implement nested forms
- Understand what helpers are necessary
- Understand what methods the helpers write for you

- Evaluate starting code. 
     - What exists? Database, MVC
     - What do you expect to see in the browser?
     - What is different about the Project model?
     - With this code, how are tasks made? Note: examine the html, it wants you to put a project id into the textfield in the Task form. Let's figure out a better way to do that.

Add `accepts_nested_attributes_for :tasks` to the Project class.

- Q: What does this do?
    - A: What do almost all of these types of methods do for us? Write methods for us! This one writes task_attributes=(attributes)

- Q: What else has to change? 
    - Let's do the view first

in views/projects/_form.html.erb
```erb
  <h2>Tasks</h2>

  <%= form.fields_for :tasks, project.tasks do |task_form| %>

    <%= task_form.label :name %>
    <%= task_form.text_field :name %>
    <%= task_form.label :complete %>
    <%= task_form.check_box :complete %>
    
  <% end %>
```

go to /projects/new

- Q: The h2 Tasks is there, why isn't our new form?
    - A: There are no tasks associated with our @project in the new controller. Let's make some


In /controllers/projects_controller.rb

```ruby
def new
    @project = Project.new
    2.times{ @project.tasks.build }
end
```

- Inspect the HTML
```html
<input type="text" name="project[tasks_attributes][0][name]" id="project_tasks_attributes_0_name">
```
Rails is now organizing our params for us for its transit to the controller upon submit


Try to make a new project.
Did it work right??
```
<ul>  
  <% @project.tasks.each do |t| %>
    <li><%= t.name %> - <%= t.complete ? "Done" : "Not Done" %></li>
  <% end %>
</ul>

```

Let's alter the project show page to find out


```
# views/projects/show.html.erb

```

No, the tasks were not saved. Why??

Put a binding.pry in the `create` controller in projects_controller.rb

- `params` look good! How about `project_params`?
    - No tasks in there! How do we fix it?

- What method do we have to alter?
    - A: project_params

- How do we alter it? What makes the most sense:
    - Think about:
    - What methods did accept_nested_attributes_for write for us? (A: task_attributes=)
    - So, what should the key of our nested hash be? It is going into the .new method
    - When we put {name: "Save the world"} in there, what writer does our .initialize method call? (A: self.name= "Save the world")
    - So what writer do we want our .initialize method to call with the task params? (A: self.task_attributes=)

- So, let's add a key of `task_attributes` and make the nested hash be the writers for tasks!

```ruby
# projects_controller.rb
 def project_params
    params.require(:project).permit(:name, :due_date, tasks_attributes: [
    :name,
    :complete
    ])
end
```

Now it works! 

Wait, but there is an error when I try to delete a project? Why?

Let's make it so before we delete a project, all of our tasks are deleted. This also saves memory space

```ruby
# project.rb
has_many :tasks, dependent: :destroy

```

What if we wanted to do a custom create to our Tasks though? 

We can!

In project.rb, remove accepts_nested_attributes_for :tasks, and replace with a custom writer

```ruby
 def tasks_attributes=(task_attr)
    binding.pry
    
end
```
gives us:

```ruby
{"0"=>{"name"=>"Find out what is threatening it", "complete"=>"0"},
 "1"=>{"name"=>"Save it", "complete"=>"0"}}
```
So, each value set is the params for a single task. So, let's do this:
```ruby
 def tasks_attributes=(task_attr)
    task_attr.values.each do |attr|
        attr[:name] = attr[:name].upcase
        self.tasks.build(attr)
    end
end

```

Note: Someone will probably ask how to I make more tasks for a project or have that number be variable

You COULD use url parameters to change how many forms, but the best way to do it is JS
Not using JS would be appropriate for a nested form which always has the name number of nested elements.
e.g. when the number of nested elements is fixed, ie a team with starting players.

