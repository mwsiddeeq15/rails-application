module CatdogHelper
  def self.get_all_records
    CatDogSurvey.all
  end

  def self.get_all_records_with_user_info
    CatDogSurvey.all_with_user_info
  end

  def self.add_record(data)
    new_record = CatDogSurvey.create({ users_id: data[:users_id], cat: data[:cat], dog: data[:dog], predicted: data[:predicted] })
    # Return new record w/ info
    UserInfo.find(new_record.users_id).as_json.merge(new_record.as_json)
  end
end
