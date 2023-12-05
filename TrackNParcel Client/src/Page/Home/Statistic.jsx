
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import useAxiosPublic from '../../Hook/useAxiosPublic';


const Statistic = () => {
    const [user, setUser] = useState()
    const [book, setBook] = useState()
    const [deliver, setDeliver] = useState()
    
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
      axiosPublic.get("/allUser")
      .then(res => {
        setUser(res.data.length)
        console.log(res.data)
        
      })
    }, [])
    useEffect(() => {
      axiosPublic.get("/allParcel")
      .then(res => {
        setBook(res.data.length)
        const status = res.data.filter(item => item.status === "Delivered")
        setDeliver(status.length)
        console.log(status)
      })
    }, [])
    return (
        <div className='grid grid-cols-1 py-10 gap-10 md:grid-cols-3 md:gap-16 lg:gap-24 lg:px-24 px-4'>
            <div className=' bg-gradient-to-r from-green-400 to-green-600 text-center rounded-md py-6'>
                <CountUp className='text-4xl md:text-3xl lg:text-5xl text-white' end={book} />
                <h1 className=' text-2xl text-white pt-2'>Number of Parcel Booked</h1>
            </div>
            <div className='bg-gradient-to-r from-green-400 to-green-600 text-center rounded-md py-6'>
            <CountUp className='text-4xl md:text-3xl lg:text-5xl text-white' end={deliver} />
                <h1 className=' text-2xl text-white pt-2'>Number of Parcel Delivered</h1>
            </div>
            <div className='bg-gradient-to-r from-green-400 to-green-600 text-center rounded-md py-6'>
                <CountUp className='text-4xl md:text-3xl lg:text-5xl text-white' end={user} />
                <h1 className=' text-2xl text-white pt-2'>Number of People Using</h1>
            </div>
        </div>
    );
};

export default Statistic;