Rails.application.routes.draw do
  resources :course_documents
  resources :grades
  resources :submissions
  resources :discussion_posts
  resources :course_students
  resources :students
  resources :discussions
  resources :assignments
  resources :syllabus_entries
  resources :syllabuses
  resources :courses
  resources :instructors
  resources :announcements
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '/hello', to: 'application#hello_world'
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
