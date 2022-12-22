class CreateAssignments < ActiveRecord::Migration[7.0]
  def change
    create_table :assignments do |t|
      t.string :title
      t.text :description
      t.date :due_date
      t.belongs_to :course, null: false, foreign_key: true

      t.timestamps
    end
  end
end
