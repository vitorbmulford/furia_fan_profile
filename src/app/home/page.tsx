import Hero from "../components/hero";
import Stats from "../components/stats";
import Info from "../components/info";
import Data from "../components/data";
import Deployment from "../components/deployment";

export default function Main() {
    return (
        <div className="min-h-screen bg-[#0a0f2e] text-white font-sans overflow-x-hidden">
            <Hero />
            <Stats />
            <Info />
            <Data />
            <Deployment />
        </div>
    );
}
