// export default function Banner() {
//   return (
//     <>
//       <div className="banner flex justify-center px-4 py-6">
//         <img
//           className="best-rhu-family w-4/12 max-w-full rounded-lg"
//           src={"/the-best-rhu-family.jpg"}
//           alt={"Best RHU-Manaoag Family"}
//         />
//         <img
//           className="best-rhu-boys w-4/12 max-w-full rounded-lg"
//           src={"/the-boys.jpg"}
//           alt={"Best RHU-Manaoag Staffs"}
//         />
//           <img
//           className="best-rhu-staffs w-4/12 max-w-full rounded-lg"
//           src={"/best-rhu-staffs.jpg"}
//           alt={"Best RHU-Manaoag Staffs"}
//         />
//       </div>
//     </>
//   );
// }


export default function Banner() {
  return (
    <section className="bg-white py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
          Our Dedicated Health Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <img
            src="/the-best-rhu-family.jpg"
            alt="Best RHU-Manaoag Family"
            className="w-full h-64 object-cover rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:scale-105"
          />

          <img
            src="/the-boys.jpg"
            alt="Best RHU-Manaoag Staffs"
            className="w-full h-64 object-cover rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:scale-105"
          />

          <img
            src="/best-rhu-staffs.jpg"
            alt="Best RHU-Manaoag Staffs"
            className="w-full h-64 object-cover rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:scale-105"
          />

        </div>
      </div>
    </section>
  );
}
