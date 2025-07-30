const Product = require('../models/Product');

const getproductStats = async(req,res)=>{
  try{
    //stage 1
    const result = await Product.aggregate([{
      $match:{
        inStock:true,
        price:{
          $gte:38
        },
      },
      
    },
    { //stage 2:group documents
       $group:{
        _id:"$category",
        avgPrice:{
          $avg:"$price"
        },
        count:{
          $sum:1
        }
      }
  }]
);
res.status(200).json({
  success:true,
  data:result
});

}catch{

  }
}

const getproductAnalysis = async (req,res)=>{
  try {
    
      const result = await Product.aggregate([
  {
    $match: { category: 'Electronics' },
  },
  {
    $group: {
      _id: null,
      totalRevenue: { $sum: "$price" },
      averagePrice: { $avg: "$price" },
      maxProductPrice: { $max: "$price" },
      minProductPrice: { $min: "$price" },
    },
  },
  {
    $project: {
      _id: 0,
      totalRevenue: 1,
      averagePrice: 1,
      maxProductPrice: 1,
      minProductPrice: 1,
      priceRange: {
        $subtract: ["$maxProductPrice", "$minProductPrice"],
      },
    },
  },
]);

res.status(200).json({
  success: true,
  data: result,
});}
   catch 
    
{
    
  }
}

const insertSampleProducts = async (req, res) => {
    console.log("🔥 /products/add route hit");
  try {
    const sampleProducts = [
      {
        name: "Gaming Laptop",
        category: "Electronics",
        price: 999.99,
        inStock: true,
        tags: ["gaming", "laptop", "tech"]
      },
      {
        name: "Running Shoes",
        category: "Footwear",
        price: 59.99,
        inStock: true,
        tags: ["shoes", "sports", "running"]
      },
      {
        name: "Coffee Mug",
        category: "Kitchen",
        price: 12.5,
        inStock: false,
        tags: ["mug", "coffee", "kitchen"]
      },
      {
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 39.99,
        inStock: true,
        tags: ["audio", "portable", "music"]
      },
      {
        name: "Notebook",
        category: "Stationery",
        price: 4.99,
        inStock: false,
        tags: ["paper", "writing", "school"]
      }
    ];

    const result = await Product.insertMany(sampleProducts);
    res.status(201).json({
      success: true,
      data: `Inserted ${result.length} sample products`,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred"
    });
  }
};

module.exports = { insertSampleProducts,getproductStats,getproductAnalysis };
