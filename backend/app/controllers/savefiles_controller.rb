class SavefilesController < ApplicationController

    def index
        render json: Savefile.all, methods: [:user]
    end

    def create

    end

    def show
        render json: Savefile.find(params[:id]), methods: [:user]
    end

    def update
        save_file = Savefile.find(params[:id])
        save_file.update(allowed_params)
        render json: save_file, methods: [:user]
    end

    private

    def allowed_params
        params.permit(
            :level,
            :time,
            :health
        )
    end

end