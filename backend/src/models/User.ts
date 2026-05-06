import bcrypt from "bcryptjs";
import { Document, Schema, model } from "mongoose";

export type AuthProvider = "credentials" | "google";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider: AuthProvider;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function requiredPassword(this: UserDocument) {
        return this.provider === "credentials";
      },
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    image: {
      type: String,
      trim: true,
    },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password") || !this.password) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function comparePassword(
  candidatePassword: string,
) {
  if (!this.password) {
    return false;
  }

  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<UserDocument>("User", userSchema);
