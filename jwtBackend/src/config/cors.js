

const configCors = (app) => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", process.env.REACT_URL); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.header("Access-Control-Allow-Credentials", true);
        next();
    });
    
}

export default configCors;