
const {User, Thoughts}=require('../models')

const UserController={
    //get all user 
    getAllUser(req,res){
        User.find({}).select('-__v').then(dbUserData=>{
            res.json(dbUserData)
        }).catch(err=>{res.status(400).json(err)})
    },
    //get single user
    getSingleUser({params},res){
        User.findOne({_id:params.id}) .populate({
            path: 'thoughts',
            select: '-__v'
         })
         .populate ({
             path: 'friends',
             select: '-__v'
         }).select('-__v').then(dbUserData=>{
            if(!dbUserData){
                res.status(404).json('There is no user with this id')
                return;
            }
            res.json(dbUserData)
        }).catch(err=>{res.status(400).json(err)})
    } ,
    //create user
    createUser({body},res){
        User.create(body).then(dbUserData=>{
            if(!dbUserData){
                res.status(404).json('There is no user with this id')
                return;
            }
            res.json(dbUserData)
        }).catch(err=>{res.status(400).json(err)})
    },
    //update user 
    updateUser({body,params},res){
        User.findOneAndUpdate({_id:params.id},body,{new:true}).then(dbUserData=>{
            if(!dbUserData){
                res.status(404).json({message:'There is no user with this id'})
                return;
            }
            res.json(dbUserData)
        }).catch(err=>{res.status(400).json(err)})
    },
    //delete user
   deleteUser({params},res){
        User.findOneAndDelete({_id:params.id}).then(({thoughts})=>{
            return Thoughts.deleteMany({_id:{$in: thoughts}})
        }).then(dbUserData=>{
            if(!dbUserData){
                res.status(404).json({message:'There is no user with this id'})
                return;
            }
            res.json(dbUserData)
        }).catch(err=>{res.status(400).json(err)})
    },
    //create friend
    createFriend({params},res){
        User.findOneAndUpdate({_id:params.userId},{$addToSet:{friends:params.friendId}},{new:true,runValidators:true}).then(dbUserData=>{
            if(!dbUserData){
                res.status(404).json({message:'There is no user with this id'})
                return;
            }
            res.json(dbUserData)  
        }).catch(err=>{res.status(400).json(err)})
    },
    //delete friend
    deleteFriend({params},res){
        User.findOneAndUpdate({_id:params.userId},{$pull:{friends:params.friendId}},{new:true,runValidators:true}).then(dbUserData=>{
            if(!dbUserData){
                res.status(404).json({message:'There is no user with this id'})
                return;
            }
            res.json(dbUserData)  
        }).catch(err=>{res.status(400).json(err)})
    }
}   

module.exports=UserController