import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserDetails from './UserDetails';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import html2canvas from 'html2canvas'
import InvoiceContent from './InvoiceContent';
import Cookies from "js-cookie";

function History() {

    const url = process.env.REACT_APP_BASE_URL;

    const [orders, setOrders] = useState([])
    const [viewOrder, setViewOrder] = useState(false)
    const [eachOrder, setEachOrder] = useState([])
    const [downloadInvoice, setDownloadInvoice] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        const fetchOrders = async () => {
            const cookiesToken = Cookies.get("jwt");
            try {
                axios.get(`${url}/user-details/history/${id}`, {
                    headers: {
                        Authorization: `Bearer ${cookiesToken}`
                    }
                })
                .then((response) => setOrders(response.data))
                .catch(err => console.log(err))
            } catch (err) {
                console.log("error fetching order")
            }
        }

        fetchOrders();
        
    }, [id])

    const truncateItems = (items) => {
        const maxItems = 2;
        if (items.length > maxItems) {
          const truncatedItems = items.slice(0, maxItems);
          const remainingItemsCount = items.length - maxItems;
          return [
            ...truncatedItems,
            { name: <p className='font-semibold underline'>+{remainingItemsCount} more items</p>, quantity: '' },
          ];
        }
        return items;
    };

    const handleViewOrder = (order) => {

        setEachOrder(order)
        setViewOrder(true);
        
    }

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

    const handleDownloadImage = async () => {

        const invoice = document.getElementById('invoice')
        invoice.style.display = 'inline'

        const element = document.getElementById('invoice'),
        canvas = await html2canvas(element),
        data = canvas.toDataURL('image/jpg'),
        link = document.createElement('a');
    
        link.href = data;
        link.download = 'invoice.jpg';
    
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        invoice.style.display = 'none'

    };

  return (
    <div>

        <UserDetails/>

        <div className='history-bg bg-blue-50 pl-10'>
            <h1 className=' text-4xl font-bold tracking-wider pb-5 font-serif'>History</h1>
            <div className='history-orders flex flex-wrap'>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order._id} className='each-order-history m-3 bg-white p-3 rounded-xl relative'>
                            <h1 className='font-bold tracking-widest capitalize pb-1'>{order.method}</h1>
                            <span className=' text-gray-500 text-xs tracking-wider'>{order.orderdate} , {order.ordertime}</span>
                            <hr/>
                            {truncateItems(order.items).map((item, index) => (
                                <div key={index} className='history-item-list flex pt-2 justify-between w-full'>
                                    <h3>{item.name}</h3>
                                    <p>{item.quantity}</p>
                                </div>
                            ))}
                            <hr className='mt-2'/>
                            <div>
                                <p className='pt-2 font-bold'>₹{order.totalamount}</p>
                            </div>
                            <Button style={{position: 'absolute', right: 4, bottom: 4, fontSize: "14px"}} onClick={() => handleViewOrder(order)}>View Order</Button>
                        </div>
                    ))
                ) : (
                    <p>No orders</p>
                )}
            </div>

        </div>

        {viewOrder && (
            <div className='view-order-overlay flex flex-col justify-center items-center h-full w-full fixed top-0 left-0'>
                <div className='printable-content bg-white h-auto w-auto relative p-5 rounded-xl' id='print'>
                    <div className=''><CloseIcon style={{position: 'absolute' ,right: 2, top: 2, cursor: 'pointer'}} onClick={() => setViewOrder(false)}/></div>

                    <h3 className='text-sm tracking-wider pb-2'>{eachOrder.orderdate} , {eachOrder.ordertime} | Payment Mode: {eachOrder.paymentmethod} | Total Items: {calculateTotalItems()}</h3>
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
                    <hr/>
                    <div>
                        <FormControlLabel id='downloadCheckbox' control={<Checkbox size='small' checked={downloadInvoice} onChange={() => setDownloadInvoice(!downloadInvoice)}/>} label='Download Invoice'/>
                    
                        {downloadInvoice && (
                            <DownloadIcon id='downloadButton' style={{cursor: "pointer"}} onClick={handleDownloadImage}/>
                        )}
                    </div>
                </div>

                <div id="invoice" className='w-auto hidden'>
                    <InvoiceContent eachOrder={eachOrder}/>
                </div>

            </div>
        )}

    </div>

  )
}

export default History
