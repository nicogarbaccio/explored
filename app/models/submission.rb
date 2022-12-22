class Submission < ApplicationRecord
    belongs_to :assignment
    belongs_to :student
    has_one :course_student, through: :student
    has_one :grade, dependent: :destroy
  
    has_one_attached :file
  
    def file_url
      Rails.application.routes.url_helpers.rails_blob_path(file, only_path: true, disposition: "attachment")
    end
  
    def file_name
      file.blob.filename
    end
  
    def student_name
      "#{student.last_name}, #{student.first_name}"
    end
  end
  