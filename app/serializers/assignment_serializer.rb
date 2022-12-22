class AssignmentSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :due_date
  has_one :course
end
