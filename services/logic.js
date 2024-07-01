const db=require('./db')
const jwt=require('jsonwebtoken')

//register

const register=(id,name,password,age,country,image,profession)=>{
    console.log('Inside Register logic');
    return db.Traveller.findOne({id}).then((result)=>{
        // console.log(result);

        if(result){

            return{
                statusCode:401,
                message:"Id already registered, try another Id"
            }
            
        }else{
            const newTraveller= new db.Traveller({
                id,name,password,age,country,image,profession,locations:[]
            })

            newTraveller.save()

            return{
                statusCode:200,
                message:"Registered Successfully"
            }

        }
    })
}

//login

const login = (id,password)=>{
    console.log("Inside Login logic");
    return db.Traveller.findOne({id,password}).then((result)=>{
        // console.log(result);

        if(result){
            const token=jwt.sign({loginId:id},'key2024')
            return{
                statusCode:200,
                message:"login successful",
                currentUser:result.name,
                token
            }
        }else{
            return{
                statusCode:401,
                message:"Failed to login"
            }
        }
    })
  }


  const getTraveller=(id)=>{
    return db.Traveller.findOne({id}).then((result)=>{
        if(result) {
            return{
                statusCode:200,
                user:result
            }
            
        } else {
            return{
                statusCode:401,
                message:'User not found'
            }
            
        }
        
    })
  }


  const addLocation=(id,url,place,description,country,opened)=>{
    return db.Traveller.findOne({id}).then((result)=>{
        if(result){
            result.locations.push({
                url,place,description,country,opened
            })
            result.save()
            return{
                statusCode:200,
                message:'Location successfully added'
            }
        }else{
            return{
                statusCode:401,
                message:'Failed to add location'
            }
        }
    })
  }

  const deleteLocation=(id,url)=>{
    console.log("Inside Delete Logic");
    return db.Traveller.findOne({id}).then((result)=>{
        console.log(result);
        if(result){
            result.locations.delete()
            result.save()
            return{
                statusCode:200,
                message:'Location successfully deleted'
            }
        }else{
            return{
                statusCode:401,
                message:'Failed to delete location'
            }
        }
    })
  }

module.exports={
    register,
    login,
    getTraveller,
    addLocation,
    deleteLocation
}