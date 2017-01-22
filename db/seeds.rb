# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

amount = 50



# # Random Sample Data
# users = []
# for i in 1..amount
#   users.push({ anonymous: true })
# end

# Targeted Sample Data: heavy/light short/tall -> cat/dog
users = [
  { anonymous: true },
  { anonymous: true },
  { anonymous: true },
  { anonymous: true },
  { anonymous: true },
  { anonymous: true },
  { anonymous: true },
  { anonymous: true },
  { anonymous: true },
  { anonymous: true }
]
User.create(users)



# # Random Sample Data
# user_infos = []
# for i in 1..amount
#   age = rand(13..70).to_i
#   height = rand(18..80).to_i
#   weight = rand(90..200).to_i
#   user_infos.push({ users_id: i, age: age, height: height, weight: weight })
# end

# Targeted Sample Data: heavy/light short/tall -> cat/dog
user_infos = [
  { users_id: 1, height: 45, weight: 70 }, #cat
  { users_id: 2, height: 66, weight: 180 }, #dog
  { users_id: 3, height: 50, weight: 115 }, #cat
  { users_id: 4, height: 70, weight: 200 }, #dog
  { users_id: 5, height: 55, weight: 120 }, #cat
  { users_id: 6, height: 69, weight: 190 }, #dog
  { users_id: 7, height: 63, weight: 160 }, #dog
  { users_id: 8, height: 59, weight: 130 }, #cat
  { users_id: 9, height: 76, weight: 230 }, #dog
  { users_id: 10, height: 86, weight: 225 } #dog
]
UserInfo.create(user_infos)



# # Random Sample Data
# cat_dog_surveys = []
# for i in 1..amount
#   user_cat = rand(0..1) === 0
#   predict_cat = rand(0..1) === 0
#   cat_dog_surveys.push({ users_id: i, cat: user_cat, dog: !user_cat, predicted: user_cat ===  predict_cat})
# end

# Targeted Sample Data: heavy/light short/tall -> cat/dog
cat_dog_surveys = [
  { users_id: 1, cat: true, dog: false, predicted: true},
  { users_id: 2, cat: false, dog: true, predicted: false},
  { users_id: 3, cat: true, dog: false, predicted: true},
  { users_id: 4, cat: false, dog: true, predicted: false},
  { users_id: 5, cat: true, dog: false, predicted: true},
  { users_id: 6, cat: false, dog: true, predicted: true},
  { users_id: 7, cat: false, dog: true, predicted: false},
  { users_id: 8, cat: true, dog: false, predicted: true},
  { users_id: 9, cat: false, dog: true, predicted: true},
  { users_id: 10, cat: false, dog: true, predicted: true}
]
CatDogSurvey.create(cat_dog_surveys)
