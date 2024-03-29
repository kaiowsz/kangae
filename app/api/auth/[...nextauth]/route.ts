import { authOptions } from "@/utils/auth";
import NextAuth from "next-auth";

const handler = NextAuth((authOptions as any))

export { handler as GET, handler as POST }