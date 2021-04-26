const {Schema,model,Types}=require('mongoose')
const dateFormat=require('dateformat')
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
        get:(createdAtVal)=>dateFormat(createdAtVal,"dddd, mmmm dS, yyyy, h:MM:ss TT")
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
        get:(createdAtVal)=>dateFormat(createdAtVal,"mmm, d, yyyy, h:MM TT")
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

