class CreateCourseDocuments < ActiveRecord::Migration[7.0]
  def change
    create_table :course_documents do |t|
      t.belongs_to :course, null: false, foreign_key: true

      t.timestamps
    end
  end
end
