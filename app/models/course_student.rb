class CourseStudent < ApplicationRecord
    validates :course, uniqueness: { scope: :student }
  
    belongs_to :course
    belongs_to :student
    has_many :submissions, through: :student
  
    def course_student_info
      "#{student.last_name}, #{student.first_name}"
    end
  
    def course_student_email
      student.email
    end
  end
  