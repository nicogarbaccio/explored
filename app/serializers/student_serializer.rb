class StudentSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :password_digest, :admin

  has_many :course_students
  has_many :discussion_posts
end
