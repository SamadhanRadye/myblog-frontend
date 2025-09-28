import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Modal, Form, Badge } from "react-bootstrap";

function UserProfile({ user, setUser }) {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  // Fetch user's blogs
  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:8080/api/posts/all")
        .then((response) => {
          if (response.data.success) {
            const userBlogs = response.data.posts.filter(
              (post) => post.author.username === user.username
            );
            setBlogs(userBlogs);
          }
        })
        .catch((err) => console.error("Error fetching blogs:", err));
    }
  }, [user]);

  const deleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      axios
        .delete(`http://localhost:8080/api/posts/${id}`)
        .then(() => {
          setBlogs(blogs.filter((b) => b.id !== id));
        })
        .catch((err) => console.error("Error deleting blog:", err));
    }
  };

  const openEditModal = (blog) => {
    setSelectedBlog(blog);
    setUpdatedTitle(blog.title);
    setUpdatedContent(blog.content);
    setEditMode(true);
    setShowModal(true);
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8080/api/posts/${selectedBlog.id}`, {
        title: updatedTitle,
        content: updatedContent,
      })
      .then((res) => {
        const updatedBlog = res.data.post;
        setBlogs(
          blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
        );
        setShowModal(false);
        setEditMode(false);
      })
      .catch((err) => console.error("Error updating blog:", err));
  };

  if (!user) {
    return <h3 className="text-center mt-5">⚠️ Please login to view your profile</h3>;
  }

  return (
    <div className="container" style={{ marginTop: "60px" }}>
      {/* User Info */}
      <Card className="mb-4 shadow">
        <Card.Body>
          <h2>👤 {user.username}</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </Card.Body>
      </Card>

      {/* User Blogs */}
      <h4 className="mb-3">📝 My Blogs</h4>
      {blogs.length === 0 ? (
        <p>No blogs posted yet.</p>
      ) : (
        blogs.map((blog) => (
          <Card key={blog.id} className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Posted on {new Date(blog.createdAt).toLocaleDateString()}
              </Card.Subtitle>
              <Card.Text style={{ maxHeight: "80px", overflow: "hidden" }}>
                {blog.content}
              </Card.Text>
              {blog.tags && blog.tags.length > 0 && (
                <div className="mb-2">
                  {blog.tags.map((tag, idx) => (
                    <Badge key={idx} bg="secondary" className="me-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="d-flex justify-content-between mt-3">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => {
                    setSelectedBlog(blog);
                    setShowModal(true);
                    setEditMode(false);
                  }}
                >
                  👀 Read
                </Button>
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => openEditModal(blog)}
                >
                  ✏️ Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => deleteBlog(blog.id)}
                >
                  🗑️ Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}

      {/* Modal for Read/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "✏️ Edit Blog" : selectedBlog?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBlog && editMode ? (
            <>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={8}
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                  />
                </Form.Group>
                <Button variant="success" onClick={handleUpdate}>
                  💾 Save Changes
                </Button>
              </Form>
            </>
          ) : (
            <>
              <p>
                <strong>Author:</strong> {user.username}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedBlog?.createdAt).toLocaleString()}
              </p>
              <hr />
              <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                {selectedBlog?.content}
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserProfile;
