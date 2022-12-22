class Course < ApplicationRecord
    belongs_to :instructor
    has_one :syllabus, dependent: :destroy
    has_many :assignments, dependent: :destroy
    has_many :announcements, dependent: :destroy
    has_many :discussions, dependent: :destroy
    has_many :course_students, dependent: :destroy
    has_many :students, through: :course_students
    has_many :course_documents, dependent: :destroy
end
