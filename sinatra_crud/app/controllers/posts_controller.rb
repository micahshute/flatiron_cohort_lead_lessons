class PostsController < ApplicationController

    get '/posts' do
        authorize
        @posts = Post.all
        erb :'posts/index'
    end

    get '/posts/new' do
        authorize
        erb :'posts/new'
    end

    post '/posts' do
        authorize
        u = current_user
        u.posts.build(content: params[:content])
        raise PostSiteError.new if !u.save 
        redirect '/posts'
    end 

    get '/posts/:id/edit' do
        @post = Post.find_by(id: params[:id])
        authorize_user(@post)
        erb :'posts/edit'
    end

    patch '/posts/:id' do
        p = Post.find_by(id: params[:id])
        authorize_user(p)
        p.update(content: params[:content])
        redirect '/posts'
    end

end