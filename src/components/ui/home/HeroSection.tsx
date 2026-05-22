import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

export default function HeroSection(){
    return(
        <section className="bg-[#056f5b] relative overflow-hidden ">
            <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-10 items-center">
                <HeroLeft/>
                <HeroRight/>
            </div>
        </section>
    )
}