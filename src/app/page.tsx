"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import heroImage from "@/assets/hero.webp"; // Replace with your hero image path
import featureImage1 from "@/assets/feat1.avif"; // Replace with your feature image paths
import featureImage2 from "@/assets/feat2.avif";
import featureImage3 from "@/assets/feat3.avif";

const Home = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/welcome");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen bg-gray-900">
        <Image
          src={heroImage}
          alt="Hero"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-50"
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Platform</h1>
          <p className="text-lg mb-8">
            Streamline your online class attendance with ease and efficiency.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-8">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src={featureImage1}
                alt="Feature 1"
                className="mx-auto mb-4 w-24 h-24 rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2">Feature 1</h3>
              <p className="text-gray-600">
                Description of feature 1 that highlights its benefits.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src={featureImage2}
                alt="Feature 2"
                className="mx-auto mb-4 w-24 h-24 rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2">Feature 2</h3>
              <p className="text-gray-600">
                Description of feature 2 that highlights its benefits.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src={featureImage3}
                alt="Feature 3"
                className="mx-auto mb-4 w-24 h-24 rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2">Feature 3</h3>
              <p className="text-gray-600">
                Description of feature 3 that highlights its benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-indigo-500 py-20 text-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <button
            onClick={handleGetStarted}
            className="bg-white text-indigo-500 px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
