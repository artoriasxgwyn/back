import  users from "../../api_inventario/models/users.js"

const onlyGlobal = function(req,res,next){
 console.log(req.body);
};

const onlyProject = function(req,res,next){
    
};
const onlyRecurse = function(req,res,next){
    
};

export {onlyGlobal,onlyProject,onlyRecurse}