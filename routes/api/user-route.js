const router=require('express').Router()
const {getAllUser,getSingleUser,createUser,updateUser,deleteUser}=require('../../controllers/User-controller')

router.route('/').get(getAllUser).post(createUser)
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser)

module.exports=router
