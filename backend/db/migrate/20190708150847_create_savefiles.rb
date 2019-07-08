class CreateSavefiles < ActiveRecord::Migration[5.2]
  def change
    create_table :savefiles do |t|
      t.integer :user_id
      t.integer :level
      t.text :time
      t.integer :health

      t.timestamps
    end
  end
end
