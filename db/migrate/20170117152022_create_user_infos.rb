class CreateUserInfos < ActiveRecord::Migration[5.0]
  # Set'up'
  def up
    create_table :user_infos do |t|
      t.belongs_to :users, :index => true
      t.integer "age"
      t.integer "height"
      t.integer "weight"
      t.timestamps
    end
  end

  # Tear'down'
  def down
    drop_table :user_infos
  end
end
