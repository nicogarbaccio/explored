class CreateSyllabusEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :syllabus_entries do |t|
      t.belongs_to :syllabus, null: false, foreign_key: true
      t.date :date
      t.string :assignment

      t.timestamps
    end
  end
end
