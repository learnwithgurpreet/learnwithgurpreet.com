import PostCard from "@/components/PostCard";
import getSortedPostsData from "@/lib/posts";

async function getAllPosts() {
  await getSortedPostsData();
}

export default async function Home() {
  await getAllPosts();
  return (
    <main id="main-content">
      <section className="container mx-auto max-w-5xl pt-20 md:pt-40 pb-20">
        <p className="text-sm uppercase pb-2 text-center font-bold tracking-wide">
          Blog
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold text-center tracking-wide">
          Learn with Gurpreet
        </h1>
        <p className="pt-2 text-center tracking-wide">
          Building a greener web: where code meets sustainability to shape a
          better digital future. 🌍🌱
        </p>
      </section>
      <section className="px-6 pb-12 md:pb-24">
        <div className="container px-6 flex flex-wrap max-w-5xl mx-auto">
          <aside className="w-full lg:w-13/50 mb-10 pb-6 lg:pr-4 lg:pb-0 border-gray-200 border-b lg:border-none">
            Something
          </aside>
          <div className="container grid gap-x-16 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:w-37/50 lg:pl-8">
            {[1, 2, 3, 4].map((i) => (
              <PostCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
