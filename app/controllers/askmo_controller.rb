class AskmoController < ApplicationController
  def index
    gon.watch.token = form_authenticity_token
  end
end
