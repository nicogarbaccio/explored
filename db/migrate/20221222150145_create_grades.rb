class CreateGrades < ActiveRecord::Migration[7.0]
  def change
    create_table :grades do |t|
      t.belongs_to :submission, null: false, foreign_key: true
      t.string :grade

      t.timestamps
    end
  end
end
