import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuração do Firebase do projeto Lexdocs
export const firebaseConfig = {
  apiKey: "AIzaSyCthy2mT9thia-duGTd2J1sRL2iApl3Jjk",
  authDomain: "lexdocs-assessorial-documental.firebaseapp.com",
  projectId: "lexdocs-assessorial-documental",
  storageBucket: "lexdocs-assessorial-documental.firebasestorage.app",
  messagingSenderId: "819654349178",
  appId: "1:819654349178:web:3120039aab172c24b406c3"
};

// Inicialização do Firebase via SDK Modular v9+
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;

