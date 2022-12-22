class SubmissionsController < ApplicationController
    before_action :find_submission, only: [:show, :update, :destroy]
    # skip_before_action :authorized_user
        skip_before_action :admin_user

    def index
        render json: Submission.all
    end

    def show
        render json: @submission
    end

    def create
        submission = Submission.create!(submission_params)
        render json: submission, status: :created
    end

    def update
        @submission.update!(submission_params)
        render json: @submission, status: :ok
    end

    def destroy
        @submission.destroy
        head :no_content
    end

    def student_submissions
        render json: Submission.where(student_id: params[:id])
    end
    
    private

    def submission_params
        params.require(:submission).permit(:assignment_id, :student_id, :file)
    end

    def find_submission
        @submission = Submission.find(params[:id])
    end
end