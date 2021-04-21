const router=require('express').Router()
const {getAllThoughts,getSingleThoughtById,createThought}=require('../../controllers/Thoughts-controller')

router.route('/').get(getAllThoughts)

router.route('/:id').get(getSingleThoughtById)

router.route('/:userId').post(createThought)

module.exports=router
