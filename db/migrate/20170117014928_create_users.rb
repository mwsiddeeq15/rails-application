class CreateUsers < ActiveRecord::Migration[5.0]
  # Set'up'
  def up
    create_table :users do |t|
      # Longhand
      t.column "name", :string
      # Shorthand
      t.boolean "anonymous", :default => false

      t.timestamps
      # 't.timestamps' auto creates both 'created_at' and 'updated_at' fields
      # t.datetime :created_at
      # t.datetime :updated_at
    end
  end

  # Tear'down'
  def down
    drop_table :users
  end
end
