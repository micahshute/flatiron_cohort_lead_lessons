class SessionsController < ApplicationController

    get '/signup' do
        erb :'sessions/signup'
    end


    get '/login' do
        erb :'sessions/login'
    end

    post '/login' do
        begin 
            authenticate(params[:username], params[:password])
            redirect '/home'
        rescue AuthenticationError => e 
            @errors = ["Improper information entered"]
            erb :'sessions/login'
        end
    end

end