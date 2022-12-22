class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses do |t|
      t.string :title
      t.string :subject
      t.string :length
      t.string :days
      t.boolean :remote
      t.integer :code
      t.string :image
      t.belongs_to :instructor, null: false, foreign_key: true
      t.timestamps
    end
  end
end
