class UserController < ApplicationController
  # def index # GET all users
  #   users = User.all
  #   render json: users
  # end

  def create # POST new user
    user = UserHelper.create_user(params)
    render json: user
  end

  def create_info # POST new user_info (and user if none exists)
    if !params.include? :users_id
      user = UserHelper.create_user(params)
    end

    data = params.clone
    data[:users_id] = user.id
    user_info = UserHelper.add_user_info(data)
    render json: user_info
  end
end
