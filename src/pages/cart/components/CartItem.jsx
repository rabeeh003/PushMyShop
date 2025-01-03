
export const CartItem = ({ item }) => {

  return (
    <div className="flex justify-between items-start p-4 border-b">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className={`w-2 h-2 rounded-full ${item.isVegetarian ? 'bg-green-500' : 'bg-red-500'}`} />
          <h3 className="text-lg font-semibold">{item.name}</h3>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">★</span>
            ))}
          </div>
          <span className="text-sm text-gray-600">{item.rating.count}</span>
        </div>
        <div className="mb-2">
          <span className="text-orange-500 font-semibold">${item.price.offer}</span>
          <span className="text-gray-500 ml-2">/${item.price.regular}</span>
        </div>
        <p className="text-sm text-gray-600">{item.description}</p>
      </div>
      <div className="ml-4 flex flex-col items-center">
        <img
          src={item.image && item.image.length > 0 ? "https://app.mojarestaurant.com/"+item.image : "/placeholder.png"}
          alt={item.name}
          className="w-24 h-24 rounded-lg object-cover mt-5"
        />
        <button
          className="px-4 py-2 btn btn-solid-warning -mt-5 rounded-lg transition"
        >
          ADD
        </button>
      </div>
    </div>
  );
};
