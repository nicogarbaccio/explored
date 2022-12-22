class SyllabusesController < ApplicationController
    before_action :find_syllabus, only: [:show, :update, :destroy]
    # skip_before_action :authorized_user
    skip_before_action :admin_user, only: [:index, :show]

    def index
        render json: Syllabus.all
    end

    def show
        render json: @syllabus
    end

    def create
        syllabus = Syllabus.create!(syllabus_params)
        render json: syllabus, status: :created
    end

    def update
        @syllabus.update!(syllabus_params)
        render json: @syllabus, status: :ok
    end

    def destroy
        @syllabus.destroy
        head :no_content
    end
    
    private

    def syllabus_params
        params.permit(:course_id, :description)
    end

    def find_syllabus
        @syllabus = Syllabus.find(params[:id])
    end
end