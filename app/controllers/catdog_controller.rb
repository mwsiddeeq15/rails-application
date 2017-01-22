class CatdogController < ApplicationController
  def index # GET all data

    if params[:info] == "true"
      data = CatdogHelper.get_all_records_with_user_info
    else
      data = CatdogHelper.get_all_records
    end

    render json: data
  end

  def add # POST new record to data
    newRecord = CatdogHelper.add_record(params)
    render json: newRecord
  end
end
