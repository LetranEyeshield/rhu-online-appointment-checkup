import Link from "next/link";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Banner />

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-8 lg:px-20 py-10">

        {/* Guidelines Card */}
        <section className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10 border">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
            Guidelines for Filling the Form
          </h3>

          <ul className="mt-6 space-y-3 text-gray-700 text-sm sm:text-base">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✔</span>
              Choose your preferred appointment date.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✔</span>
              Fill in First Name and Last Name (Middle Name is optional).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✔</span>
              Select your preferred available time slot.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✔</span>
              Provide complete address information.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✔</span>
              Contact number must contain digits only.
            </li>
          </ul>
        </section>

        {/* CTA Section */}
        <section className="max-w-2xl mx-auto mt-12 text-center">
          <Link href="/appointment">
            <div className="group cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:scale-105">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Book an Appointment
              </h2>
              <p className="text-sm sm:text-base opacity-90">
                Click here to schedule your visit to the Rural Health Unit.
              </p>
            </div>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
