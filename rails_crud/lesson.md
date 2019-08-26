`rails new packing-list`

- make README.md to plan migration:

```
 - item: name:text, quantity:integer
```


`rails g model item name quantity:integer`

- tell me what files we just got and what they do

`rails db:migrate`

`rails g controller items`

### Q: Tell me what files we just got and what they do 

### Q: What is the RESTful route for all items? (`/items`)
- make /items work:
    - controller: 
        - What data do we need for this?
        - How do we get the data to the view??
        ```ruby
            def index
                @items = Item.all
                erb :item
            end
        ```
    - view:
        ```bash
            touch app/views/items/index.html.erb
        ```
        - How do we want these items to be displayed?

        ```erb
            <ul>
                <% @items.each do |i| %>
                    <li><%= "#{i.name} - #{i.quantity}"%></li>
                <% end %>
            </ul>
        ```

### Q: How do I test this to see if it worked?
`rails s`
### Q: Why did this fail? (route)
- In routes.rb
    ```ruby
        get '/items', to: 'items#index', as: "items"
    ```
### Q: Why a blank page?
- In seeds.rb:
```ruby

    items = {socks: 5, shoes: 2, underwear: 5, shirts: 3, pants: 3}
    items.map{ |item, quant| Item.create(name: item, quantity: quant)}
```
`rails db:seed`

- Refresh page

### Q: What links do we want on this page?
- New, show
```erb
    <%= link_to "New", new_item_path %>

    <ul>
        <% @items.each do |i| %>
            <li><%= link_to "#{i.name} - #{i.quantity}", item_path(i) %></li>
        <% end %>
    </ul>
```

### Q: Do we need more routes to make this work?

```ruby 
# routes.rb
get '/items/new', to: 'items#new', as: 'new_item'
get '/items/:id', to: 'items#show', as: 'item'
```

### Q: What else do we need? (Controller actions)

```ruby
# item_controller.rb

def new
    @item = Item.new
    render :new
end

def show
    @item = Item.find(params[:id])
    render :show
end
```

### Q: Anything else? (A: views)

```bash
touch app/views/items/new.html.erb app/views/items/show.html.erb
```

- Make show page:

```erb
    # show.html.erb
    <h2>Item: <%= @item.name %></h2>
    <h4>Quantity: <%= @item.quantity %></h4>

    <%= link_to "Edit", edit_item_path(@item) %>
    <%= link_to "Back", items_path %>
    <%= button_to "delete", @item, :method => :Delete %>
```

### Q: What code does the button_to make??? (Inspect it)
- A: a form 
### Q: How is this not magic?
- A: takes the object @item as an argument

- Add route
```ruby
# rotues.rb
get '/items/:id/edit', to: 'items#edit', as: 'edit_item'
delete '/items/:id', to: 'items#destroy'

```

- Add controller action:
```ruby
def edit
    @todo = Todo.find(params[:id])
    render :edit
end

def destroy
    Todo.find(params[:id]).destroy
    redirect_to items_path
end
```
- Make path

`touch app/views/items/edit.html.erb`

- Test delete route

Now, we need an edit and new page - let's make a partial that can be used in both

### Q: Why do a partial?? 

`touch app/views/items/_form.html.erb`

```erb
<% # _form.html.erb  %>
<%= form_with model: item, local: true do |f|  %>

    <%= f.label :name %>
    <%= f.text_field :name %>

    <%= f.label :quantity %>
    <%= f.text_field :quantity %>

    <%= f.submit %>
<% end %>
```

### Q: How do I implement this partial?

```erb
<% # new.html.erb%>
<%= render 'form', item: @item %>

<% # edit.html.erb%>
<%= render 'form', item: @item %>

```
### Q: Inspect the HTML - how do we change the label to "Item" and still have it work?

```erb
<%= form_with model: item, local: true do |f|  %>

    <%= f.label :item %>
    <%= f.text_field :name, id: :item %>

    <%= f.label :quantity %>
    <%= f.text_field :quantity %>

    <%= f.submit %>
<% end %>
```

### Q: What links do we want in edit and new?
- A: edit: cancel => /items back: item_path(@item) new: cancel => /items

```erb
<%= link_to "Cancel", items_path %>
<%= link_to "Back", item_path(@item) %>
```

### Q: Edit page, the fields are pre-populated? Is this magic? Why or why not?
- A: NO IT IS NOT MAGIC. form_with uses the model inputted to determine if it is new or not
### Q: How does it know if the model is new?
 - A: #new_record? also the id will be nil if not saved


### Q: Will creating or editing an item work now?
- A: no, we need routes and create and update actions

```ruby
# routes.rb
post '/items', to: 'items#create'
patch '/items/:id', to: 'items#update'
```


```ruby
# item_controller.rb
def create
    raise params.inspect
end

```

```ruby
<ActionController::Parameters {"authenticity_token"=>"o7xQogDJ16iwLMFatorNPCLFuFu0bkJw8M6rI+FSaXklwhqAz/Hg6nDv+C/o8JGCpBmG0t/T3ybYY9GRBh7mqQ==", "item"=>{"name"=>"underwear", "quantity"=>"5"}, "commit"=>"Create Item", "controller"=>"item", "action"=>"create"} permitted: false>

```

### Q: What stands out about these params? What must the names be from the form if this is what the params look like?
- A: item[name], item[quantity]

### Q: What happens if I try to create an item by saying Item.create(params[:item])?

```ruby
ActiveModel::ForbiddenAttributesError

>>  params[:item]
=> <ActionController::Parameters {"name"=>"underwear", "quantity"=>"5"} permitted: false>
```

### Called Strong Params. Q: WHY??
- A: to protect params coming in from a user editing a form and adding input boxes.

- To fix: 

```ruby
# item_controller.rb
def create
    Item.create(item_params)
    redirect_to items_path
end


private

def item_params
    params.require(:item).permit(:name, :quantity)
end
```

### Q: What should the update method look like?

```ruby
# item_controller.rb

def update
    item = Item.find(params[:id])
    item.update(item_params)
    redirect_to item_path(item)
end
```
### Test all CRUD actions


# Refactor
### NOTE: This is where class names REALLY MATTER
#### i.e. controller ItemsController, not ItemController, views folder items not item, etc.

- Refactor to shortcuts
    - Routes:
    ```ruby
        resources :item
    ```
- ItemController
    - before_actions
    ```ruby 
    #items_controller.rb
    before_action :set_todo, only: [:show, :edit, :update, :destroy]

    private

    def set_todo
        @item = Item.find(params[:id])
    end
    ```
    - use implicit rendering
        - Everything that renders the same name as the method name
    

