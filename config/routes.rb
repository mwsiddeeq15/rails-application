Rails.application.routes.draw do
  # get 'askmo/index'
  root 'askmo#index'
  match 'askmo', :to => 'askmo#index', :via => :get

  match 'catdog', :to => 'catdog#index', :via => :get
  match 'catdog', :to => 'catdog#add', :via => :post

  # match 'userinfo', :to => 'user#index', :via => :get
  match 'userinfo', :to => 'user#create_info', :via => :post

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
