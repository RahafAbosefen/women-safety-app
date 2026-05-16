import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "./firebaseConfig";
import { UsersService } from "./UsersService";
import StorageService from "./StorageService"; 

const auth = getAuth(app);

export const login = async (payload: any) => {
  const response = await signInWithEmailAndPassword(
    auth,
    payload.email,
    payload.password,
  );
  const user = response.user;

  await StorageService.saveUser(user); 

  return user;
};

export const signUp = async (payload: any) => {
  const response = await createUserWithEmailAndPassword(
    auth,
    payload.email,
    payload.password,
  );
  const user = response.user;

  
  await StorageService.saveUser(user); 

  if (payload.role === "company") {
    await UsersService.createUserProfile(user.uid, {
      email: payload.email,
      role: "company",
      name: payload.firstName + " " + payload.lastName,
    });
  } else {
    await UsersService.createUserProfile(user.uid, {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      role: "user",
    });
  }

  return user;
};

export const logout = async () => {
  const auth = getAuth(app);
  await signOut(auth);
  await StorageService.removeUser();
};

export const getUserRole = async (uid: string) => {
  const profile = await UsersService.getUserProfile(uid);
  return profile?.role || null;
};
