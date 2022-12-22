class CreateCourseStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :course_students do |t|
      t.belongs_to :course, null: false, foreign_key: true
      t.belongs_to :student, null: false, foreign_key: true

      t.timestamps
    end
  end
end
