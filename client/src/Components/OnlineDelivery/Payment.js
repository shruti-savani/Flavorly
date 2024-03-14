import React, { useEffect, useState } from 'react'
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GooglePayButton from '@google-pay/button-react'
import { Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import axios from 'axios'
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

function Payment({onCancel, onBack, totalprice, checkoutInfo, orderInfo}) {

  const url = process.env.REACT_APP_BASE_URL;

  const [paymentMethod, setPaymentMethod] = useState("")
  const [paymentError, setPaymentError] = useState("")
  const [ShowGpay, setShowGpay] = useState(false)
  const [userId, setUserId] = useState("");
  const [cookiesToken, setCookiesToken] = useState("")

  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });  

  useEffect(() => {
    const fetchId = async () => {
        try {
            const cookiesToken = Cookies.get("jwt");
            if(cookiesToken) {
              setCookiesToken(cookiesToken)
                const decodedToken = jwtDecode(cookiesToken);
                if (decodedToken) {
                    const userIdFromToken = decodedToken._id;
                    setUserId(userIdFromToken);
                }
            }
        } 
        catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    fetchId();
  }, [userId]);

  const handlePaymentMethodChange = (e) => {
    const newPaymentMethod = e.target.value
    setPaymentMethod(newPaymentMethod)
    if(newPaymentMethod === "UPI") {
      setShowGpay(true)
    }
    if(newPaymentMethod === "COD") {
      setShowGpay(false)
    }
  }

    const handlePlaceOrder = async () => {

      const onlineOrderDetails = {
        method: checkoutInfo.method, 
        name: checkoutInfo.name,
        phone: checkoutInfo.phone,
        address: checkoutInfo.address,
        pincode: checkoutInfo.pincode,
        time: checkoutInfo.time,
        items: orderInfo, 
        totalamount: totalprice,
        deliveryinstructions: checkoutInfo.deliveryInstructions,
        paymentmethod: paymentMethod,
        user_id: userId,
        orderdate: formattedDate,
        ordertime: formattedTime,
      }
      console.log("online order details",onlineOrderDetails)

        try {
            await axios.post(`${url}/delivery-summary`, onlineOrderDetails, {
              headers: {
                  Authorization: `Bearer ${cookiesToken}`
              }
          })
        }
        catch (err) {
            console.log('error confirming order', err)
        }

        window.location.href = "/delivery-summary"
    }
    
  return (
    <div>
      <div className="overlay flex justify-center items-center">
            <div className="payment-form bg-white rounded-xl p-10 flex flex-col justify-center items-center relative">
              <CancelIcon
                onClick={() => onCancel()}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  cursor: "pointer",
                  fontSize: "30px",
                }}
              />
              <ArrowBackIcon
                onClick={() => onBack()}
                style={{
                  position: "absolute",
                  top: "5px",
                  left: "5px",
                  cursor: "pointer",
                  fontSize: "27px",
                }}
              />

            <div className='flex w-full'>
              <h1 className='mr-5 font-bold tracking-wider w-2/5'>Payment Method: </h1>
              <div className='w-3/5 flex flex-col'>
                  <RadioGroup value={paymentMethod}>
                    <FormControlLabel control={<Radio size="small"/>} label='Cash On Delivery' value='COD' onClick={handlePaymentMethodChange} onFocus={() => setPaymentError(false)}/>
                    <FormControlLabel control={<Radio size="small"/>} label='UPI' value='UPI' onClick={handlePaymentMethodChange} onFocus={() => setPaymentError(false)}/>
                  </RadioGroup>
                  {ShowGpay && (
                    <GooglePayButton
                      environment="TEST"
                      paymentRequest={{
                        apiVersion: 2,
                        apiVersionMinor: 0,
                        allowedPaymentMethods: [
                        {
                            type: 'CARD',
                            parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                            },
                            tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                                gateway: 'example',
                                gatewayMerchantId: 'exampleGatewayMerchantId',
                            },
                            },
                        },
                        ],
                        merchantInfo: {
                        merchantId: '12345678901234567890',
                        merchantName: 'Demo Merchant',
                        },
                        transactionInfo: {
                        totalPriceStatus: 'FINAL',
                        totalPriceLabel: 'Total',
                        totalPrice: totalprice,
                        currencyCode: 'INR',
                        countryCode: 'IN',
                        },
                        shippingAddressRequired: true,
                        callbackIntents: ["PAYMENT_AUTHORIZATION"]
                    }}
                    onLoadPaymentData={paymentRequest => {
                        console.log('load payment data', paymentRequest);
                    }}
                    onPaymentAuthorized={paymentData => {
                        console.log(paymentData);
                        return {transactionState: 'SUCCESS'}
                    }}
                    existingPaymentMethodRequired = 'false'
                />
                  )}
                
              </div>
            </div>

            <Button variant='contained' sx={{marginTop: '20px'}} onClick={handlePlaceOrder}>Place order</Button>

            </div>
      </div>
    </div>
  )
}

export default Payment
