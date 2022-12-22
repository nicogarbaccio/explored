class StudentsController < ApplicationController
    skip_before_action :authorized_user, :admin_user

    def show
      render json: current_user, status: :ok
    end
  
    def create
      if Instructor.where(email: params[:email]).exists?
        render json: { errors: "Email has already been taken" }, status: :unprocessable_entity
      else
        student = Student.create!(student_params)
        session[:user_id] = student.id
        session[:is_instructor] = 0
        # if student.save
        #   UserMailer.welcome_email(student).deliver_now
        # end
        render json: student, status: :created
      end
    end

    def update
      student = Student.find(params[:id])
      student.update!(student_params)
      render json: student, status: :ok
    end

    def destroy
      student = Student.find(params[:id])
      student.destroy
      head :no_content
    end

    def student_courses
      student = Student.find(params[:id])
      render json: student.courses
    end

    private
  
    def student_params
      params.permit(:first_name, :last_name, :email, :password)
    end
  
end