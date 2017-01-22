require 'test_helper'

class CatdogControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get catdog_index_url
    assert_response :success
  end

end
