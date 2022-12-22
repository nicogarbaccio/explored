class CreateSyllabuses < ActiveRecord::Migration[7.0]
  def change
    create_table :syllabuses do |t|
      t.belongs_to :course, null: false, foreign_key: true
      t.string :description

      t.timestamps
    end
  end
end
