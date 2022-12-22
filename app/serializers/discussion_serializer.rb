class DiscussionSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :created_at, :discussion_posts
  has_one :course
end
