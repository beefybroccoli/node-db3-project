const modelSchemes = require("./scheme-model");

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {

  modelSchemes.findById(req.params.scheme_id)
    .then(result=>{
      // console.log("result = ", result);
      next();
    })
    .catch(err=>{
      res.status(404).json({message:`scheme with scheme_id ${req.params.scheme_id} not found`});
    })
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const {scheme_name} = req.body;
  if(scheme_name === null || scheme_name === undefined || typeof(scheme_name) !== "string" || scheme_name.trim() === "" ){
    res.status(400).json({message:"invalid scheme_name"});
  }else{
    next();  
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  
  const {instructions, step_number} = req.body;
  if(instructions === undefined || instructions === null || typeof(instructions) !== "string" || instructions.trim() === "" ||  typeof(step_number) !== "number" || Number(step_number) < 1){
    res.status(400).json({message:"invalid step"});
  }else{
    next();  
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}