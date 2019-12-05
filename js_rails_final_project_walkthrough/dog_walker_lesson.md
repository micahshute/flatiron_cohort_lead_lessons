# JS Rails SPA Walkthrough - Dog Walker App

## Cookies vs JWT

- Cookies are built in and easier to use
- Arguably better security with cookies
- Both have challenges
     - JWT: setup, security concerns
     - Cookies: maintaining CSRF protection

## With Cookies Overview
Use Cookies Instead:

 https://pragmaticstudio.com/tutorials/rails-session-cookies-for-api-authentication 

in your fetch, you need: 

 `credentials: 'include'`

 ```js
 res.headers.get('set-cookie')
 ```

```ruby

class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  protect_from_forgery with: :exception

  #...

end
```

Basically, make sure you grab your CSRF token from the backend and send it with your requests.

The cookie will be set in your browser, so just make sure you use credentials: include to make sure you are sending it back with your AJAX request.

An example API manager in a frontend using rails cookies for auth:

https://github.com/micahshute/tank-client/blob/master/src/http_requests/api_manager.js


## Backend

https://jwt.io/introduction/

https://github.com/waiting-for-dev/devise-jwt


`rails new dog_walker_backend --api`

`gem 'devise-jwt'`
`gem 'dotenv-rails', groups: [:development, :test]`
`touch .env`
`bundle install`
`rails g devise:install`


```
Running via Spring preloader in process 53114
      create  config/initializers/devise.rb
      create  config/locales/devise.en.yml
===============================================================================

Some setup you must do manually if you haven't yet:

  1. Ensure you have defined default url options in your environments files. Here
     is an example of default_url_options appropriate for a development environment
     in config/environments/development.rb:

       config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }

     In production, :host should be set to the actual host of your application.

  2. Ensure you have defined root_url to *something* in your config/routes.rb.
     For example:

       root to: "home#index"

  3. Ensure you have flash messages in app/views/layouts/application.html.erb.
     For example:

       <p class="notice"><%= notice %></p>
       <p class="alert"><%= alert %></p>

  4. You can copy Devise views (for customization) to your app by running:

       rails g devise:views

===============================================================================
```


So, for 1:

`config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }`
in config/environments/development.rb

production.rb will be left alone for now

For 2:
`root to: 'home#index'` in routes.rb

For 3:
Nothing - this is an api

4: Nothing


Next, in conifg/initializers/devise.rb: 

1. READ THE FILE
2. Comment out line 21   `# config.mailer_sender = 'please-change-me-at-config-initializers-devise@example.com'`
3. Uncomment line 43 `  config.authentication_keys = [:email]`

4. Uncomment line 66 `config.params_authenticatable = true` (NOT DONE)

5.
  line 91: 
  `config.skip_session_storage = [:http_auth, :params_auth]`

`rails g devise owner name address `

`rails g resource dog name walk_time:integer notes:text breed owner:belongs_to`

```ruby
#owner.rb
class Owner < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
  :jwt_authenticatable,
  :registerable,
  jwt_revocation_strategy: JwtBlacklist
end

```


`rails g model jwt_blacklist jti:string`

modify migration:
```ruby
class CreateJwtBlacklists < ActiveRecord::Migration[6.0]
  def change
    create_table :jwt_blacklists do |t|
      t.string :jti, null: false
      t.datetime :exp, null: false
    end
    add_index :jwt_blacklist, :jti
  end
end
```

modify model:
```ruby
class JwtBlacklist < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Blacklist

  self.table_name = 'jwt_blacklist'
end
```


```ruby
#config/initializers/devise.rb
config.navigational_formats = []


config.jwt do |jwt|
  jwt.secret = ENV['DEVISE_JWT_SECRET_KEY']
  jwt.dispatch_requests = [
    ['POST', %r{^/login$}]
  ]
  jwt.revocation_requests = [
    ['DELETE', %r{^/logout$}]
  ]
  jwt.expiration_time = 1.day.to_i
end

```

`rake secret`

put in .env file:

```
DEVISE_JWT_SECRET_KEY=the_output_of_rake_secret
```

`touch app/controllers/sessions_controller.rb`

```ruby
class SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: resource
  end

  def respond_to_on_destroy
    head :no_content
  end
end

```


```ruby
#routes.rb

  devise_for :owners,
            path: '',
             path_names: {
               sign_in: 'login',
               sign_out: 'logout',
               registration: 'signup'
             },
             controllers: {
               sessions: 'sessions',
               registrations: 'registrations'
             }

```


`touch app/controllers/registration_controller.rb`

```ruby

class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    def create
        # build_resource(sign_up_params)
        begin
            # resource.save!
            # render_resource(resource)
            super
        rescue ActiveRecord::RecordInvalid => e
            render_resource(e.record)
        rescue ActiveRecord::RecordNotUnique => e
            err = OpenStruct.new(errors: { user: "Already exists" })
            validation_error(err)
        end
    end
end

```


Add to ApplicationController:

```ruby
class ApplicationController < ActionController::API


    def render_resource(resource)
        if resource.errors.empty?
          render json: resource
        else
          validation_error(resource)
        end
      end
    
      def validation_error(resource)
        render json: {
          errors: [
            {
              status: '400',
              title: 'Bad Request',
              detail: resource.errors,
              code: '100'
            }
          ]
        }, status: :bad_request
      end
end


```


`rails g resource walkers name rate:float bio:text`

`rails g resource walk dog:belongs_to walker:belongs_to`

`rails db:migrate`


`gem 'rack-cors'`
`bundle install`

```ruby
# config/intializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ['Authorization']
  end
end


```


`touch app/controllers/home_controller.rb`

```ruby

class HomeController < ApplicationController


    def index
        render json: { message: 'Welcome Home!'}
    end

end
```
```ruby
#routes.rb

Rails.application.routes.draw do
  # resources :walks
  resources :walkers do
    resources :walks
  end
  resources :dogs do
    resources :walks
  end
  devise_for :owners,
             path: '',
             path_names: {
               sign_in: 'login',
               sign_out: 'logout',
               registration: 'signup'
             },
             controllers: {
               sessions: 'sessions',
               registrations: 'registrations'
             }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: 'home#index'

  resources :owners do 
    resources :dogs
  end

end
```

Seed:
```ruby
Owner.destroy_all
Walker.destroy_all

micah = Owner.create(name: 'Micah', email: 'micah@shute.com', password: 'password', address: '1234 Streen Road, Las Vegas, NV')

griffin = Dog.create(name: "Griffin", breed: "Carolina Dog", walk_time: 30, owner: micah)
cricket = Dog.create(name: "Cricket", breed: 'Golden Retriever', walk_time: 20, owner: micah)

annabel = Walker.create(name: "Annabel", rate: 23.00, bio: "I love dogs!")


walk1 = Walk.create(dog: griffin, walker: annabel, time: Time.now)
walk2 = Walk.create(dog: cricket, walker: annabel, time: Time.now)
```

### Why not use can can can

- Good authorization gem
- We do not need it here. If you want to use it, read the docs like we did with Devise


### Instead, for authorization:

```ruby
#application_controller.rb
class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :not_found  
  rescue_from AuthorizationError, with: :unauthorized_error

    def render_resource(resource)
        if resource.errors.empty?
          render json: resource
        else
          validation_error(resource)
        end
      end
    
      def validation_error(resource)
        render json: {
          errors: [
            {
              status: '400',
              title: 'Bad Request',
              detail: resource.errors,
              code: '100'
            }
          ]
        }, status: :bad_request
      end

      def unauthorized_error
        render json: { message: 'You are not authorized to make the request' }, status: 401
      end 


      def authorize_owner_resource(resource)
        raise AuthorizationError.new if resource.owner != current_owner
      end

      def not_found
        render json: { messagee: 'Resource not found' }, status: 404 
      end
      
end


```

`mkdir app/errors`
`touch app/errors/authorization_error.rb`
```ruby
class AuthorizationError < StandardError

end
```



```ruby
class DogsController < ApplicationController

    before_action :authenticate_owner!

    def index
        dogs = current_owner.dogs
        render json: dogs
    end

    def show
        dog = Dog.find(params[:id])
        authorize_owner_resource(dog)
        render_resource(dog)
    end

    def create
        dog = Dog.new(dog_params)
        dog.owner = current_owner
        dog.save
        render_resource(dog)
    end

    def update
        dog = Dog.find(params[:id])
        authorize_owner_resource(dog)
        dog.update(dog_params)
        render_resource(dog)
    end

    def destroy
        dog = Dog.find(params[:id])
        authorize_owner_resource(dog)
        dog.destroy
        render_resource(dog)
    end

    private

    def dog_params
        params.require(:dog).permit(:name, :walk_time, :notes, :breed)
    end
end

```

### SPECS


```ruby

#dogs_spec.rb
require 'rails_helper'

RSpec.describe 'GET /dogs', type: :request do
    
let(:owner) { Fabricate(:owner) }
let(:owner2) { Fabricate(:owner) }
let(:url) { '/login' }
let(:params) do
    {
        owner: {
            email: owner.email,
            password: owner.password
        }
    }
end
let(:params2) do
  {
      owner: {
          email: owner2.email,
          password: owner2.password
      }
  }
end


context 'you must be authorized to perform any crud on dogs' do
  it "doesn't allow any unauthorized requests to the dogs controller" do
    get '/dogs' 
    expect(response.status).to eq 401
    get '/dogs/1'
    expect(response.status).to eq 401
    post '/dogs', params: { dog: {name: 'DNE', breed: "none", walk_time: 45}} 
    expect(response.status).to eq 401
    patch '/dogs/1', params: {dog: {name: 'DNE'}}
    expect(response.status).to eq 401
    delete '/dogs/1'
    expect(response.status).to eq 401
  end

end

  context 'authenticated owners can only create/update their own resources' do
    let(:dogsURL) { '/dogs' }
    before do
      
      post '/login', params: params
      @token = response.headers['Authorization'] 
      post '/login', params: params2
      @token2 = response.headers['Authorization'] 
    end

    it 'returns a 404 for unfound dogs' do 
      get '/dogs/1000', headers: { Authorization: @token}
      expect(response.status).to eq 404
    end

    it 'allows an owner to view only their own dogs' do
      get dogsURL, headers: { Authorization: @token }
      body1 = JSON.parse(response.body)
      # p body1
      expect(body1.length).to eq 2
      expect(body1.first['owner_id']).to eq 1
      expect(body1.last['owner_id']).to eq 1

      get dogsURL, headers: { Authorization: @token2}
      body2 = JSON.parse(response.body)
      # p body2
      expect(body2.length).to eq 2
      expect(body2.first['owner_id']).to eq 2
      expect(body2.last['owner_id']).to eq 2
    end

    it 'prevents an owner from updating a dog which is not theirs' do
      patch '/dogs/3', params: {dog: {name: "DNE"}}, headers: {Authorization: @token}
      expect(response.status).to eq 401
    end

    it 'allows an owner to update their dog' do
      patch '/dogs/1', params: {dog: {name: "Bubba"}}, headers: {Authorization: @token}
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
      expect(body["name"]).to eq("Bubba")
    end

    it 'stops someone who is not the owner from deleting a dog' do
      delete '/dogs/3', headers: { Authorization: @token}
      expect(response.status).to eq 401
    end

    it 'prevents someone from viewing a dog which is not their' do
      get '/dogs/1', headers: { Authorization: @token2 }
      expect(response.status).to eq 401
    end

  end
end
```

```ruby
#authentication_spec.rb
require 'rails_helper'

RSpec.describe 'POST /login', type: :request do
  let(:user) { Fabricate(:owner) }
  let(:url) { '/login' }
  let(:params) do
    {
      owner: {
        email: user.email,
        password: user.password
      }
    }
  end

  context 'when params are correct' do
    before do
      post url, params: params
    end

    it 'returns 200' do
      expect(response).to have_http_status(200)
    end

    it 'returns JTW token in authorization header' do
      expect(response.headers['Authorization']).to be_present
    end

    it 'returns valid JWT token' do
      token_from_request = response.headers['Authorization'].split(' ').last
      decoded_token = JWT.decode(token_from_request, ENV['DEVISE_JWT_SECRET_KEY'], true)
      expect(decoded_token.first['sub']).to be_present
    end
  end

  context 'when login params are incorrect' do
    before { post url }
    
    it 'returns unathorized status' do
      # puts response.headers
      # puts '----'
      expect(response.status).to eq 401
    end
  end
end

RSpec.describe 'DELETE /logout', type: :request do
  let(:url) { '/logout' }

  it 'returns 204, no content' do
    delete url
    # puts response.headers
    expect(response).to have_http_status(204)
  end

  let(:user) { Fabricate(:owner) }
  let(:login_url) { '/login' }
  let(:protected_url) { '/dogs'}
  let(:params) do
    {
      owner: {
        email: user.email,
        password: user.password
      }
    }
  end

  it 'blacklists the jwt token' do
    get protected_url
    expect(response).to have_http_status(401)
    post login_url, params: params
    token = response.headers['Authorization'].split(' ').last
    expect(token).to be_present
    get protected_url, headers: { Authorization: "Bearer #{token}" }
    puts response.status
    expect(response).to have_http_status(200)
    delete url, headers: {Authorization: "Bearer #{token}"}
    get protected_url, headers: { Authorization: "Bearer #{token}"}
    expect(response).to have_http_status(401)
  end 
end
```


```ruby
#signup_spec

require 'rails_helper'

RSpec.describe 'POST /signup', type: :request do
  let(:url) { '/signup' }
  let(:params) do
    {
      owner: {
        email: 'user@example.com',
        password: 'password'
      }
    }
  end

  context 'when user is unauthenticated' do
    before { post url, params: params }

    it 'returns 200' do
      expect(response.status).to eq 200
    end

    it 'returns a new user' do
      # puts response.body
      # puts response.headers['Authorization']
      # expect(response.body).to match_schema('owner')
    end
  end

  context 'when user already exists' do
    before do
      Fabricate :owner, email: params[:owner][:email]
      post url, params: params
    end

    it 'returns bad request status' do
      expect(response.status).to eq 400
    end

    it 'returns validation errors' do
      json = JSON.parse(response.body)
      expect(json['errors'].first['title']).to eq('Bad Request')
    end
  end
end

```

### Controllers