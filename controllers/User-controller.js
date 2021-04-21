
const User=require('../models/User')

const UserController={
    
    getAllUser(req,res){
        User.find({}).then(dbUserData=>{
            res.json(dbUserData)
        }).catch(err=>{res.status(400).json(err)})
    },
    
    getSingleUser({params},res){
        User.findOne({_id:params.id}).populate({path:'thoughts',path:'friends',select:'-_v'}).then(dbUserData=>{
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
    }
}

module.exports=UserController