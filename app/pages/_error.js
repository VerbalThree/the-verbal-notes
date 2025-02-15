'use client';

import Link from "next/link"
import React from "react";

export default function Custom500() {
    return (
      <div>
      <div className="flex justify-center items-center mb-4"><h1 className="">Ow snap! This page has <b className="error">not been found...</b></h1></div>
      <Link href="/" className="flex justify-center items-center">
          <h1 className="bg-purple-800" id="homepage-error">[Come back to the homepage]</h1>
      </Link>
      </div>
    )
  }