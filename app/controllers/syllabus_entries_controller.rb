class SyllabusEntriesController < ApplicationController
    before_action :find_syllabus_entry, only: [:show, :update, :destroy]
    # skip_before_action :authorized_user
    skip_before_action :admin_user, only: [:index, :show, :syllabus_syllabus_entries]

    def index
        render json: SyllabusEntry.all
    end

    def show
        render json: @syllabusEntry
    end

    def create
        syllabusEntry = SyllabusEntry.create!(syllabus_entry_params)
        render json: syllabusEntry, status: :created
    end

    def update
        @syllabusEntry.update!(syllabus_entry_params)
        render json: @syllabusEntry, status: :ok
    end

    def destroy
        @syllabusEntry.destroy
        head :no_content
    end

    def syllabus_syllabus_entries
        syllabus = Syllabus.find(params[:id])
        render json: syllabus.syllabus_entries.order(:date)
    end
    
    private

    def syllabus_entry_params
        params.permit(:syllabus_id, :date, :assignment)
    end

    def find_syllabus_entry
        @syllabusEntry = SyllabusEntry.find(params[:id])
    end
end