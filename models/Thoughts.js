const {Schema,model,Types}=require('mongoose')
const dateFormat=require('../utils/dateFormat')
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
        required:[true,'please insert a username'],
    },
    createdAt:{
        type:Date,
        default:Date.now,
        get:(createdAtVal)=>dateFormat(createdAtVal)
    }
},
 {toJSON:{
    getters:true
}
})

const ThoughtsSchema=new Schema({
    thoughtText:{
        type:String,
        required:[true,'You must write a thought text'],
        min:[1],
        max:[280]
    },
    createdAt:{
        type:Date,
        default:Date.now,
        get:(createdAtVal)=>dateFormat(createdAtVal)
    },
    username:{
        type:String,
        required:true    
    },
    reactions :[reactionSchema]  
},
{
    toJSON:{
        virtuals:true,
        getters:true
    },
    id:false
}
)
const Thoughts=model('Thoughts',ThoughtsSchema)
ThoughtsSchema.virtual('reactionCount').get(function(){
    return this.reactions.length    
  })


module.exports=Thoughts

