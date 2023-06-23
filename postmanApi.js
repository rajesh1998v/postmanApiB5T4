var express = require("express");

var app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );  
  res.header("Access-Control-Expose-Headers","Authorization")
  res.header("Access-Control-Expose-Headers","X-Auth-Token")
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  next();
});

var port = process.env.PORT || 2420;

let axios = require("axios");
app.listen(port, () => console.log(`Node app listening on port ${port}`));

app.post("/post",async function(req,res){
  let body = req.body;
  let token = body.headerKey1.toLowerCase()=="authorization"?body.headerValue1:
              body.headerKey2.toLowerCase()=="authorization"?body.headerValue2:
              body.headerKey3.toLowerCase()=="authorization"?body.headerValue3:"";
    if(body.req==="GET"){
        try{
          let response = await axios.get(body.url);
          let resData = JSON.stringify(response.data);
          console.log(response.data);
          res.send(response.data);
          
        }catch(error){
          if (error.response){
            // console.log(error.response);
            let { data,status, statusText } = error.response;
            console.log(data,status,statusText);
            res.status(status).send(data,status,statusText);
          }else res.status(404).send(error);
        }
     

    }else if(body.req==="POST"){
      try{
        let body1 = JSON.parse(body.body);
        console.log(body1);
        let response = await axios.post(body.url,body1, {headers: {authorization: token}}) ;
        let resData = JSON.stringify(response.data);
          res.status(200).send(resData);
    }catch (error){
        if (error.response){
          let { data,status, statusText } = error.response;
          console.log(data,status,statusText);
          res.status(status).send(data,status,statusText);
        }else res.status(404).send(error);
    }
       
    
    }else if(body.req==="PUT"){

      try{
        let body1 = JSON.parse(body.body);
        let response = await axios.put(body.url,body1, {headers: {authorization: token}}) ;
        let resData = JSON.stringify(response.data);
          res.status(200).send(resData);
        console.log(response.data);
      }catch (error){
        if (error.response){
          let { data,status, statusText } = error.response;
          console.log(data,status,statusText);
          res.status(status).send(data,status,statusText);
        }else res.status(404).send(error);
      } 
       
    }else if(body.req==="DELETE"){
      try{
        let response = await axios.delete(body.url, {headers: {authorization: token}}) ;
        let resData = JSON.stringify(response.data);
          res.status(200).send(resData);
        console.log(response.data);
      }catch (error){
        if (error.response){
          let { data,status, statusText } = error.response;
          console.log(data,status,statusText);
          res.status(status).send(data,status,statusText);
        }else res.status(404).send(error);
      } 
    }

})
