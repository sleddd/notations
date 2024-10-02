import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth";

export const handler = async (req, res) => NextAuth(req, res, authOptions);
export { handler as GET, handler as POST };