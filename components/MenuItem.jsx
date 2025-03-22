import { useCart } from "@/app/(main)/context/CartContext";
import React from "react";

const MenuItem = ({ item }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      menu_item_id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      restaurant_id: item.restaurant_id,
    });
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
      <div>
        <div className="w-100 h-48 bg-gray-200">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold">{item.name}</h3>

          </div>
          <p className="text-gray-600 text-sm mt-2 mb-2 line-clamp-2">
            {item.description}
          </p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm font-semibold ">
              ${item.price}
            </span>
            <button
              className="bg-black text-white px-4 py-2 rounded text-sm  flex items-center gap-1"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
