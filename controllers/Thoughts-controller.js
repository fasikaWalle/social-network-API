const {Thoughts}=require('../models')

const ThoughtsController={
    findAllThoughts(req,res){
        Thoughts.find({}).then(dbUserThought=>{
            res.json(dbUserThought)
        }).catch(err=>{
            res.status(400).json(err)
        })        
    }
    
}