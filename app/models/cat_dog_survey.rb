class CatDogSurvey < ApplicationRecord
  def self.all_with_user_info
    # Rails '.joins' is not behaving as expected with psql
    psql_join_query = "
      SELECT user_infos.users_id, user_infos.height,
        user_infos.weight, cat_dog_surveys.cat,
        cat_dog_surveys.dog, cat_dog_surveys.predicted
      FROM user_infos, cat_dog_surveys
      WHERE user_infos.users_id = cat_dog_surveys.users_id;
    "
    ActiveRecord::Base.connection.execute(psql_join_query)
  end
end
