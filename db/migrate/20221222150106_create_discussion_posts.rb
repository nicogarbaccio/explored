class CreateDiscussionPosts < ActiveRecord::Migration[7.0]
  def change
    create_table :discussion_posts do |t|
      t.belongs_to :discussion, null: false, foreign_key: true
      t.belongs_to :student, null: false, foreign_key: true
      t.text :body

      t.timestamps
    end
  end
end
