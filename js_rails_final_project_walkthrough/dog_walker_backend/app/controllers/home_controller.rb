class HomeController < ApplicationController

    def index
        render json: { message: "Welcome Home!"}
    end
    
end