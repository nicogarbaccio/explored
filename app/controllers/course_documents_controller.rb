class CourseDocumentsController < ApplicationController
    before_action :find_course_document, only: [:show, :update, :destroy]
    # skip_before_action :authorized_user
    skip_before_action :admin_user

    def index
        render json: CourseDocument.all
    end

    def show
        render json: @course_document
    end

    def create
        course_document = CourseDocument.create!(course_document_params)
        render json: course_document, status: :created
    end

    def update
        @course_document.update!(course_document_params)
        render json: @course_document, status: :ok
    end

    def destroy
        @course_document.destroy
        head :no_content
    end

    private

    def course_document_params
        params.require(:course_document).permit(:course_id, :document_file)
    end

    def find_course_document
        @course_document = CourseDocument.find(params[:id])
    end
end