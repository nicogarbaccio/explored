class AnnouncementsController < ApplicationController
    before_action :find_announcement, only: [:show, :update, :destroy]
    # skip_before_action :authorized_user
    skip_before_action :admin_user, only: [:index, :show]

    def index
        render json: Announcement.all
    end

    def show
        render json: @announcement
    end

    def create
        announcement = Announcement.create!(announcement_params)
        # if announcement.save
        #     PostMailer.post_email(announcement.students, announcement.course.title).deliver_now
        # end
        render json: announcement, status: :created
    end

    def update
        @announcement.update!(announcement_params)
        render json: @announcement, status: :ok
    end

    def destroy
        @announcement.destroy
        head :no_content
    end
    
    private

    def announcement_params
        params.permit(:course_id, :title, :body)
    end

    def find_announcement
        @announcement = Announcement.find(params[:id])
    end
end