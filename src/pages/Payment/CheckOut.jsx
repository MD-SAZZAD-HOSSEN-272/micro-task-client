import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";




const CheckoutForm = ({coinDetails}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('')
  const {user} = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()
  const amount = coinDetails?.price * 100
  console.log(amount);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setError(error.message)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

    // create payment intent

    const res = await axiosSecure.post(`/create-payment-intent`, {
      amount,
      coinId: coinDetails?._id
    })
    console.log('res from intent', res);

    const clientSecret = res.data.clientSecret

    console.log(clientSecret);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.DisplayName,
          email: user?.email
        }
      },
    });

    if (result.error) {
      setError(result.error.message);
      console.log(result.error.message);
    } else {
      // Payment successful
      setError('')
      console.log('Payment successful:', result.paymentIntent);
      const paymentDoc = {
          packageId: coinDetails._id,
          email: user?.email,
          amount:  coinDetails.price,
          paymentMethod: result.paymentIntent.payment_method_types,
          transactionId: result.paymentIntent.id,
          paid_at_string: new Date().toISOString(),
        };
        const paymentRes = await axiosSecure.post(`/payment`, paymentDoc)
        if(paymentRes.data.insertedId){
          console.log('payment successfully now');
        }
    }


  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto my-10">
      <CardElement
      className="p-2 border rounded"
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <p className="text-red-500">{error}</p>
      <button type="submit" disabled={!stripe} className="bg-blue-600 p-3 rounded-xl w-full cursor-pointer ">
        Pay {coinDetails?.price}$
      </button>
    </form>
  );
};

export default CheckoutForm