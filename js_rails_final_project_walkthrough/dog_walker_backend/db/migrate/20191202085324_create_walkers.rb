class CreateWalkers < ActiveRecord::Migration[6.0]
  def change
    create_table :walkers do |t|
      t.string :name
      t.float :rate
      t.text :bio

      t.timestamps
    end
  end
end
