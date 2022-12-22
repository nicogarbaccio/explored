class AnnouncementSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :created_at
  has_one :course
end
