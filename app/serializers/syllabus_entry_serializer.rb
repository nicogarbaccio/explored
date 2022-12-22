class SyllabusEntrySerializer < ActiveModel::Serializer
  attributes :id, :date, :assignment
  has_one :syllabus
end
