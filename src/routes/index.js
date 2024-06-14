import express from 'express'
const router =express.Router()
import RequestRoutes from './request.js'
import UserRoutes from './user.js'

router.get('/',(req,res)=>{
    res.send(`<h1>Welcome to Backend of Zendesk</h1>`)
})

router.use('/request',RequestRoutes)
router.use('/user',UserRoutes)


export default router