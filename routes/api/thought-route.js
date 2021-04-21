const router=require('express').Router()
const {getAllThoughts,getSingleThoughtById,createThought,deleteThought}=require('../../controllers/Thoughts-controller')

router.route('/').get(getAllThoughts)

router.route('/:id').get(getSingleThoughtById).delete(deleteThought)

router.route('/:userId').post(createThought)

module.exports=router
