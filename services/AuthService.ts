import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// eslint-disable-next-line import/no-unresolved
import app from "./firebaseConfig";

const auth = getAuth(app);

export const signUp = async (email: string, password: string) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};