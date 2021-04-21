const {Schema,model,Types}=require('mongoose')

const reactionSchema=new Schema({
    reactionId:{
        type:Schema.Types.ObjectId,
        default:()=>new Types.ObjectId()
    },
    reactionBody:{
        type:String,
        required:true,
        max:[280]  
    },
    username:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now() 
        //format date
    }
})


const ThoughtsSchema=new Schema({
    thoughtText:{
        type:String,
        required:true,
        min:[1],
        max:[280]
    },
    createdAt:{
        type:Date,
        default:Date.now()
        //getter format date
    },
    username:{
        type:String,
        required:true
         
    },
    reactions :[reactionSchema]
    
})
const Thoughts=model('thoughts',ThoughtsSchema)
ThoughtsSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})

module.exports=Thoughts

