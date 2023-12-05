const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const port = process.env.PORT || 5001;
require("dotenv").config();
let jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.GATEWAY_SECRET_KEY)
// SZwNLdc4ErErwnuI

// middleware
app.use(cors());
app.use(express.json());

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yqibclq.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    

    const userCollection = client.db("userDB").collection("user");
    const parcelCollection = client.db("parcelDB").collection("parcel");
    const paymentCollection = client.db("paymentDB").collection("payment");
    const reviewCollection = client.db("userDB").collection("review");

    // jwt api

    app.post("/jwt", async (req, res) => {
      const userInfo = req.body;
      const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5hr",
      });

      res.send( {token} );
    });

    //verify token

    const verifyToken = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "unauthorize access" });
      }

      const token = req.headers.authorization.split(" ")[1];
      console.log("inside token",token)
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "unauthorize access" });
        }
        req.decoded = decoded;
        next();
      });
    };

    const verifyAdmin = async(req, res, next) => {
      const email = req.decoded.email
      const query = {email : email}
      const user = await userCollection.findOne(query)
      const isAdmin = user?.type === "admin"
      if(!isAdmin){
        return res.status(403).send({message : "Forbidden access"})
      }
      next()
    }
    const verifyDelivery = async(req, res, next) => {
      const email = req.decoded.email
      const query = {email : email}
      const user = await userCollection.findOne(query)
      const isDelivery = user?.type === "deliveryMen"
      if(!isDelivery){
        return res.status(403).send({message : "Forbidden access"})
      }
      next()
    }

   

    //   user related api

    app.get("/users",verifyToken, verifyAdmin,  async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/parcels/:email",  async (req, res) => {
      const email = req.params.email
      const query = {email : email}
      const cursor = parcelCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/users",  async (req, res) => {
      const userDetails = req.body;
      const query = { email: userDetails?.email };
      const exist = await userCollection.findOne(query);
      if (exist) {
        return res.send({ message: "Email is already used", insertedId: null });
      }

      const result = await userCollection.insertOne(userDetails);
      res.send(result);
    });

    app.put("/users/admin/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          type: "admin",
        },
      };

      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    app.put("/users/delivery/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          type: "deliveryMen",
        },
      };

      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });


    //is admin 

    app.get("/users/admin/:email", verifyToken, async(req, res) => {
      const email = req.params.email
      if(email !== req.decoded.email){
        return res.status(403).send({message : "Forbidden access"})
      }

      const query = {email : email}
      const user= await userCollection.findOne(query)
      let admin = false
      if(user){
        admin = user?.type === "admin"
      }
      res.send({admin})
    })
    app.get("/users/delivery/:email", verifyToken, async(req, res) => {
      const email = req.params.email
      if(email !== req.decoded.email){
        return res.status(403).send({message : "Forbidden access"})
      }

      const query = {email : email}
      const user= await userCollection.findOne(query)
      let delivery = false
      if(user){
        delivery = user?.type === "deliveryMen"
      }
      res.send({delivery})
    })


    //  parcel related api

    app.post("/users/parcel", async(req, res) => {
      const parcels = req.body
      const result = await parcelCollection.insertOne(parcels)
      res.send(result)
    })

    app.get("/users/parcel/:email", async(req, res) => {
      const email =  req.params.email
      const query = {email : email}
      const cursor = parcelCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })
    // app.get("/admin/deliveryMen", async (req, res) => {
      
    //     const cursor = userCollection.find({ type: "deliveryMen" });
    //     const deliveryMen = await cursor.toArray();
    
    //     // Fetch the count of delivered parcels for each delivery man
    //     const promises = deliveryMen.map(async (deliveryMan) => {
    //       const deliveredCount = await parcelCollection.countDocuments({
    //         deliveryMenEmail: deliveryMan.email,
    //         status: "Delivered",
    //       });
    
    //       return {
    //         ...deliveryMan,
    //         deliveredCount,
    //       };
    //     });
    
    //     const updatedDeliveryMen = await Promise.all(promises);
    //     res.json(updatedDeliveryMen);
     
    // });
   
    app.get("/admin/deliveryMen", async (req, res) => {
      try {
        const cursor = userCollection.find({ type: "deliveryMen" });
        const deliveryMen = await cursor.toArray();
    
        // Fetch the count of delivered parcels and average review for each delivery man
        const promises = deliveryMen.map(async (deliveryMan) => {
          console.log("Delivery Man Id:", deliveryMan._id);
          try {
            const deliveredCount = await parcelCollection.countDocuments({
              deliveryMenEmail: deliveryMan.email,
              status: "Delivered",
            });
    
            const reviews = await reviewCollection.find({
              deliveryMenId:  deliveryMan._id.toString(), // Assuming _id is the identifier
            }).toArray();
    
            console.log("Reviews for", deliveryMan.name, reviews);
    
            const totalReviews = reviews.length;
            console.log(totalReviews)
            const averageReview =
              totalReviews > 0
              ? Math.min(
                reviews.reduce((sum, review) => {
                  console.log("Rating:", review.rating); // Log individual ratings
                  return sum + parseFloat(review.rating);
                }, 0) / totalReviews,
                5 // Limit the average to a maximum of 5
              )
            : 0;
    
            return {
              ...deliveryMan,
              deliveredCount,
              averageReview,
            };
          } catch (error) {
            console.error("Error processing delivery man:", error);
            return deliveryMan; // return delivery man with default values in case of an error
          }
        });
    
        const updatedDeliveryMen = await Promise.all(promises);
        res.json(updatedDeliveryMen);
      } catch (error) {
        console.error("Error fetching delivery men data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });


    const { ObjectId } = require('mongodb');

app.get("/admin/topDeliveryMen", async (req, res) => {
  try {
    const cursor = userCollection.find({ type: "deliveryMen" });
    const deliveryMen = await cursor.toArray();

    // Fetch the number of delivered parcels and average review for each delivery man
    const promises = deliveryMen.map(async (deliveryMan) => {
      console.log(deliveryMan.photo)
      try {
        const deliveredCount = await parcelCollection.countDocuments({
          deliveryMenEmail: deliveryMan.email,
          status: "Delivered",
        });

        const reviews = await reviewCollection.find({
          deliveryMenId: deliveryMan._id.toString(),
        }).toArray();

        const totalReviews = reviews.length;
        const averageReview =
          totalReviews > 0
          ? Math.min(
            reviews.reduce((sum, review) => {
              console.log("Rating:", review.rating); // Log individual ratings
              return sum + parseFloat(review.rating);
            }, 0) / totalReviews,
            5 // Limit the average to a maximum of 5
          )
        : 0;

        return {
          ...deliveryMan,
          deliveredCount,
          averageReview,
          image: deliveryMan.photo,
        };
      } catch (error) {
        console.error("Error processing delivery man:", error);
        return deliveryMan;
      }
    });

    const updatedDeliveryMen = await Promise.all(promises);

    // Sort delivery men based on the number of parcels delivered and average review
    const sortedDeliveryMen = updatedDeliveryMen.sort((a, b) => {
      const aScore = a.deliveredCount + a.averageReview;
      const bScore = b.deliveredCount + b.averageReview;
      return bScore - aScore;
    });

    // Send only the top 5 delivery men
    const topDeliveryMen = sortedDeliveryMen.slice(0, 6).map(({ photo, ...rest }) => rest);

    res.json(topDeliveryMen);
  } catch (error) {
    console.error("Error fetching top delivery men data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

    

    
    
    
    app.get("/users/parcels/:id",  async(req, res) => {
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result = await parcelCollection.findOne(query)
      res.send(result)
      console.log({result})
    })

    app.put("/users/parcels/:id",  async(req, res) => {
      const id = req.params.id
      const parcelInfo = req.body
      const filter = {_id : new ObjectId(id)}
      const options = {upsert : true}

      const updateDoc = {
        $set : {
            
            phoneNumber : parcelInfo.phoneNumber,
            parcelType :  parcelInfo.parcelType,
            parcelWeight : parcelInfo.parcelWeight,
            receiverName : parcelInfo.receiverName,
            receiverAddress : parcelInfo.receiverAddress, 
            receiverPhone : parcelInfo.receiverPhone,
            requestedDeliveryDate : parcelInfo.requestedDeliveryDate,
            deliveryLatitude : parcelInfo.deliveryLatitude,
            deliveryLongitude : parcelInfo.deliveryLongitude,
            price : parcelInfo.price,
            status : "pending"
        }
      }

      const result = await parcelCollection.updateOne(filter, updateDoc, options)
      res.send(result)
    })


    app.delete("/users/parcel/:id", async(req, res) => {
      const id = req.params.id
      const query = { _id : new ObjectId(id)}
      const result = await parcelCollection.deleteOne(query)
      res.send(result)
    })

    app.get("/admin/parcel", async(req, res) => {
      const cursor = parcelCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.put("/admin/parcel/:id", async(req, res) => {
      const id = req.params.id
      const parcelInfo = req.body
      const filter = {_id : new ObjectId(id)}
      const options = {upsert : true}

      const updateDoc = {
        $set : {
          deliveryMenId : parcelInfo.deliveryMenId,
          status : parcelInfo.status,
          deliveryMenEmail : parcelInfo.deliveryMenEmail,
          approximateDeliveryDate : parcelInfo.approximateDeliveryDate
        }
      }

      const result = await parcelCollection.updateOne(filter, updateDoc, options)
      res.send(result)
    })

    app.get("/admin/deliveryMen", async(req, res) => {
       const type = "deliveryMen"
       const query = {type : type }
       const cursor = userCollection.find(query)
       const result = await cursor.toArray()
       res.send(result) 

    })
    app.get("/deliveryMen", async(req, res) => {
       const type = "deliveryMen"
       const query = {type : type }
       const cursor = userCollection.find(query)
       const result = await cursor.toArray()
       res.send(result) 

    })
    app.put("/delivery/parcel/:id", async(req, res) => {
      const id = req.params.id
      const parcelInfo = req.body
      const filter = {_id : new ObjectId(id)}
      const options = {upsert : true}

      const updateDoc = {
        $set : {
          status : parcelInfo.status
        }
      }

      const result = await parcelCollection.updateOne(filter, updateDoc, options)
      res.send(result)
    })
   

    // payment intent

    app.post("/create-payment-intent", async(req, res) => {
      const {price} = req.body

      const amount = parseInt(price * 100)
      console.log("amount inside :", amount)
      const paymentIntent = await stripe.paymentIntents.create({
        amount : amount,
        currency : "usd",
        payment_method_types : ["card"]
      })

      res.send({
        clientSecret : paymentIntent.client_secret
      })
    })

    app.get("/payment", verifyToken, async(req, res) => {
      const cursor = parcelCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })


    // app.post("/payments/:id", verifyToken, async(req, res) => {
    //   const paymentInfo = req.body
    //   const result = await paymentCollection.insertOne(paymentInfo)
    //   res.send(result)
    // })
    app.put("/payments/:id", verifyToken, async(req, res) => {
      const id = req.params.id
      const parcelInfo = req.body
      const filter = {_id : new ObjectId(id)}
      const options = {upsert : true}

      const updateDoc = {
        $set : {
          payment : parcelInfo.payment,
          transactionId : parcelInfo.transactionId,
        }
      }

      const result = await parcelCollection.updateOne(filter, updateDoc, options)
      res.send(result)
    })


    // get delivery list by email

    app.get("/deliveryList/:email", async(req, res) => {
      const email = req.params.email
      const query = {deliveryMenEmail : email}
      const cursor =  parcelCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get("/deliveryMenIds", verifyToken, async (req, res) => {
      const cursor = parcelCollection.find();
      const result = await cursor.toArray();
      const deliveryMenIds = result.map(item => item.deliveryMenId);
      res.send(deliveryMenIds);
  });


    // chart

    app.get("/booking-by-date", async (req, res) => {
      
        const cursor = parcelCollection.aggregate([
          {
            $group: {
              _id: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: {
                    $cond: {
                      if: { $eq: [{ $type: "$bookingDate" }, "string"] },
                      then: { $toDate: "$bookingDate" },
                      else: "$bookingDate",
                    },
                  },
                },
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ]);
    
        const result = await cursor.toArray();
        res.json(result);
    
    });


    app.put("/review/parcel/:email", async(req, res) => {
      const email = req.params.email
      const reviewInfo = req.body
      const filter = {email : email}
      const options = {upsert : true}

      const updateDoc = {
        $set : {
         userImage : reviewInfo.userImage,
         feedBack : reviewInfo.feedBack,
         rating : reviewInfo.rating,
         deliveryMenId : reviewInfo.deliveryMenId,
         reviewDate : reviewInfo.reviewDate,
        }
      }

      const result = await parcelCollection.updateOne(filter, updateDoc, options)
      res.send(result)
    })


    // app.get("/review/:deliveryMenEmail", async(req, res) => {
    //   const deliveryMenEmail = req.params.deliveryMenEmail
    //   const query = {deliveryMenEmail : deliveryMenEmail}
    //   const cursor = parcelCollection.find(query)
    //   const result = await cursor.toArray()
    //   res.send(result)
    // })

   
    
   


    app.post("/reviews", async(req, res) => {
      const reviewInfo = req.body
      const result = await reviewCollection.insertOne(reviewInfo)
      res.send(result)
    })

    app.get("/allParcel", async(req, res) => {
      const cursor = parcelCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    app.get("/allUser", async(req, res) => {
      const cursor = userCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })


    app.get("/admin/parcel", async (req, res) => {
      try {
        // Extract date range parameters from query string
        const fromDate = req.query.fromDate;
        const toDate = req.query.toDate;
    
        // Construct the MongoDB query based on the date range
        const dateQuery = {};
        if (fromDate && toDate) {
          dateQuery.requestedDeliveryDate = {
            $gte: new Date(fromDate),
            $lte: new Date(toDate),
          };
        }
    
        // Fetch parcels based on the date range
        const cursor = parcelCollection.find(dateQuery);
        const result = await cursor.toArray();
    
        res.send(result);
      } catch (error) {
        console.error("Error fetching parcels:", error);
        res.status(500).send("Internal Server Error");
      }
    });


   
    app.get('/deliveryMenReviews/:email', async (req, res) => {
      const userEmail = req.params.email;
    
      // Step 1: Match userCollection with the provided email
      const userAggregate = await userCollection.aggregate([
        { $match: { email: userEmail } },
        {
          $addFields: {
            userIdString: { $toString: '$_id' }
          }
        },
        {
          $lookup: {
            from: 'review',
            localField: 'userIdString',
            foreignField: 'deliveryMenId',
            as: 'deliveryMenReviews'
          }
        },
        {
          $unwind: { path: '$deliveryMenReviews', preserveNullAndEmptyArrays: true }
        },
        {
          $project: {
            _id: '$deliveryMenReviews._id',
            userName: '$deliveryMenReviews.userName',
            userImage: '$photo', // Assuming 'photo' is the field you want from userCollection
            feedBack: '$deliveryMenReviews.feedBack',
            rating: '$deliveryMenReviews.rating',
            reviewDate: '$deliveryMenReviews.reviewDate'
          }
        }
      ]).toArray();
    
      
    
      res.json(userAggregate);
      console.log(userAggregate);
    });
    
    

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    //   await client.close();
  }

 
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("TrackNParcel is running");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
