class GradeSerializer < ActiveModel::Serializer
  attributes :id, :grade
  has_one :submission
end
