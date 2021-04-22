const {Thoughts, User}=require('../models')

const ThoughtsController={
    getAllThoughts(req,res){
        Thoughts.find({}).select('-__v').then(dbThoughtData=>{
            res.json(dbThoughtData)
        }).catch(err=>{
            res.status(400).json(err)
        })        
    },
    
    getSingleThoughtById({params},res){
      Thoughts.findOne({_id:params.id}).select('-__v').then(dbThoughtData=>{
          if(!dbThoughtData){
              res.status(404).json({message:'no thought found with this id'})
              return;
          }
          res.json(dbThoughtData)
      }).catch(err=>{
        res.status(400).json(err)  
    })
},
createThought({params,body},res){
    console.log(params)
    Thoughts.create(body).then(({_id})=>{
        return User.findOneAndUpdate({_id:params.userId},{$addToSet:{thoughts:_id}},{new:true})
    }).then(dbUserData=>{
        if(!dbUserData){
            res.status(404).json({message:'There is no user  with this id'})
            return;
        }
        res.json(dbUserData)
    }).catch(err=>{res.status(400).json(err)})
},
deleteThought({params},res){
    Thoughts.findOneAndDelete({_id:params.id}).then(dbThoughtData=>{
        if(!dbThoughtData){
            res.status(404).json({message:'There is no thought with this id'})
            return;
        }
        res.json(dbUserData)
    }).catch(err=>{res.status(400).json(err)})
},
updateThought({params,body},res){
   Thoughts.findOneAndUpdate({_id:params.id},body,{new:true}).then(dbThoughtData=>{
       if(!dbThoughtData){
        res.status(404).json({message:'There is no thought with this id'})
        return;
       }
       res.json(dbThoughtData)
   }).catch(err=>{res.status(400).json(err)}) 
    
},
createReactions({params,body},res){
   Thoughts.findOneAndUpdate({_id:params.thoughtId},{$addToSet:{reactions:body}},{new:true,select:'-__v'}).then(dbThoughtData=>{
       if(!dbThoughtData){
           console.log("nice")
        res.status(404).json({message:'There is no thought with this id'}) 
        return;
       }
       res.json(dbThoughtData)
   }).catch(err=>{res.status(400).json(err)})  
},
deleteReactions({params},res){
    console.log(params)
    Thoughts.findOneAndUpdate({_id:params.thoughtId},{$pull:{reactions:{reactionId:params.reactionId}}},{new:true}).then(dbThoughtData=>{
   res.json(dbThoughtData)
}).catch(err => res.json(err));
}
}
module.exports=ThoughtsController

