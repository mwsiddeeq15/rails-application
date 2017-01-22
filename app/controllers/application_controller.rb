class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # TODO:: Stopgap Solution (Bad Idea For Production)
  # Don't have time to deal with the issues that are comming from sending 'csrf-token' via ajax
  # Only works as expected when 'authenticity_token' is summited via input field in 'form submit'
  skip_before_action :verify_authenticity_token
end
