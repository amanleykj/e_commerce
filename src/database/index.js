import mongoose from "mongoose";

const configOptions = {
    useNewUrlParser : true,
    useUnifiedTopology : true
}

const connectToDB = async() => {
    const connectionURL = "mongodb+srv://anthonymanleysu:SRdhdBWytr1rijaC@clustertrap.ktkhlsz.mongodb.net/";

    mongoose
    .connect(connectionURL, configOptions)
    .then(() => console.log("Looking good. DB connection good."))
    .catch((error) => console.log(`The error ${error.message} is coming up. Help?`))
}


export default connectToDB;