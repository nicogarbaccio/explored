class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :subject, :length, :days, :remote, :code
  has_one :instructor
  has_one :syllabus
  has_many :assignments
  has_many :announcements
  has_many :discussions
  has_many :students, through: :course_students
end
