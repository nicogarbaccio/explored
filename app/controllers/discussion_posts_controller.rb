class DiscussionPostsController < ApplicationController
    before_action :find_discussion_post, only: [:show, :update, :destroy]
    # skip_before_action :authorized_user
    skip_before_action :admin_user

    def index
        render json: DiscussionPost.all
    end

    def show
        render json: @discussionPost
    end

    def create
        discussionPost = DiscussionPost.create!(discussion_post_params)
        render json: discussionPost, status: :created
    end

    def update
        @discussionPost.update!(discussion_post_params)
        render json: @discussionPost, status: :ok
    end

    def destroy
        @discussionPost.destroy
        head :no_content
    end
    
    private

    def discussion_post_params
        params.permit(:discussion_id, :student_id, :body)
    end

    def find_discussion_post
        @discussionPost = DiscussionPost.find(params[:id])
    end
end