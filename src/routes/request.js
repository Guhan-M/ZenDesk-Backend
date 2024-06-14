import express from 'express'
import RequestController from '../controller/request.js'
import Validate from '../midlleware/Validate.js'

const router = express.Router()

router.get('/count',Validate,RequestController.getRequestCount)
router.put('/assign/:srno',Validate,RequestController.assignRequest)
router.put('/close/:srno',Validate,RequestController.closeRequest)
router.get("/",Validate,RequestController.getRequestByStatus)
router.post('/',RequestController.createRequest)
router.get('/:id',RequestController.getRequestDetails)


export default router