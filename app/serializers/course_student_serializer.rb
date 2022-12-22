class CourseStudentSerializer < ActiveModel::Serializer
  attributes :id, :course, :course_student_info, :course_student_email
  has_many :submissions
end
