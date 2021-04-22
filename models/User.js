const {Schema,model,Types}=require('mongoose')

const UserSchema=new Schema(
    {
      username:{
          type:String,
          unique:true,
          required:[true,'You must enter a username'],
          trim:true
      }  ,
    email:{
        type:String,
        required:[true,'You must enter an email'],
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please enter a valid e-mail address']
    },
    thoughts:[{type:Schema.Types.ObjectId,
        ref:'Thoughts'}],
        friends:[
            {
                type:Schema.Types.ObjectId,
                ref:'User'
            }
        ]   
    },
    {
        isJSON:{
            virtuals:true
        },
        id:false
    }
)

const User=model('User',UserSchema)
   

 UserSchema.virtual('friendCount').get(function(){
    return this.friends.length
    // return this.comments.reduce((total,comment)=>total+comment.replies.length+1,0)
 })
 
 module.exports=User   
   