const router=require('express').Router()
const {getAllUser,getSingleUser,createUser,updateUser,deleteUser}=require('../controllers/User-controller')

router.route('/user').get(getAllUser).post(createUser)
router.route('/user/:id').get(getSingleUser).put(updateUser).delete(deleteUser)

module.exports=router
