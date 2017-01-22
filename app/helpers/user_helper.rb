module UserHelper
  def self.create_user(data)
    User.create({ anonymous: true })
  end

  def self.add_user_info(data)
    UserInfo.create({ users_id: data[:users_id], height: data[:height], weight: data[:weight] })
  end
end
