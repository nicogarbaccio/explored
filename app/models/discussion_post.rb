class DiscussionPost < ApplicationRecord
    belongs_to :discussion
    belongs_to :student
  end
  