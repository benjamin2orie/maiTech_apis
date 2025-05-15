
import { getModelForClass, modelOptions, prop, Ref, Severity } from "@typegoose/typegoose";
import { User } from "./user_model";

@modelOptions({
    schemaOptions:{
        timestamps: true,
        collection: "tasks",
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
    })


    class Task{
    @prop({ required: true })
    title!: string;

    @prop({ required: true })
    description!: string;

    @prop({ default: "pending", enum: ["pending", "in-progress", "done", "to-do"] })
    status!: string;

    @prop({required: true})
    dueDate!: Date;

    @prop({ ref: () => User, required: true })
    assignedTo!: Ref<User>;
    }

    const taskModel = getModelForClass(Task);
    export default taskModel;