class ApplicationController < Sinatra::Base


    configure do
        set :views, 'app/views'
        enable :sessions
        set :session_secret, ENV['SESSION_SECRET']
    end


end