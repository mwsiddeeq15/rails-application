class CreateCatDogSurveys < ActiveRecord::Migration[5.0]
  # Set'up'
  def up
    create_table :cat_dog_surveys do |t|
      t.belongs_to :users, :index => true
      t.boolean "cat"
      t.boolean "dog"
      t.boolean "predicted"
      t.timestamps
    end
  end

  # Tear'down'
  def down
    drop_table :cat_dog_surveys
  end
end
