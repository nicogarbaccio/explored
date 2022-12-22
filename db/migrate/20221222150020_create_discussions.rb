class CreateDiscussions < ActiveRecord::Migration[7.0]
  def change
    create_table :discussions do |t|
      t.belongs_to :course, null: false, foreign_key: true
      t.string :title
      t.text :body

      t.timestamps
    end
  end
end
