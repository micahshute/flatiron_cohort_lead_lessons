class HomeController < ApplicationController
    before_action :authenticate_owner!

    def index
        render json: { msg: 'Hello World' }
    end

    def profile
        owner = current_owner
        render_resource(owner, with: [:dogs])
    end
    
end