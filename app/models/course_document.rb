class CourseDocument < ApplicationRecord
    belongs_to :course
  
    has_one_attached :document_file
  
    def document_file_url
      Rails.application.routes.url_helpers.rails_blob_path(document_file, only_path: true, disposition: "attachment")
    end
  
    def document_file_name
      document_file.blob.filename
    end
  end
  