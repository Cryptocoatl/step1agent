import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { Rocket, Code, ShieldCheck, Users, Lightbulb, BookOpenCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Learn = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-grow">
        <section className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Unlock the Power of Web3
          </h1>
          <p className="text-gray-600 text-lg">
            Learn how to leverage blockchain technology for a better future.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatedCard animation="slideUp" className="p-6">
            <Rocket className="h-6 w-6 text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Getting Started with Blockchain
            </h2>
            <p className="text-gray-600 mb-4">
              A beginner-friendly guide to understanding blockchain technology and its potential.
            </p>
            <Button asChild variant="secondary">
              <Link to="#">Explore Now</Link>
            </Button>
          </AnimatedCard>

          <AnimatedCard animation="slideUp" className="p-6">
            <Code className="h-6 w-6 text-green-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Smart Contracts 101
            </h2>
            <p className="text-gray-600 mb-4">
              Learn how to write and deploy smart contracts on various blockchain platforms.
            </p>
            <Button asChild variant="secondary">
              <Link to="#">Dive In</Link>
            </Button>
          </AnimatedCard>

          <AnimatedCard animation="slideUp" className="p-6">
            <ShieldCheck className="h-6 w-6 text-purple-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Decentralized Identity
            </h2>
            <p className="text-gray-600 mb-4">
              Discover the importance of owning your digital identity and how to create one.
            </p>
            <Button asChild variant="secondary">
              <Link to="#">Get Started</Link>
            </Button>
          </AnimatedCard>

          <AnimatedCard animation="slideUp" className="p-6">
            <Users className="h-6 w-6 text-orange-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              DAO Governance
            </h2>
            <p className="text-gray-600 mb-4">
              Understand how Decentralized Autonomous Organizations are shaping the future of governance.
            </p>
            <Button asChild variant="secondary">
              <Link to="#">Learn More</Link>
            </Button>
          </AnimatedCard>

          <AnimatedCard animation="slideUp" className="p-6">
            <Lightbulb className="h-6 w-6 text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Web3 Innovations
            </h2>
            <p className="text-gray-600 mb-4">
              Stay up-to-date with the latest advancements and trends in the Web3 ecosystem.
            </p>
            <Button asChild variant="secondary">
              <Link to="#">Explore</Link>
            </Button>
          </AnimatedCard>

          <AnimatedCard animation="slideUp" className="p-6">
            <BookOpenCheck className="h-6 w-6 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Advanced Tutorials
            </h2>
            <p className="text-gray-600 mb-4">
              Take your Web3 knowledge to the next level with in-depth tutorials and guides.
            </p>
            <Button asChild variant="secondary">
              <Link to="#">Start Learning</Link>
            </Button>
          </AnimatedCard>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Learn;
