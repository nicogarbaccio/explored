class SyllabusSerializer < ActiveModel::Serializer
  attributes :id, :description
  has_one :course
  has_many :syllabus_entries
end
