import React, { useState, useEffect, useContext } from 'react';
import useAxiosPublic from '../Hook/useAxiosPublic';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Rating } from "@material-tailwind/react";
const MyReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic()
  const {user} = useContext(AuthContext)

  useEffect(() => {
    const fetchDeliveryMenReviews = async () => {
      try {
        // Assuming you have the user's email stored in a state variable
       

        const res = await axiosPublic(`/deliveryMenReviews/${user?.email}`);
        setLoading(false)
        setReviews(res.data);
      } catch (err) {
        setLoading(false)
        setError(err.message);
      } 
    };

    fetchDeliveryMenReviews();
  }, [axiosPublic, user]);

  if (loading) {
    return <p className=' flex justify-center items-center text-4xl font-bold pt-16'>No Review Yet</p>;
  }

  

  return (
    <div>
      <div className=' flex justify-center items-center font-bold text-4xl pt-16'>
      <h1>My Reviews</h1>
      </div>

      {reviews.length > 0 ? 
      
      <div className=' lg:px-24 grid grid-cols-1 gap-10 max-w-4xl mx-auto pt-10'>
      {reviews.map((review) => (
        <div class="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="flex items-center justify-between">
          
            <span class="text-sm font-light text-gray-600 dark:text-gray-400">{review.reviewDate}</span>
            <a class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabindex="0" role="button">Review</a>
        </div>
    
        <div class="mt-2">
            
            <p class="mt-2 py-2 text-gray-600 dark:text-gray-300">{review.feedBack}</p>
        </div>
    
        <div class="flex items-center justify-between mt-4">
            
        <div>
          <Rating value={parseFloat(review.rating)} />
          </div>
            <div class="flex items-center">

                <img class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={review.userImage} alt="avatar"/>
                <a class="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabindex="0" role="link">{review.userName}</a>
            </div>
        </div>
    </div>
      ))}
    </div>
    : 
    <div>No Review</div>
    }
     
      
    </div>
  );
};

export default MyReview;
