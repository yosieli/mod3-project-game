class User < ApplicationRecord
    has_many :savefiles, dependent: :destroy
    
end
