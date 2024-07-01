
const express= require('express')

const cors=require('cors')

const server=express()

const multer=require('multer')
const path=require('path')
const Storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,('../travel-log-frontend/src/Components/images'))
    },
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,file.fieldname +"_"+ Date.now() +path.extname(file.originalname))
    }
})
const upload=multer({storage:Storage})

// const multer2=require('multer')
// const path2=require('path')
// const Storage2=multer2.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,('../travel-log-frontend/src/Components/images2'))
//     },
//     filename:(req,file,cb)=>{
//         console.log(file);
//         cb(null,file.fieldname +"_"+ Date.now() +path2.extname(file.originalname))
//     }
// })
// const upload2=multer2({storage:Storage2})



const logic=require('./services/logic')

server.use(cors({
    origin:'http://localhost:3000'
}))

server.use(express.json())

server.listen(8000,()=>{
    console.log('In port 8000');
})







//register
server.post('/register',upload.single("file"),(req,res)=>{
    console.log('Inside register api');

    console.log(req.file);
    const image=req.file.filename
    console.log(req.body);

    logic.register(req.body.id,req.body.name,req.body.password,req.body.age,req.body.country,image,req.body.profession).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})


//login

server.post('/login',(req,res)=>{
    console.log('Inside login api');
    console.log(req.body);
    logic.login(req.body.id,req.body.password).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//get traveller

server.get('/getTraveller/:id',(req,res)=>{
    logic.getTraveller(req.params.id).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//add location

server.post('/getTraveller/:id/add',upload.single("file"),(req,res)=>{
    console.log("Inside add Api");
    console.log(req.file);
    const image=req.file.filename
    logic.addLocation(req.body.id,image,req.body.place,req.body.description,req.body.country,req.body.opened).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//delete location 
server.delete('/getTraveller/:id/view/delete',(req,res)=>{
    console.log("Inside Delete Location");
    console.log(req.body.url);
    console.log(req.body.id);
    logic.deleteLocation(req.body.id,req.body.url).then((result)=>{
        res.status(result.statusCode).json(result)
    })

})