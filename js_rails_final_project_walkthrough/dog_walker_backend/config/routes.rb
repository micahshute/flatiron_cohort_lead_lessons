Rails.application.routes.draw do
  # resources :walks
  resources :walkers do
    resources :walks
  end
  resources :dogs do
    resources :walks
  end
  # devise_for :owners
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: "home#index"
  get '/profile' => 'home#profile'

  devise_for :owners,
             path: '',
             path_names: {
               sign_in: 'login',
               sign_out: 'logout',
               registration: 'signup'
             },
             controllers: {
               sessions: 'sessions',
               registrations: 'registrations'
             }


  resources :owners do
    resources :dogs
  end



end

