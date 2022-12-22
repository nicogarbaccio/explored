class DiscussionPostSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at
  # has_one :discussion
  has_one :student
end
