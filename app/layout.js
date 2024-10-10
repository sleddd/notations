import { Montserrat } from 'next/font/google';
import SessionProvider from '@/components/auth/SessionProvider';
import ApolloProviderWrapper from '@/lib/apollo-client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FullWidthBackground } from '@/components/layout/FullWidthBackground';
import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: "Notations",
  description: "A short form journaling app powered by Next.js and WordPress.",
};

const backgrounds = [
  {
    name: "one", url: "/assets/background-one.jpg", attribution: 'Photo by <a href="https://unsplash.com/@mehrab_sium?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mehrab Sium</a> on <a href="https://unsplash.com/photos/a-table-and-chair-in-a-field-of-grass-a7O0Tsd8dE8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'
  },
  { name: "two", url: "/assets/background-two.jpg", attribution: 'Photo by <a href="https://unsplash.com/@kace?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Kace  Rodriguez</a> on <a href="https://unsplash.com/photos/river-overflow-in-between-rock-formation-p3OzJuT_Dks?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>' },
  { name: "three", url: "/assets/background-three.jpg", attribution: 'Photo by <a href="https://unsplash.com/@grantritchie?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Grant Ritchie</a> on <a href="https://unsplash.com/photos/aerial-view-of-grass-mountains-x1w_Q78xNEY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>' },
  { name: "four", url: "/assets/background-four.jpg", attribution: 'Photo by <a href="https://unsplash.com/@therawhunter?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Massimiliano Morosinotto</a> on <a href="https://unsplash.com/photos/gray-desert-front-of-sunlight-MljwsnGwdOY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>' },
  { name: "five", url: "/assets/background-five.jpg", attribution: 'Photo by <a href="https://unsplash.com/@daria_kraplak">Daria Kraplak</a> on <a href="https://unsplash.com/photos/black-typewriter-d34DtRp1bqo">Unsplash</a>' },
  { name: "six", url: "/assets/background-six.jpg", attribution: 'Photo by <a href="https://unsplash.com/@barkernotbaker?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">James Barker</a> on <a href="https://unsplash.com/photos/brown-wooden-shelf-with-assorted-books-RKK_nvoOJ6Y?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>' },
  { name: "seven", url: "/assets/background-seven.jpg", attribution: 'Photo by <a href="https://unsplash.com/@lucamicheli?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Luca Micheli</a> on <a href="https://unsplash.com/photos/photo-of-mountain-ruWkmt3nU58?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>' },
  { name: "eight", url: "/assets/background-eight.jpg", attribution: 'Photo by <a href="https://unsplash.com/@claudiotesta?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Claudio Testa</a> on <a href="https://unsplash.com/photos/green-hills-with-forest-under-cloudy-sky-during-daytime--SO3JtE3gZo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>' },
  { name: "nine", url: "/assets/background-nine.jpg", attribution: 'Photo by <a href="https://unsplash.com/@dnevozhai?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Denys Nevozhai</a> on <a href="https://unsplash.com/photos/streets-during-nighttime-D68ADLeMh5Q?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>' },
  { name: "ten", url: "/assets/background-ten.jpg", attribution: 'Photo by <a href="https://unsplash.com/@sincerelymedia?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Sincerely Media</a> on <a href="https://unsplash.com/photos/macbook-beside-teacup-with-latte-zw8t5aMmJQQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>' },
  { name: "eleven", url: "/assets/background-eleven.jpg", attribution: 'Photo by <a href="https://unsplash.com/@itfeelslikefilm?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Janko Ferlič</a> on <a href="https://unsplash.com/photos/shallow-depth-of-field-photo-of-white-teacup-on-saucer-jmhwim1FUr4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>' },


]

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} font-sans`}>
      <body>
        <SessionProvider>
          <ApolloProviderWrapper>
            <FullWidthBackground className="bg-eleven" />
            <main className="main">
              <Header />
              {children}
              <Footer />
            </main>
          </ApolloProviderWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}