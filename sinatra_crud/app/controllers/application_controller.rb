class ApplicationController < Sinatra::Base


    configure do
        set :views, 'app/views'
        set :public_folder, 'public'
        enable :sessions
        set :session_secret, ENV['SESSION_SECRET']
        set :show_exceptions, false
    end

    get '/' do
        erb :root
    end

    get '/home' do
        authorize
        erb :home
    end

    # Login 1
    # {"session_id"=>"28b156e6efde9b62ea48b96aed22f3ba6a427b3d043fde17867114af3f6eae0f", "csrf"=>"iv+PLJUs7x1fKELQjCxv14Y6Hg7U91dB3+y7ko2b4Zc=", "tracking"=>{"HTTP_USER_AGENT"=>"cef06ffafe1492072268c9b04fc60fc6bbf5b09f"}, "user_id"=>1}
    # Delete cookie 
    # {"session_id"=>"211df4971785af8a80940c7df0fe48fc7768716f42c98b9fc7e8669ba99adde9", "csrf"=>"MGNMQtQc5k/BnihVeplFKk6LOkIY24LDafRV6NXDY0U=", "tracking"=>{"HTTP_USER_AGENT"=>"cef06ffafe1492072268c9b04fc60fc6bbf5b09f"}}
    # Login 2
    # {"session_id"=>"211df4971785af8a80940c7df0fe48fc7768716f42c98b9fc7e8669ba99adde9", "csrf"=>"MGNMQtQc5k/BnihVeplFKk6LOkIY24LDafRV6NXDY0U=", "tracking"=>{"HTTP_USER_AGENT"=>"cef06ffafe1492072268c9b04fc60fc6bbf5b09f"}, "user_id"=>1}
    helpers do

        def current_user
            user = User.find_by(id: session[:user_id])
            raise AuthenticationError.new if user.nil?
            user
        end

        
        def authenticate(username, password)
            user = User.find_by(username: username)
            raise AuthenticationError.new unless !!user
            raise AuthenticationError.new if !user.authenticate(password)
            session[:user_id] = user.id
            user
        end

        def logged_in?
            !!User.find_by(id: session[:user_id])
        end

        def authorize
            current_user
        end

        def authorize_user(post)
            raise NoResourceError.new if !post
            raise AuthorizationError.new if post.user != current_user
        end

        def login_error_messages(errors)
            if errors
                erb :'sessions/_errors', locals: {errors: errors}
            end
        end

        def own_post?(post)
            current_user == post.user
        end

    end


    # DRY: Can we refactor this even more?
    error AuthenticationError do
        status AuthenticationError.status
        erb :error, locals: {msg: AuthenticationError.msg, links: AuthenticationError.links }, layout: false
    end

    error AuthorizationError do 
        status AuthorizationError.status
        erb :error, locals: {msg: AuthorizationError.msg, links: AuthorizationError.links }, layout: false
    end

    error NoResourceError do
        status NoResourceError.status
        erb :error, locals: {msg: NoResourceError.msg , links: NoResourceError.links }, layout: false
    end

    error PostSiteError do
        status PostSiteError.status
        erb :error, locals: {msg: PostSiteError.msg , links: PostSiteError.links }, layout: false
    end

end