const errorMiddleware= (err,req,res,next)=>{
    try{
        let error={...err};
        error.message=err.message;
        console.err(err);
        //mongoose bad object id
        if(err.name == 'CastError'){
            const message= 'resource not found';
            error=new Error(message);
            error.statusCode=404;

        }
        // duplicate mongoose key
        if(err.name=='11000'){
            const message='Duplicate feild value entered';
            error=new Error(message);
            error.statusCode=400;
        }
        //validation error
        if(err.name='ValidationError'){
            var message = [];
            var errors = Object.values(err.errors);

            for (var i = 0; i < errors.length; i++) {
                message.push(errors[i].message);
            }
            error=new Error(message.join(', '));
            error.statusCode=400;

        }
            res.status(error.statusCode || 500).json({
                success:false,
                error:error.message || 'server error'
            });
    }
    catch(error){
         next(error)
    }
};

export default errorMiddleware;
