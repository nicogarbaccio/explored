class CoursesController < ApplicationController
    before_action :find_course, only: [:show, :update, :destroy]
    # skip_before_action :authorized_user
    skip_before_action :admin_user, only: [:index, :show, :course_assignments, :course_announcements, :course_discussions, :course_course_documents]

    def index
        render json: Course.all
    end

    def show
        render json: @course
    end

    def create
        course = Course.create!(course_params)
        render json: course, status: :created
    end

    def update
        @course.update!(course_params)
        render json: @course, status: :ok
    end

    def destroy
        @course.destroy
        head :no_content
    end

    def course_assignments
        course = Course.find(params[:id])
        render json: course.assignments
    end

    def course_announcements
        course = Course.find(params[:id])
        render json: course.announcements.order(:created_at)
    end

    def course_discussions
        course = Course.find(params[:id])
        render json: course.discussions.order(:created_at)
    end

    def course_course_students
        course = Course.find(params[:id])
        render json: course.course_students
    end

    def course_course_documents
        course = Course.find(params[:id])
        render json: course.course_documents
    end
    
    private

    def course_params
        params.permit(:title, :instructor_id, :subject, :length, :days, :code, :remote, :image)
    end

    def find_course
        @course = Course.find(params[:id])
    end
end