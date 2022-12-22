class Instructor < ApplicationRecord
    validates :email, uniqueness: true
    
    has_many :courses, dependent: :destroy
    has_many :course_students, through: :courses
    has_many :students, through: :course_students

    has_secure_password
end
