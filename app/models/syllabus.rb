class Syllabus < ApplicationRecord
    belongs_to :course
    has_many :syllabus_entries, dependent: :destroy
  end
  