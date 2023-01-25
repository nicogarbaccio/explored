class AnnouncementSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :pinned, :created_at
  has_one :course
end
