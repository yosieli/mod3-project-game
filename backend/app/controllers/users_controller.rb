class UsersController < ApplicationController

    def index
        render json: User.all, methods: [:savefiles]
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