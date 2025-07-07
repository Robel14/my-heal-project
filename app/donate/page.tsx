'use client';

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormEvent } from "react";

export default function DonationTeamContactPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('firstName') + ' ' + formData.get('lastName');
    const email = formData.get('email');
    const inquiryType = formData.get('inquiryType');
    const message = formData.get('message');

    console.log("Donation team contact:", { name, email, inquiryType, message });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="relative h-[300px]">
          <div className="absolute inset-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5_2025-03-12_15-05-16.jpg-5Zw85q0evMUaDvOZ1RiWu0T21jxyk8.jpeg"
              alt="Contact Our Donation Team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold text-white">Contact Our Donation Team</h1>
            </div>
          </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-blue-700 mb-4">Get in Touch</h2>
                <p className="text-gray-700">
                  Our donation team is here to assist you with any questions about donations, planned giving, or other
                  ways to support our work in Ethiopia.
                </p>
              </div>

              <div className="grid md:grid-cols-5 gap-8 mb-12">
                <div className="md:col-span-3">
                  <Card>
                    <CardContent className="pt-6">
                      <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                          <Label htmlFor="inquiryType">Type of Inquiry</Label>
                          <Select name="inquiryType" required>
                            <SelectTrigger id="inquiryType">
                              <SelectValue placeholder="Select type of inquiry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Donation Question</SelectItem>
                              <SelectItem value="recurring">Monthly Giving</SelectItem>
                              <SelectItem value="corporate">Corporate Giving</SelectItem>
                              <SelectItem value="legacy">Legacy Giving</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" name="firstName" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" name="lastName" required />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" name="email" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" type="tel" name="phone" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea id="message" rows={5} name="message" required />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="callBack" name="callBack" />
                          <Label htmlFor="callBack">I would like to receive a call back</Label>
                        </div>

                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                          Send Message
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                <div className="md:col-span-2">
                  <div className="bg-gray-50 p-6 rounded-lg h-full">
                    <h3 className="text-xl font-semibold text-blue-700 mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">Email:</p>
                        <p className="text-gray-700">healethiopia9@gmail.com</p>
                      </div>
                      <div>
                        <p className="font-medium">Phone:</p>
                        <p className="text-gray-700">+251 11 123 4567</p>
                      </div>
                      <div>
                        <p className="font-medium">Office Hours:</p>
                        <p className="text-gray-700">Monday - Friday: 9:00 AM - 5:00 PM (EAT)</p>
                      </div>
                    </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Ways to Give</h3>
                <p className="text-gray-700 mb-4">
                  There are many ways to support HEAL-Ethiopia's work. Our donation team can help you explore options
                  including:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                  <li>One-time donations</li>
                  <li>Monthly giving</li>
                  <li>Corporate matching gifts</li>
                  <li>Donations in honor or memory of loved ones</li>
                  <li>Legacy giving</li>
                </ul>
                <Link href="/donate">
                  <Button className="bg-green-600 hover:bg-green-700">Make a Donation</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
