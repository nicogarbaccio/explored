class DiscussionsController < ApplicationController
    before_action :find_discussion, only: [:show, :update, :destroy]
    # skip_before_action :authorized_user
    skip_before_action :admin_user, only: [:index, :show, :discussion_discussion_posts]

    def index
        render json: Discussion.all
    end

    def show
        render json: @discussion
    end

    def create
        discussion = Discussion.create!(discussion_params)
        render json: discussion, status: :created
    end

    def update
        @discussion.update!(discussion_params)
        render json: @discussion, status: :ok
    end

    def destroy
        @discussion.destroy
        head :no_content
    end

    def discussion_discussion_posts
        discussion = Discussion.find(params[:id])
        render json: discussion.discussion_posts.order(:created_at)
    end
    
    private

    def discussion_params
        params.permit(:title, :body, :course_id)
    end

    def find_discussion
        @discussion = Discussion.find(params[:id])
    end
end