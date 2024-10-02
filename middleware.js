import { withAuth } from "next-auth/middleware";

export default withAuth({
    secret: process.env.NOTATIONS_SECRET,
});

export const config = {
    matcher: ["/calendar(.*)"],
};
