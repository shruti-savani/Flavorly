import React from 'react'

function InvoiceContent({eachOrder}) {

    console.log("each order from invoice", eachOrder)

    const calculateTotalItems = () => {
        let totalItems = 0;
        eachOrder.items.forEach(item => (
            totalItems += parseInt(item.quantity)
        ))
        return totalItems;
    }

    const handlingCharges = 39;

    const calculateSubtotal = () => {
        let subtotal = 0;
        eachOrder.items.forEach((item) => (
            subtotal += item.quantity * item.price
        ))
        return subtotal;
    }

    const calculatetaxes = () => {
        let subtotal = calculateSubtotal();
        let taxes = 0;
        taxes = ((5/100) * subtotal + handlingCharges);
        return parseFloat(taxes).toFixed(2);
    }

  return (
    <div>
      <div className='printable-content bg-white h-auto w-auto relative p-5 m-3 border-dashed border-2 border-slate-600'>
            <h1 className='font-bold uppercase tracking-wider text-center mb-5'>Tax Invoice</h1>
            <hr/>
            <h1 className='uppercase tracking-wider text-center mt-3 mb-5'>Flavorly Restaurant food Network Limited</h1>
            <hr/>
            <h3 className='text-sm tracking-wider mt-3 pb-5'>{eachOrder.orderdate} , {eachOrder.ordertime} | Payment Mode: {eachOrder.paymentmethod} | Total Items: {calculateTotalItems()}</h3>
            <hr/>
            <div className='mt-2 mb-5'>
                <h1 className='text-center tracking-wider'>Order by: <span className='font-bold'>{eachOrder.name}</span></h1>
            </div>
            <hr/>
            <div>
                <p className='text-center tracking-wider font-bold uppercase mb-3'>{eachOrder.method}</p>
            </div>
            <div className='mt-2 mb-5'>
                {eachOrder.address.length > 0 ? (            
                    <h1 className='text-center tracking-wider'>{eachOrder.address}</h1>
                ) : (
                    <></>
                )}
            </div>
            <hr/>
            <div className='mt-5 mb-5'>
                <div className='flex justify-between text-gray-500'>
                    <h3>Quantity & Item Name</h3>
                    <p>Total</p>
                </div>
                {eachOrder.items.map((item, index) => (
                    <div key={index} className='pt-4 flex justify-between'>
                        <p className='tracking-wider'>{item.quantity} × {item.name}</p>
                        <p>₹{item.price * item.quantity}</p>
                    </div>
                ))}
            </div>
            <hr/>
            <div className='flex justify-between mt-5'>
                <p className='tracking-wider'>Subtotal</p>
                <p>₹{calculateSubtotal()}</p>
            </div>
            <div className='flex justify-between mt-5 mb-5'>
                <p className='tracking-wider'>Taxes & Charges</p>
                <p>₹{calculatetaxes()}</p>
            </div>
            <hr/>
            <div className='flex justify-between mt-5 mb-5 text-2xl font-bold'>
                <h1 className='tracking-wider'>Grand total</h1>
                <p>₹{eachOrder.totalamount}</p>
            </div>
        </div>
    </div>
  )
}

export default InvoiceContent
