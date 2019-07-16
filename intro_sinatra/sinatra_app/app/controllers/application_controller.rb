class ApplicationController < Sinatra::Base

    set :views, ->{File.join(root, "../views")}

    get '/' do
        erb :index
    end

    post '/spell' do
        @spell = params[:spell]
        erb :spell
    end

end

