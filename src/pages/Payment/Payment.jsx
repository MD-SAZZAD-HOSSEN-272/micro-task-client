import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckOut';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
    const {id} = useParams()
    const axiosSecure = useAxiosSecure()
    const {data:coinDetails} = useQuery({
        queryKey: [id],
        queryFn: async() => {
            const res = await axiosSecure.get(`/package/${id}`);
            return res.data
        }
    })
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm coinDetails={coinDetails}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;