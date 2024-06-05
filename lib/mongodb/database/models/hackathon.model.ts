import { model, models, Schema, Document } from "mongoose";

export interface IEvent extends Document {
    _id: string;
    title: string;
    description?: string;
    location?: string;
    createdAt: Date;
    imageUrl: string;
    startDateTime: string;
    endDateTime: string;
    price?: string;
    isFree: boolean;
    url?: string;
    category: {_id: string, name: string};
    organizer: {_id: string, firstName: string, lastName: string};
}

const HackSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    startDateTime: { type: String, default: Date.now },
    endDateTime: { type: String, default: Date.now },
    price: { type: String },
    isFree: { type: Boolean, default: false },
    url: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    organizer: { type: Schema.Types.ObjectId, ref: 'User' }
});


const Hack = models.Hack || model('Hack', HackSchema);

export default Hack;