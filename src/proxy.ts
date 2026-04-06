import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/test(.*)"
]);

const isOrgSelectionRoute = createRouteMatcher([
    "/org-selection(.*)"
]);



export default clerkMiddleware( async (auth , reg) => {
    const { userId, orgId } = await auth();


    if(isPublicRoute(reg)){
        return NextResponse.next();
    }

    if(!userId){
        await auth.protect();
    }

    if(isOrgSelectionRoute(reg)){
        return NextResponse.next();
    }

    if(userId && !orgId){
        const orgSelectionUrl = new URL("/org-selection", reg.url);
        return NextResponse.redirect(orgSelectionUrl);
    }

    return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
