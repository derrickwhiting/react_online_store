class ItemsController < ApplicationController
  
  def index
    render json: Item.order(:price)
  end

  def create
    item = Item.create(item_params)
    render json: item
  end

  def purchase_item
    item = Item.find(params[:id])
    quantity = params[:item][:quantity].to_i
    new_quantity = quantity - 1
    item.update(quantity: new_quantity)
    render json: item
  end

  def update
    item = Item.find(params[:id])
    item.update(item_params)
    render json: item
  end

  def destroy
    Item.find(params[:id]).destroy
    head :ok
  end

  private
    def item_params
      params.require(:item).permit(:name, :price, :description, :quantity)
    end
end
