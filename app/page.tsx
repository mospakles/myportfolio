import { Metadata } from "next";
import Homepage from "./homepage/page";

export const metadata: Metadata = {
  title:
    "Motunrayo Odusina | Frontend Developer",
  description:
    "Senior frontend developer with experience building modern, responsive web applications",
  keywords: [
    "Frontend Developer",
    "Software Developer",
    "React Developer",
    "Angular Developer",
    "Javascript Developer",
    "Frontend Engineer",
    "Nextjs Developer",
    "Typescript Developer",
    "Vue Developer",
    "Nigeria Developer",
    "Female Developer",
    "Software Engineer",
  ],
  authors: [{ name: 'Motunrayo Odusina' }],
  creator: 'Motunrayo Odusina',
  publisher: 'Motunrayo Odusina',
    robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://media.licdn.com/dms/image/v2/C4E03AQHHdLtPr-tp-Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1633329153819?e=2147483647&v=beta&t=RTOOORLa0igsFQ0bIY6UBPJ8PuP1lXBUI4jhu5GU2Mc',
    siteName: 'Motunrayo Odusina',
    title: 'Motunrayo Odusina | Frontend Developer',
    description: 'Senior frontend developer with experience building modern, responsive web applications',
    images: [
      {
        url: 'https://media.licdn.com/dms/image/v2/C4E03AQHHdLtPr-tp-Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1633329153819?e=2147483647&v=beta&t=RTOOORLa0igsFQ0bIY6UBPJ8PuP1lXBUI4jhu5GU2Mc',
        width: 1200,
        height: 630,
        alt: 'Motunrayo Odusina - Motunrayo Odusina'
      }
    ]
  },

};
export default function Home() {
  return (
    <>
      <Homepage />
    </>
  );
}
