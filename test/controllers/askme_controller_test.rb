require 'test_helper'

class AskmoControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get askmo_index_url
    assert_response :success
  end

end
