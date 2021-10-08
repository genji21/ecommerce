const Category = require('../models/categoryModel')
const categoryCtrl  =  {
    getCategories: async(req,res)=>{
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    createCategory: async(req,res)=>{
        try {
            // if user have role = 1 --> admin
            // only admin cane create , delete , and update
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category)  return res.status(400).json({msg:"This category already exits"})
            const newCategory =  new Category({name})

            await newCategory.save()
            res.json({msg:"create Category"})

        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    deleteCategory : async (req,res)=>{
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.json({msg:"Delete category"})
        } catch (err) {
            return res.status(500).json({msg:err.message})
            
        }
    },
    updateCategory : async (req,res)=>{
        try {
            const {name} = req.body
            await Category.findByIdAndUpdate({_id:req.params.id},{name})
            res.json({msg:"Update category"})
        } catch (err) {
            return res.status(500).json({msg:err.message})
            
        }
    },
    GET_ID: async (req, res) => {
        try {
          const category = await Category.findById(req.params.id);
          if (!category) return res.status(404).json({ message: 'Category not found' });
          res.status(200).json({
            category: category
          });
        } catch (error) {
          res.status(404).json({
            message: error
          })
        }
      },
    
}
module.exports = categoryCtrl