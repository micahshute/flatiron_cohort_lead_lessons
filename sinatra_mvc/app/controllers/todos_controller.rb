class TodosController < ApplicationController

    get '/todos' do
        @todos = Todo.all
        erb :'todos/index'
    end

    post '/todos' do 
        todo = Todo.create(item: params[:item])
        redirect '/todos'
    end

    get '/todos/new' do
        erb :'todos/new'
    end

    get '/todos/:id' do
        @todo = Todo.find_by(id: params[:id])
        erb :'todos/show'
    end

    get '/todos/:id/edit' do
        @todo = Todo.find_by(id: params[:id])
        erb :'todos/edit'
    end

    patch '/todos/:id' do
        @todo = Todo.find_by(id: params[:id])
        @todo.update(item: params[:item], completed: !!params[:completed])
        redirect '/todos'
    end

    delete '/todos/:id' do
        @todo = Todo.find_by(id: params[:id])
        @todo.destroy
        redirect '/todos'
    end



end