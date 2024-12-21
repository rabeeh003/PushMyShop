import React from 'react'
import { Link } from 'react-router-dom'

function BottumComponent() {
    return (
        <div className="sticky bottom-0 left-0 w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-4 rounded-t-xl shadow-lg flex justify-between items-center">
            {/* Price and Item Count */}
            <div>
                <p className="text-lg font-bold text-warning">$18</p>
                <p className="text-sm">2 items Added</p>
            </div>
            {/* View Cart Button */}
            <Link to="/location" className="btn btn-warning text-white text-sm font-semibold py-2 px-4 rounded-md shadow">
                Next
            </Link>
        </div>
    )
}

export default BottumComponent
