class DogsController < ApplicationController

    before_action :authenticate_owner!


    def index 
        dogs = current_owner.dogs
        render json: dogs.to_json(include: [:walks] )
    end

    def show
        dog = Dog.find(params[:id])
        authorize_owner_resource(dog)
        render_resource(dog, with: [:walks])
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
