class Grade < ApplicationRecord
    belongs_to :submission
    has_one :student, through: :submission
    has_one :assignment, through: :submission
    has_one :course, through: :assignment
  end
  