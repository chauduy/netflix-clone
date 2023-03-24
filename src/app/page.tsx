import Header from "./components/Header/page";
import Banner from "./components/Banner/page";

function Home() {
    return (
        <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
            <Header />
            <main>
                <Banner />
                <section>
                    {/* <Row />
                    <Row />
                    <Row />
                    <Row /> */}
                </section>
            </main>
            {/* <Modal /> */}
        </div>
    );
}

export const metadata = {
    title: "Home - Netflix",
    icons: "/netflix-icon.png",
};

export default Home;
