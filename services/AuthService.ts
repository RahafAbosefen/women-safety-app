import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import app from "./firebaseConfig";
import StorageService from "@/services/StorageService";
import { UsersService } from "./UsersService";




const auth = getAuth(app);

export const login = async (payload: any) => {
    const response = await signInWithEmailAndPassword(auth, payload.email, payload.password);
    const user = response.user;
    const token = await user.getIdToken();
    await StorageService.saveUser(user);
    await StorageService.saveToken(token);
    return user;
}

export const signUp = async (payload: any) => {
  const response = await createUserWithEmailAndPassword(
    auth,
    payload.email,
    payload.password,
  );
  const user = response.user;
  await UsersService.createUserProfile(user.uid, {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone,
  });
  const token = await user.getIdToken();
  await StorageService.saveUser(user);
  await StorageService.saveToken(token);
  return user;
};

export const logout = async () => {
    const auth = getAuth(app);
    await signOut(auth);

    await StorageService.removeUser();
    await StorageService.removeToken();
}
