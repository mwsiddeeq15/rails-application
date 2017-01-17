require 'test_helper'

class AskmeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get askme_index_url
    assert_response :success
  end

end
