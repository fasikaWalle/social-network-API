const router=require('express').Router()
const {getAllThoughts,getSingleThoughtById,createThought,deleteThought,updateThought,createReactions,deleteReactions}=require('../../controllers/Thoughts-controller')

router.route('/').get(getAllThoughts)

router.route('/:id').get(getSingleThoughtById).delete(deleteThought).put(updateThought)

router.route('/:userId').post(createThought)
router.route('/:thoughtId/reactions').put(createReactions)
router.route('/:thoughtId/:reactionId').delete(deleteReactions)

module.exports=router
