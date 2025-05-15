
// import {}import {
   import { DocumentType,
    getModelForClass,
    modelOptions,
    pre,
    prop,
    Ref,
    Severity,
  } from "@typegoose/typegoose";
  import bcrypt from "bcryptjs";


    
    @pre<User>("save", async function () {
        if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        }
    })

    @modelOptions({
    schemaOptions: {
      timestamps: true,
    },
    options: {
      allowMixed: Severity.ALLOW,
    },
  })


  export class User {
    @prop({ required: true })
    public name!: string;

    @prop({ required: true, unique: true })
    public email!: string;

    @prop({ required: true })
    public password!: string;


    @prop({ default: "member", enum: ["member", "admin"] })
    public role?: string;  
    
    @prop({ default: false })
    public isAdmin?: boolean;
  }


                const userModel = getModelForClass(User);
                export default userModel;
