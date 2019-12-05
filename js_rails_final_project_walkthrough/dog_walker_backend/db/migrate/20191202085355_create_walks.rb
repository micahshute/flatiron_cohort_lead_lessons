class CreateWalks < ActiveRecord::Migration[6.0]
  def change
    create_table :walks do |t|
      t.belongs_to :dog, null: false, foreign_key: true
      t.belongs_to :walker, null: false, foreign_key: true
      t.datetime :time

      t.timestamps
    end
  end
end
