class SavefilesController < ApplicationController

    def index
        render json: Savefile.all, methods: [:user]
    end

end