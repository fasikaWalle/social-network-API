
const {User}=require('../models')

const UserController={
    
    getAllUser(req,res){
        User.find({}).then(dbUserData=>{
            res.json(dbUserData)
        }).catch(err=>{res.status(400).json(err)})
    },
    
    getSingleUser({params},res){
        User.findOne({_id:params.id}).populate({path:'thoughts',select:'-_v'}).then(dbUserData=>{
            if(!dbUserData){
                res.status(404).json('There is no user with this id')
            }
            res.json(dbUserData)
        }).catch(err=>{res.status(400).json(err)})
    } ,
    createUser({body},res){
        User.create(body).then(dbUserData=>{
            res.json(dbUserData)
        }).catch(err=>{res.status(400).json(err)})
    },
    
    updateUser({body,params},res){
        User.findOneAndUpdate({_id:params.id},body,{new:true}).then(dbUserData=>{
            if(!dbUserData){
                res.status(404).json({message:'There is no user with this id'})
            }
            res.json(dbUserData)
        }).catch(err=>{res.status(400).json(err)})
    },
   deleteUser({params}){
        User.findOneAndDelete({_id:params.id}).then(dbUserData=>{
            if(!dbUserData){
                res.status(404).json({message:'There is no user with this id'})
            }
            res.json(dbUserData)  
        }).catch(err=>{res.status(400).json(err)})
    }
}

module.exports=UserController