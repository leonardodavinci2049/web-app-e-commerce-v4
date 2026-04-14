import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return <div>page</div>;
};

export default page;
