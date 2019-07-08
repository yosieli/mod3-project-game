class UsersController < ApplicationController

    def index
        @users = User.all
        render json: @users
    end

    def create
        @user = User.create(allowed_params)
        render json: @user
    end

    def show
        @user = User.find(params[:id])
        render json: @user
    end

    private

    def allowed_params
        params.permit(:username,:password)
    end

end