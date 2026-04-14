import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "./firebaseConfig";

const auth = getAuth(app);

export const signUp = async (email: string, password: string) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};