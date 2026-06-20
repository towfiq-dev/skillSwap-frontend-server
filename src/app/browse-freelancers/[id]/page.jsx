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
    <div className="max-w-4xl mx-auto p-6">
      <div className="border rounded-xl p-6">
        <Image
          src={freelancer?.image}
          alt={freelancer?.name}
          width={100}
          height={100}
          className="w-36 h-36 rounded-full object-cover"
        />

        <h1 className="text-3xl font-bold mt-4">
          {freelancer?.name}
        </h1>

        <p className="text-lg text-gray-600">
          ${freelancer?.hourlyRate || 0}/hour
        </p>

        <div className="mt-6">
          <h2 className="font-bold text-xl">
            About
          </h2>

          <p>{freelancer?.bio}</p>
        </div>

        <div className="mt-6">
          <h2 className="font-bold text-xl">
            Skills
          </h2>

          <div className="flex flex-wrap gap-2 mt-2">
            {Array.isArray(freelancer?.skills)
              ? freelancer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              : freelancer.skills
                  ?.split(",")
                  .map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 px-3 py-1 rounded-full"
                    >
                      {skill.trim()}
                    </span>
                  ))}
          </div>
        </div>
      </div>
    </div>
  );
}