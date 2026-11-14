import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Products } from "@/components/products";
import { Checkout } from "@/components/checkout";
import { Story } from "@/components/story";
import { Showcase } from "@/components/showcase";
import { Team } from "@/components/team";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";
import { ShimmerLoader } from "@/components/shimmer-loader";

export default function Home() {
  return (
    <main className="w-full">
      <ShimmerLoader />
      <Navigation />
      <Hero />
      <Products />
      <Checkout />
      <Story />
      <Showcase />
      <Team />
      <Footer />
      <Toaster theme="dark" />
    </main>
  );
}
