import Image from "next/image";

function PostCard() {
  return (
    <article className="rounded-lg bg-white shadow-lg overflow-hidden">
      <div className="max-w-max">
        <Image
          className="dark:invert"
          src="/featured.jpg"
          alt="Learn with Gurpreet home"
          width={352}
          height={180}
          priority
          quality={95}
        />
      </div>
      <div className="py-4 pb-6 px-6">
        <h2 className="text-base pb-0">
          <a
            href="/blog/rewards-partners-may/"
            className="no-underline text-light-01 font-semibold"
          >
            Brave Rewards 3.0 Partner Program: May Update
          </a>
        </h2>
        <p className="text-sm font-semibold text-gray-500 pt-1 pb-0">
          May 29, 2025
        </p>
        <p className="line-clamp-5 text-sm pt-2 pb-0">
          Brave's Rewards 3.0 Partner Program is picking up speed. Designed to
          expand BAT utility, the program gives partners premium exposure to
          Brave's 86M+ monthly active users.
        </p>
      </div>
    </article>
  );
}

export default PostCard;
