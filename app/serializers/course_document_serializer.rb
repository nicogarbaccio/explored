class CourseDocumentSerializer < ActiveModel::Serializer
  attributes :id, :document_file_url, :document_file_name
  has_one :course
end
