const router=require('express').Router()
const userRoute=require('./user-route')

router.use('/api',userRoute)

module.exports=router


