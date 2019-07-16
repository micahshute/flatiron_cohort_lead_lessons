class CreateWands < ActiveRecord::Migration[5.2]
  def change
    create_table :wands do |t|
      t.string :wood
      t.string :length
      t.string :core
    end
  end
end
