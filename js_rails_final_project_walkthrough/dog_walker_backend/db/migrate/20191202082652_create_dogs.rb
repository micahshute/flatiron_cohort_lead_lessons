class CreateDogs < ActiveRecord::Migration[6.0]
  def change
    create_table :dogs do |t|
      t.string :name
      t.integer :walk_time
      t.text :notes
      t.string :breed
      t.belongs_to :owner, null: false, foreign_key: true

      t.timestamps
    end
  end
end
