const Joi = require('joi');

const Registervaldation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(20).required(),
    }); 

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: ['Name must be atleat 3 characters','Correct Email required','Password must be atleast 4 characters'], error });
    }
    next();
}

const Loginvaldation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        
        password: Joi.string().min(4).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}

const ForgotValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}

const ResetValidations=(req,res,next)=>{
    const schema =Joi.object({        
        email: Joi.string().email().required(),
        old_pass: Joi.string().min(4).max(20).required(),
        new_pass: Joi.string().min(4).max(20).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}

module.exports = { Registervaldation, Loginvaldation ,ForgotValidation};

