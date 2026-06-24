import Image from "next/image";

export default async function FreelancerDetails({
  params,
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/freelancers/${id}`,
    {
      cache: "no-store",
    }
  );

  const freelancer = await res.json();
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="bg-white border rounded-2xl shadow-sm p-8">

          {/* Top Section */}
          <div className="text-center">

            <Image
              src={freelancer?.image || "/avatar.jpg"}
              alt={freelancer?.name}
              width={100}
              height={100}
              className="w-36 h-36 rounded-full object-cover mx-auto border-4 border-gray-100 shadow-sm"
            />

            <h1 className="text-3xl font-bold mt-5 text-gray-800">
              {freelancer?.name}
            </h1>

            <p className="text-lg text-gray-500 mt-1">
              ${freelancer?.hourlyRate || 0}/hour
            </p>

          </div>

          {/* About */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
              About
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {freelancer?.bio || "No bio added yet"}
            </p>
          </div>

          {/* Skills */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Skills
            </h2>

            <div className="flex flex-wrap gap-2 mt-4">
              {Array.isArray(freelancer?.skills)
                ? freelancer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))
                : freelancer.skills
                    ?.split(",")
                    .map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill.trim()}
                      </span>
                    ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}