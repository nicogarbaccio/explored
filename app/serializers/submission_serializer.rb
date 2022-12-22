class SubmissionSerializer < ActiveModel::Serializer
  attributes :id, :file_url, :file_name, :student_id, :student_name, :assignment, :grade
  # has_one :assignment
  # has_one :student
end
