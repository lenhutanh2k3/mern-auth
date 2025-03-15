import express from 'express';
const app = express();
import routerUser from "./user.js"; 
import routerAuth from "./auth.js";
export const router =(app)=>
{
    app.use("/api/user", routerUser);
    app.use('/api/auth', routerAuth);
    app.use((err,req,res,next)=>
    {
        const status = err.status || 500;
        const message = err.message || "Something went wrong";
        return res.status(status).json({
            success:false,
            status,
            message,
        })
    })
}
