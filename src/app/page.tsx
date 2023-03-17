import Header from "./components/Header/page";

function Home() {
    return (
        <div className="h-screen">
            <Header />
            <main>
                {/* <Banner /> */}
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
