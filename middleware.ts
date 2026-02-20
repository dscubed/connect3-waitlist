import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.redirect(
    'https://connect3.app/',
    302
  )
}
