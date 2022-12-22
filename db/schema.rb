# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_12_22_150201) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "announcements", force: :cascade do |t|
    t.bigint "course_id", null: false
    t.string "title"
    t.text "body"
    t.boolean "pinned", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_announcements_on_course_id"
  end

  create_table "assignments", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.date "due_date"
    t.bigint "course_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_assignments_on_course_id"
  end

  create_table "course_documents", force: :cascade do |t|
    t.bigint "course_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_course_documents_on_course_id"
  end

  create_table "course_students", force: :cascade do |t|
    t.bigint "course_id", null: false
    t.bigint "student_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_course_students_on_course_id"
    t.index ["student_id"], name: "index_course_students_on_student_id"
  end

  create_table "courses", force: :cascade do |t|
    t.string "title"
    t.string "subject"
    t.string "length"
    t.string "days"
    t.boolean "remote"
    t.integer "code"
    t.string "image"
    t.bigint "instructor_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["instructor_id"], name: "index_courses_on_instructor_id"
  end

  create_table "discussion_posts", force: :cascade do |t|
    t.bigint "discussion_id", null: false
    t.bigint "student_id", null: false
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["discussion_id"], name: "index_discussion_posts_on_discussion_id"
    t.index ["student_id"], name: "index_discussion_posts_on_student_id"
  end

  create_table "discussions", force: :cascade do |t|
    t.bigint "course_id", null: false
    t.string "title"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_discussions_on_course_id"
  end

  create_table "grades", force: :cascade do |t|
    t.bigint "submission_id", null: false
    t.string "grade"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["submission_id"], name: "index_grades_on_submission_id"
  end

  create_table "instructors", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.boolean "admin", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "students", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.boolean "admin", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "submissions", force: :cascade do |t|
    t.bigint "assignment_id", null: false
    t.bigint "student_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["assignment_id"], name: "index_submissions_on_assignment_id"
    t.index ["student_id"], name: "index_submissions_on_student_id"
  end

  create_table "syllabus_entries", force: :cascade do |t|
    t.bigint "syllabus_id", null: false
    t.date "date"
    t.string "assignment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["syllabus_id"], name: "index_syllabus_entries_on_syllabus_id"
  end

  create_table "syllabuses", force: :cascade do |t|
    t.bigint "course_id", null: false
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_syllabuses_on_course_id"
  end

  add_foreign_key "announcements", "courses"
  add_foreign_key "assignments", "courses"
  add_foreign_key "course_documents", "courses"
  add_foreign_key "course_students", "courses"
  add_foreign_key "course_students", "students"
  add_foreign_key "courses", "instructors"
  add_foreign_key "discussion_posts", "discussions"
  add_foreign_key "discussion_posts", "students"
  add_foreign_key "discussions", "courses"
  add_foreign_key "grades", "submissions"
  add_foreign_key "submissions", "assignments"
  add_foreign_key "submissions", "students"
  add_foreign_key "syllabus_entries", "syllabuses"
  add_foreign_key "syllabuses", "courses"
end
