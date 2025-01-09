import { useDispatch, useSelector } from 'react-redux';
import { editAddress, deleteAddress, selectLocations, setCurrentDeliveryLocation, selectCurrentDeliveryLocation, selectUserData } from '../../store/appSlice';
import { Link } from 'react-router-dom';
import { ChevronLeft, Edit, Map, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Address() {
  const dispatch = useDispatch();
  const address = useSelector(selectLocations);
  const currentDeliveryLocation = useSelector(selectCurrentDeliveryLocation);
  const [addresses, setAddresses] = useState()
  const userData = useSelector(selectUserData);
  useEffect(() => {
    const data = {
      "user_id": userData.data.id,
      "token": userData.data.auth_token,
      "restaurant_id": null
    }
    axios.post('https://lewoffy.infineur.com/public/api/get-addresses', data)
      .then((res) => {
        console.log("Get Address : ", res.data);
        setAddresses(res.data)
      })
  },[])


  const handleEditAddress = (id) => {
    const updatedAddress = prompt("Edit the address (enter the new address):");
    if (updatedAddress) {
      dispatch(editAddress({ id, updatedAddress: { address: updatedAddress } }));
    }
  };

  const handleRemoveAddress = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      dispatch(deleteAddress(id));
    }
  };

  const handleMakeDefault = (address) => {
    console.log("Current address",address);
    
    dispatch(setCurrentDeliveryLocation(address));
  };

  return (
    <div className="relative bg-white min-h-screen text-black">
      {/* Header */}
      <div className="flex items-center justify-center h-14 w-full sticky top-0 bg-white/60 dark:bg-inherit backdrop-blur-md pt-3 z-50">
        <Link to="/account">
          <ChevronLeft className="absolute left-3 top-6 w-6 h-6" />
        </Link>
        <div className="flex flex-col items-center justify-center">
          <span className="text-center text-xl font-semibold">Address</span>
        </div>
      </div>

      {/* Address Section */}
      <div className="flex flex-col items-center justify-center mt-5 px-3">
        <Link
          to="/account/add-address"
          className="btn bg-main-color text-white text-sm w-full font-semibold py-2 px-4 rounded-md shadow"
        >
          Add New Address
        </Link>
      </div>

      {/* Address List */}
      {addresses ? (
        <div className="flex flex-col items-center gap-5 mt-5 px-3">
          {addresses?.map((addr) => (
            <div className="flex justify-between w-full" key={addr.id}>
              <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-md mr-2 border">
                <Map className="text-gray-500" />
              </div>
              <div
                className="flex items-center justify-between bg-gray-50 text-gray-500 border rounded-lg w-full p-4 hover:bg-main-color/10 "
              >
                {/* Address Details */}
                <div className="flex-grow">
                  <span className="font-semibold text-black">{addr.tag}</span>
                  <p className="text-sm text-gray-400">{addr.house}</p>
                  <label className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      className="form-checkbox checkbox-secondary checkbox checkbox-sm mr-2"
                      checked={currentDeliveryLocation?.id === addr?.id}
                      onChange={() => handleMakeDefault(addr)}
                    />
                    <span className="text-sm">Make as a default</span>
                  </label>
                </div>

                {/* Edit and Remove Options */}
                <div className="flex flex-col items-end justify-between h-full space-x-4">
                  {/* <button
                    className="text-orange-500 hover:text-orange-400"
                    onClick={() => handleEditAddress(addr.id)}
                  >
                    <Edit className="h-5 w-5" />
                  </button> */}
                  {/* <button
                    className="text-red-500 hover:text-red-400"
                    onClick={() => handleRemoveAddress(addr.id)}
                  >
                    <Trash className="h-5 w-5" />
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300 text-xs text-center mt-10">No address</p>
      )}
    </div>
  );
}

export default Address;
