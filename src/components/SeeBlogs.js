import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Modal, Form } from "react-bootstrap";
import axios from "axios";

function BlogList({ user }) {   // ✅ accept logged-in user as prop
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // ✅ Fetch blogs
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/posts/all")
      .then((response) => {
        if (response.data.success) {
          setBlogs(response.data.posts);
        } else {
          console.error("Failed to fetch posts:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  // ✅ Delete blog (only if user is author)
  const deleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      axios
        .delete(`http://localhost:8080/api/posts/${id}`)
        .then((response) => {
          if (response.data.success) {
            setBlogs((prev) => prev.filter((blog) => blog.id !== id));
          } else {
            console.error("Delete failed:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    }
  };

  // ✅ Filtering
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || blog.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const renderBlogs = { marginTop: "56px", padding: "20px" };

  return (
    <div style={renderBlogs} className="outdiv container1">
      <div className="container">
        <h1 className="mb-4 text-center">📚 Blog Posts</h1>

        {/* Search + Filter */}
        <div className="row mb-4">
          <div className="col-md-8">
            <Form.Control
              type="text"
              placeholder="🔍 Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <Form.Select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Business">Business</option>
            </Form.Select>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="row">
          {filteredBlogs.length === 0 ? (
            <div className="col-12 text-center">
              <h3>📝 No blogs found</h3>
              <p>Start writing your first blog!</p>
            </div>
          ) : (
            filteredBlogs.map((blog) => (
              <div key={blog.id} className="col-md-6 col-lg-4 mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title className="text-truncate">{blog.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      By {blog.author?.username} |{" "}
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </Card.Subtitle>

                    {blog.category && (
                      <Badge bg="primary" className="mb-2">{blog.category}</Badge>
                    )}

                    <Card.Text
                      className="text-truncate"
                      style={{ maxHeight: "60px", overflow: "hidden" }}
                    >
                      {blog.content}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => {
                          setSelectedBlog(blog);
                          setShowModal(true);
                        }}
                      >
                        👀 Read
                      </Button>

                      {/* ✅ Show delete button ONLY if logged-in user = author */}
                      {user && blog.author?.id === user.id && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deleteBlog(blog.id)}
                        >
                          🗑️ Delete
                        </Button>
                      )}
                    </div>
                  </Card.Footer>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Blog Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedBlog?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBlog && (
            <>
              <div className="mb-3">
                <strong>Author:</strong> {selectedBlog.author?.username} <br />
                <strong>Email:</strong> {selectedBlog.author?.email} <br />
                <strong>Created:</strong>{" "}
                {new Date(selectedBlog.createdAt).toLocaleString()} <br />
              </div>
              <hr />
              <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                {selectedBlog.content}
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BlogList;
