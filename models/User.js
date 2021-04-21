const {Schema,model,Types} =require('mongoose')
const UserSchema=new Schema(
    {
      username:{
          type:String,
          unique:true,
          required:true,
          trim:true
      }  ,
    email:{
        type:String,
        required:true,
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
        }
    }
)

const User=model('user',UserSchema)
   

 UserSchema.virtual('friendCount').get(function(){
    return this.friends.length
 })
 
 module.exports=User   
   