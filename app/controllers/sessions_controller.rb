class SessionsController < ApplicationController
    skip_before_action :authorized_user, :admin_user

    # POST '/login'
    def create
      instructor = Instructor.find_by(email: params[:email])
      student = Student.find_by(email: params[:email])
  
      if instructor&.authenticate(params[:password])
        session[:user_id] = instructor.id
        session[:is_instructor] = 1
        render json: instructor, status: :ok

      elsif student&.authenticate(params[:password])
        session[:user_id] = student.id
        session[:is_instructor] = 0
        render json: student, status: :ok
       
      else
        render json: { errors: 'Invalid Password or Username'}, status: :unauthorized
      end
      
    end
    # DELETE '/logout'
    def delete
      session.delete :user_id
    end
  
end