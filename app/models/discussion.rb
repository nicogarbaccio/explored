class Discussion < ApplicationRecord
    belongs_to :course
    has_many :discussion_posts, dependent: :destroy
  end
  