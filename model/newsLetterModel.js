import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
});

const NewsletterModel = mongoose.model("Newsletter", newsletterSchema);
export default NewsletterModel;