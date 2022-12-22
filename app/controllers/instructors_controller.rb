class InstructorsController < ApplicationController
    skip_before_action :authorized_user
    skip_before_action :admin_user

    def show
      render json: current_user, status: :ok
    end
  
    def create
      if Student.where(email: params[:email]).exists?
        render json: { errors: "Email has already been taken" }, status: :unprocessable_entity
      else
        instructor = Instructor.create!(instructor_params)
        session[:user_id] = instructor.id
        # if instructor.save
        #   UserMailer.welcome_email(instructor).deliver_now
        # end
        render json: instructor, status: :ok
      end
    end

    def update
      instructor = Instructor.find(params[:id])
      instructor.update!(instructor_params)
      render json: instructor, status: :ok
    end

    def destroy
      instructor = Instructor.find(params[:id])
      instructor.destroy
      head :no_content
    end

    def instructor_courses
      instructor = Instructor.find(params[:id])
      render json: instructor.courses
    end

    private
  
    def instructor_params
      params.permit(:first_name, :last_name, :email, :password)
    end
end