import BlogGrid from "@/components/blog";
import Footer from "@/components/footer";
import Display from "@/components/displat";
import ProductListFeature from "@/components/feature";
import ProductGrid from "@/components/feature";
import RocketSingleSeater from "@/components/hero";
import InstagramBanner from "@/components/insta";
import Navbar from "@/components/nav";
import ProductGridList from "@/components/product";

export default function Home() {
  return (
    <div className="">
      <RocketSingleSeater/>
      <ProductGrid/>
      <ProductGridList/>
      <Display/>
      <BlogGrid/>
      <InstagramBanner/>
      </div>
  );
}
