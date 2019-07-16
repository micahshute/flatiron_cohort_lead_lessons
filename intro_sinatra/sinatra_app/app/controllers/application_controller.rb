class ApplicationController < Sinatra::Base

    set :views, ->{File.join(root, "../views")}

    get '/' do
        erb :index
    end

    post '/spell' do
        @spell = params[:spell]
        @spell = "You are expelled" if @spell.downcase == "avada kedavra"
        erb :spell
    end

end

