class Announcement < ApplicationRecord
    belongs_to :course
    has_one :instructor, through: :course
    has_many :students, through: :course
  end
  