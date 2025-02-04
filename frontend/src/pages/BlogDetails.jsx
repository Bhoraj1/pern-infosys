export default function BlogDetails() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Container */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Blog Post Title</h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <img
                src="/placeholder-avatar.jpg"
                alt="Author"
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-2">Author Name</span>
            </div>
            <span>•</span>
            <span>Published Date</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src="/placeholder-blog-image.jpg"
            alt="Blog Post"
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <article className="flex-grow lg:w-2/3">
            {/* Blog Content */}
            <div className="prose max-w-none mb-8">
              <p>Blog content paragraphs...</p>
              <h2>Subheading</h2>
              <p>More content...</p>
              {/* Add more content elements as needed */}
            </div>

            {/* Tags Section */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                Tag 1
              </span>
              <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                Tag 2
              </span>
            </div>

            {/* Author Bio */}
            <div className="border-t pt-8 mb-8">
              <div className="flex items-center space-x-4">
                <img
                  src="/placeholder-avatar.jpg"
                  alt="Author"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-semibold">Author Name</h3>
                  <p className="text-gray-600">Author bio description...</p>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-4">Comments</h2>
              <div className="space-y-4">
                {/* Comment Item */}
                <div className="flex space-x-4">
                  <img
                    src="/placeholder-avatar.jpg"
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-grow">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">User Name</span>
                        <span className="text-sm text-gray-500">2h ago</span>
                      </div>
                      <p>Comment text...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-1/3 lg:pl-8">
            <div className="sticky top-8">
              {/* Social Sharing */}
              <div className="mb-8">
                <h3 className="font-semibold mb-2">Share this post</h3>
                <div className="flex space-x-2">
                  {["Twitter", "Facebook", "LinkedIn"].map((platform) => (
                    <button
                      key={platform}
                      className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table of Contents */}
              <div className="bg-gray-100 p-4 rounded-lg mb-8">
                <h3 className="font-semibold mb-2">Table of Contents</h3>
                <ul className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <li key={item} className="text-blue-600 hover:underline">
                      Section {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Posts */}
              <div>
                <h3 className="font-semibold mb-4">Related Posts</h3>
                <div className="space-y-4">
                  {[1, 2].map((post) => (
                    <div key={post} className="flex space-x-4">
                      <img
                        src="/placeholder-related.jpg"
                        alt="Related post"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-medium">Related Post Title</h4>
                        <p className="text-sm text-gray-500">Post date</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
