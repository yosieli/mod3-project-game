class UsersController < ApplicationController

    def index
        render json: User.all, methods: [:savefiles]
    end

    def show
        user = User.find(params[:id])
        render json: user, methods: [:savefiles]
    end

    def create
        @user = User.create(allowed_params)
        render json: @user
    end

    private

    def allowed_params
        params.permit(:username,:password)
    end

end