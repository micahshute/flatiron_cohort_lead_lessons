class WandController < ApplicationController

    # set :views, ->{File.join(root, '../views/wands')}

    get '/wands' do
        @wands = Wand.all
        erb :'wands/index'
    end

    get '/wands/choose' do
        @wand = Wand.all.sample
        erb :'wands/show'
    end

end