class InstructorSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :password_digest, :admin
  has_many :courses
end
