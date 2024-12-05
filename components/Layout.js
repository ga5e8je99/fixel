import Header from "./Header";
import Footer from "./Footer";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children, user }) {
  return (
    <div className={inter.className}>
      <Header user={user} />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;

  // Example: Extract token from cookies or headers
  const token = req.cookies.token || null;

  let user = null;

  if (token) {
    try {
      const response = await fetch(API_BASE_URL + "api/myprofile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        user = await response.json();
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  return {
    props: {
      user,
    },
  };
}
